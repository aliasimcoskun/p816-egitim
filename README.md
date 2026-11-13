# P-816 eğitim paketi

CNATRA P-816 *CV Procedures (UMFO) T-45C* belgesinden üretilmiş, **kapsamı denetlenen** Türkçe eğitim paketi. Bölümler: Bölüm 1 (s. 1-1 – 1-16), Bölüm 2 (s. 2-1 – 2-38), Ek A sözlük (A-1 – A-6), Ek B uçuş güvertesi işaretleri (B-1 – B-12), Ek C LSO telsiz çağrıları (C-1 – C-4).

**Çevrimiçi:** https://aliasimcoskun.github.io/p816-carrier-procedures-tr/ (kurulum gerekmez; ders sayfaları, sorular, kartlar ve seslendirme tarayıcıda çalışır).

Ek B ve Ek C'nin PDF'te yalnızca görsel olarak bulunan tabloları satır satır aktarılmıştır. El işaretlerinin çizimleri kırpılıp resimli kartlara dönüştürülmüştür; kart ön yüzü `[img:dosya.png]` ile başlarsa derleyici görseli sayfada ve Anki destesinde gösterir.

## Çıktılar

| Dosya | Ne işe yarar |
|---|---|
| `site/index.html` | Giriş sayfası: bölümler, kapsam özetleri. Çift tıklayıp tarayıcıda açılır; internet gerekmez. `site/` klasörü olduğu gibi intranete konabilir. `main` dalına gelen her `site/` değişikliği GitHub Pages'e otomatik yayınlanır (`.github/workflows/pages.yml`). |
| `site/bolumN.html` | Bölümün etkileşimli ders sayfası (ders, bölüm sonu soruları, bilgi kartları). |
| `site/ses/<bölüm>/*.mp3` | Ders bloklarının seslendirmesi (Türkçe anlatım: Ahmet; tırnak içindeki İngilizce ifadeler İngilizce sesle). Sayfadaki **🔊 Dinle** ya da blok başındaki **▶ Dinle** ile çalınır; hız 0,5×–2× arası ayarlanır. |
| `site/kapsam_bolumN.html` | Belgedeki her cümlenin hangi ders paragrafında, hangi soru ve kartta işlendiğini gösteren rapor. |
| `cikti/P-816_bolumN.apkg` | Anki destesi. Anki'de *Dosya → İçe aktar* ile açılır. |
| `cikti/kapsam_bolumN.csv` | Kapsam raporu, Excel için (`;` ayraçlı, UTF-8). |

## Nasıl çalışır

```
PDF ──kaynak_cikar.py──► kaynak/bolumN_birimler.json        (her cümle bir kimlik alır: 2-7.04)
                         kaynak/bolumN_sekil_birimleri*.json  (şekillerdeki bilgiler, elle aktarılır)
icerik/bolumN.md              başlık ve sayfa aralığı
icerik/bolumN[_parça].md      Türkçe ders metni; her paragraf "@k 2-7.02..2-7.05" ile kaynağını belirtir
icerik/bolumN[_parça]_sorular.txt / _kartlar.txt
            └──derle.py──► site/ + cikti/  ve kapsam denetimi
```

`derle.py`, kaynaktaki bir cümlenin derste karşılığı yoksa ya da kaynağı belirtilmemiş bir paragraf varsa **hata verir** (çıkış kodu 1). "Hiçbir bilgi atlanmadı" iddiası bu denetime dayanır. Yazım kuralları: `araclar/YAZIM_REHBERI.md`.

## Kurulum ve derleme

```bash
pip install -r requirements.txt
```

```bash
python araclar/derle.py bolum1
```

```bash
python araclar/derle.py bolum2
```

Diğer bölümler: `ekA`, `ekB`, `ekC`. Bir bölümü derlemek giriş sayfasını ve üst menüyü de günceller.

Bir bölümün yalnızca bir parçasını, dosya yazmadan denetlemek için: `python araclar/derle.py bolum2 --parca c --sayfa 2-11.13..2-18 --kuru`

## Seslendirme

Ses dosyaları [edge-tts](https://github.com/rany2/edge-tts) ile üretilir: Microsoft Edge'in çevrimiçi metinden konuşma servisini kullanır, API anahtarı gerektirmez. **Ders metinleri ses üretimi sırasında Microsoft'a gönderilir**; üretilen MP3'ler sitede çevrimdışı çalışır.

```bash
python araclar/ses_uret.py hepsi
```

Tek bölüm için: `python araclar/ses_uret.py ekC`. Betik önce `derle.py` ile her bloğun konuşma metnini çıkarır (`cikti/anlatim_<bölüm>.json`), sonra yalnızca sesi olmayan ya da metni değişmiş blokları seslendirir; dosya adı metnin özetidir (hash), eski dosyaları siler. Ders metni değişip ses yeniden üretilmezse o blok sessiz kalır, yanlış ses çalmaz. Servis arada bir boş yanıt döner; betik yeniden dener, yine de üretilemeyen blokları listeler. Komutu tekrar çalıştırınca yalnızca eksikler üretilir.

- **Okunuş:** `araclar/anlatim.py` birimleri (kts → knot, ft → fit, ° → derece) ve sembolleri okunuşa çevirir. Kısaltmalar ve terimler `icerik/telaffuz.tsv` sözlüğündedir (`LSO` → `el es o`, `bolter` → `boltır`). Yanlış okunan bir kelimeyi bu dosyaya ekleyip `ses_uret.py` çalıştırın; yalnızca o kelimenin geçtiği bloklar yenilenir.
- **Ne okunur:** başlıklar, paragraflar, listeler, uyarı kutuları, tablolar (satır satır: "ilk hücre: sütun: değer"), şekil açıklamaları. Okunmayanlar: sayfa ve birim atıfları, `(*İngilizce karşılık*)` parantezleri, sorular ve kartlar.
- **Oynatıcı:** hız ve "sonraki bloğa geç" tercihi tarayıcıda saklanır. Okunan blok vurgulanır ve sayfa onu izler.

## Yeni bölüm eklemek (ör. Ek A, PDF sayfa 63–68)

1. `python araclar/kaynak_cikar.py <P-816.pdf> 63 68 kaynak/ekA_birimler.json img`
2. Görsel sayfalardaki bilgileri `kaynak/ekA_sekil_birimleri.json` dosyasına yazın (bu sayfalar metin çıkarımında boş gelir).
3. `icerik/ekA.md` (başlık, `@kisa`, `@aralik`), ders metni, sorular ve kartlar.
4. `python araclar/derle.py ekA`
5. İsteğe bağlı: `python araclar/ses_uret.py ekA`

## Belgede tespit edilen tutarsızlıklar

Her bölümün kapsam raporunda "Belgede tespit edilen tutarsızlıklar" listesi vardır; derste mor **Kaynak notu** kutularıyla işaretlidir. Eğitimden önce güncel bir kaynaktan doğrulanmalıdır.
