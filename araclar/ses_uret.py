"""Ders bloklarının seslendirmesini üretir (edge-tts, Microsoft'un çevrimiçi metinden konuşma servisi).

Kullanım:
  python araclar/ses_uret.py hepsi            # tüm bölümler
  python araclar/ses_uret.py bolum1 ekC       # seçili bölümler

Her bölüm için:
  1. derle.py çalıştırılır -> cikti/anlatim_<bölüm>.json (her bloğun konuşma metni ve parçaları)
  2. Sesi olmayan ya da metni değişmiş bloklar seslendirilir -> site/ses/<bölüm>/<anahtar>.mp3
     (Türkçe anlatım: Ahmet; tırnak içindeki İngilizce ifadeler: İngilizce ses — araclar/anlatim.py)
  3. Artık kullanılmayan ses dosyaları silinir, site/ses/<bölüm>/ses.json güncellenir
  4. derle.py yeniden çalıştırılır; sayfalardaki "Dinle" düğmeleri ve oynatıcı bu dosyalara bağlanır.

Metin değişmeyen bloklar yeniden üretilmez; telaffuz.tsv değişirse yalnızca etkilenen bloklar yenilenir.
Not: blok metinleri ses üretimi için Microsoft'a gönderilir; üretilen MP3'ler çevrimdışı çalışır.
"""
import asyncio
import glob
import json
import os
import subprocess
import sys
import time

import edge_tts

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import anlatim  # noqa: E402

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(ROOT, *a)
BYTES_PER_SEC = 48000 / 8  # edge-tts çıktısı: 24 kHz, 48 kbit/s mono MP3 (sabit bit hızı)
SESLER = {"tr": anlatim.SES_TR, "en": anlatim.SES_EN}


async def _bir_kez(text, voice):
    audio = bytearray()
    async for chunk in edge_tts.Communicate(text, voice).stream():
        if chunk["type"] == "audio":
            audio += chunk["data"]
    return bytes(audio)


def _denemeler(text, voice, tries):
    """(metin, ses, deneme sayısı) sırası. Servis bazı kısa İngilizce ifadelere hep boş döner
    (ör. "Install tiedowns now"), aynı ifade baş harfleri büyük ya da noktayla bitince okunur.
    O da olmazsa ifade son çare olarak Türkçe sesle okunur."""
    out = [(text, voice, tries)]
    if voice == anlatim.SES_EN:
        bas_harf = " ".join(w[:1].upper() + w[1:] for w in text.split())
        noktali = bas_harf if bas_harf[-1:] in ".!?" else bas_harf + "."
        out += [(v, voice, 2) for v in dict.fromkeys([bas_harf, noktali]) if v != text]
        out.append((text, anlatim.SES_TR, 2))
    return out


async def synth(text, voice, tries=8, sure_siniri=120):
    hata = "boş yanıt"
    for metin, ses, n in _denemeler(text, voice, tries):
        for attempt in range(n):
            try:
                # bağlantı arada bir yanıtsız askıda kalıyor; süre sınırı aşılırsa yeniden dene
                audio = await asyncio.wait_for(_bir_kez(metin, ses), sure_siniri)
                if audio:
                    if (metin, ses) != (text, voice):
                        print(f"  not: {text[:60]!r} yedek biçimle okundu: {metin[:60]!r} ({ses})", flush=True)
                    return audio
            except Exception as e:  # ağ hatası, hız sınırı, zaman aşımı, NoAudioReceived (servis arada bir boş döner)
                hata = f"{type(e).__name__}: {e}"
            await asyncio.sleep(min(3 * (attempt + 1), 20))
    raise RuntimeError(f"Ses alınamadı ({voice}): {text[:80]!r}: {hata}")


def derle(bolum):
    r = subprocess.run([sys.executable, "-I", P("araclar", "derle.py"), bolum], capture_output=True, text=True,
                       encoding="utf-8")
    if r.returncode != 0:
        print(r.stdout[-800:])
        print(f"UYARI: derle.py {bolum} hata verdi (kapsam/biçim); seslendirme yine de sürüyor.")
    return r


async def bolum_sesi(bolum, esz=3):
    sem = asyncio.Semaphore(esz)  # aynı anda en fazla esz istek
    with open(P("cikti", f"anlatim_{bolum}.json"), encoding="utf-8") as f:
        bloklar = json.load(f)
    ses_dir = P("site", "ses", bolum)
    os.makedirs(ses_dir, exist_ok=True)
    man_path = os.path.join(ses_dir, "ses.json")
    manifest = {}
    if os.path.exists(man_path):
        with open(man_path, encoding="utf-8") as f:
            manifest = json.load(f)

    gerekli = {b["anahtar"]: b for b in bloklar}
    eksik = [b for k, b in gerekli.items() if k not in manifest or not os.path.exists(P("site", manifest[k]["dosya"]))]
    print(f"{bolum}: {len(gerekli)} blok, {len(eksik)} tanesi üretilecek")
    bitti = 0
    t0 = time.time()

    hatalar = []

    async def blok(b):
        nonlocal bitti
        try:
            async with sem:
                parcalar = [await synth(t, SESLER[d]) for d, t in b["parcalar"]]
        except RuntimeError as e:  # bir blok başarısız olursa diğerleri sürsün; yeniden çalıştırınca tamamlanır
            hatalar.append(b["n"])
            print(f"  {bolum} blok {b['n']}: {e}", flush=True)
            return
        data = b"".join(parcalar)
        rel = f"ses/{bolum}/{b['anahtar']}.mp3"
        with open(P("site", rel), "wb") as f:
            f.write(data)
        manifest[b["anahtar"]] = {"dosya": rel, "sure": round(len(data) / BYTES_PER_SEC, 2)}
        bitti += 1
        if bitti % 20 == 0:
            with open(man_path, "w", encoding="utf-8") as f:
                json.dump(manifest, f, ensure_ascii=False, indent=0)
            print(f"  {bolum}: {bitti}/{len(eksik)} ({time.time() - t0:.0f} sn)", flush=True)

    await asyncio.gather(*[blok(b) for b in eksik])

    # artık kullanılmayan dosyaları temizle
    for k in list(manifest):
        if k not in gerekli:
            manifest.pop(k)
    for path in glob.glob(os.path.join(ses_dir, "*.mp3")):
        if os.path.splitext(os.path.basename(path))[0] not in manifest:
            os.remove(path)
    with open(man_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=0)
    sure = sum(v["sure"] for v in manifest.values())
    print(f"{bolum}: {len(manifest)}/{len(gerekli)} ses dosyası, {sure / 60:.1f} dk")
    if hatalar:
        print(f"  UYARI: {len(hatalar)} blok üretilemedi (blok {', '.join(map(str, sorted(hatalar)))}); "
              f"komutu yeniden çalıştırın, yalnızca eksikler üretilir.")
    return len(hatalar)


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return
    if args == ["hepsi"]:
        args = sorted(os.path.basename(p)[:-3] for p in glob.glob(P("icerik", "*.md")) if "_" not in os.path.basename(p))
    eksik = 0
    for b in args:
        derle(b)
        eksik += asyncio.run(bolum_sesi(b))
    for b in args + args:  # iki tur: üst menü ve giriş sayfası tüm bölümleri görsün
        derle(b)
    print("Sayfalar güncellendi.")
    if eksik:
        print(f"{eksik} blok sessiz kaldı; komutu yeniden çalıştırın.")
        sys.exit(1)


if __name__ == "__main__":
    main()
