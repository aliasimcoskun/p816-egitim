"""icerik/ekA_a.md tablolarından ekA_sozluk bileşen verisini üretir -> sablon/bilesenler_ekA_a.html
Kullanım: python araclar/sozluk_uret.py .   (ekA_a.md tabloları değişince çalıştırın)"""
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from terimler import terms

ROOT = sys.argv[1]
src_terms = terms(ROOT)
units_of = {h: ids for h, ids in src_terms}

md = open(os.path.join(ROOT, 'icerik', 'ekA_a.md'), encoding='utf-8').read()
md = re.sub(r'<!--.*?-->', '', md, flags=re.S)
sec = None
rows = []
for line in md.splitlines():
    if line.startswith('## '):
        sid, _, title = line[3:].partition('|')
        sec = (sid.strip(), title.strip())
    m = re.match(r'^\| \*\*(.+?)\*\* \| (.+) \|$', line)
    if m:
        rows.append((sec, m.group(1), m.group(2)))

heads = [r[1] for r in rows]
missing = [h for h in units_of if h not in heads]
extra = [h for h in heads if h not in units_of]
dup = sorted({h for h in heads if heads.count(h) > 1})
if missing or extra or dup:
    sys.exit(f"eksik={missing} fazla={extra} tekrar={dup}")
order = [h for h, _ in src_terms]
if heads != order:
    print("UYARI: tablo sırası kaynak sırasından farklı")

NOT = {
    'Bingo Fuel': "Sözlük X için bir sayı vermez. Bölüm 2: bingo profili doğru uçulursa meydanın üzerine 300–500 lbs. yakıtla varılır (2-31.10).",
    'Case I': "Sözlük \"3,000/5 or greater\" der; Bölüm 2'deki Case I recovery metni \"better than 3,000/5\" der (2-13.02).",
    'Case II': "Sözlük \"greater than 1,000/5\" der; Bölüm 2'nin genel tanımı \"1,000 feet or above\" der (2-4.04). Sözlüğe göre tam 1.000/5 hiçbir Case'e girmez.",
    'Case III': "Sözlük \"less than 1,000/5\" der; Bölüm 2'deki Case III recovery metni Case II minimumlarını \"less than 1,000-3\" diye anar (2-22.23).",
    'CCA': "Bölüm 1 ve 2'de CCA ayrıca Carrier Control Area (geminin 50 NM çevresindeki hava sahası) anlamında kullanılır (1-3.25, 1-3.26).",
    'Charlie': "Bölüm 2 Charlie time'ı \"launch operations are complete and recovery operations begin\" zamanı olarak tanımlar (2-17.24).",
    'Ramp Time (Ready Deck)': "İkinci cümle sözlüğün Charlie tanımına çok yakındır; Bölüm 2'nin Charlie tanımı farklıdır (2-17.24).",
    'Emergency Marshal': "Kaynakta \"with and altitude and EEAT\" yazar: yazım hatası ya da eksik kelime. Bölüm 2: radyal beklenen final bearing'e göre 150°, mesafe angels + 15 (2-20.10).",
    'Spin': "Bölüm 2: patern doluysa (altıdan fazla uçak) flight fantail'e vardığında spin yapılır; 1.200 ft'e tırmanış, 3 DME içinde sola dönüş, 270°'den sonra 800 ft (2-15.20 – 2-15.22).",
}
ILGILI = {
    'Air Boss': ['Pri-Fly', 'Carrier Control Zone (CCZ)'],
    'Air Operations Officer': ['Carrier Air Traffic Control Center (CATCC)'],
    'Angels': ['Cherubs'],
    'Ball': ['Meatball'],
    'Bingo': ['Bingo Fuel', 'Divert', 'Trick or Treat'],
    'Bingo Fuel': ['Bingo'],
    'BRC': ['Final Bearing (FB)', 'Clearing Turn'],
    'Buster': ['Charlie'],
    'Carrier Air Traffic Control Center (CATCC)': ['Air Operations Officer'],
    'Carrier Control Zone (CCZ)': ['Air Boss', 'Case I'],
    'Case I': ['Case II', 'Case III'],
    'Case II': ['Case I', 'Case III'],
    'Case III': ['Case I', 'Case II', 'Ramp Time (Ready Deck)'],
    'Charlie': ['Ramp Time (Ready Deck)', 'Buster'],
    'Cherubs': ['Angels'],
    'Chicks': ['Hawk'],
    'Clara': ['Meatball', 'Roger Ball'],
    'Clearing Turn': ['BRC'],
    'Cross-Deck Pendant (CDP)': ['Bolter', 'Pull Back'],
    'Cut Lights': ['Roger Ball', 'Datum Lights', 'Zip Lip'],
    'Datum Lights': ['Cut Lights', 'Improved Fresnel Lens Optical Landing System (IFLOLS)'],
    'Delta': ['Delta Clean', 'Delta Easy', 'Starboard Delta'],
    'Delta Clean': ['Delta', 'Delta Easy'],
    'Delta Easy': ['Delta', 'Delta Clean'],
    'Divert': ['Bingo', 'Pigeons', 'Steer'],
    'Emergency Expected Approach Time (EEAT)': ['Expected Approach Time (EAT)', 'Emergency Marshal'],
    'Emergency Marshal': ['Emergency Expected Approach Time (EEAT)', 'Primary Marshal Radial', 'Marshal'],
    'Emission Control Procedures (EMCON)': ['Zip Lip', 'Cut Lights'],
    'Expected Approach Time (EAT)': ['Emergency Expected Approach Time (EEAT)'],
    'Father': ['Mother', 'Mark your Father', 'Sweet Lock'],
    'Field Carrier Landing Practice (FCLP)': ['Landing Signals Officer (LSO)'],
    'Final Bearing (FB)': ['BRC'],
    'Foul Deck': ['Foul Line (ship only)'],
    'Foul Line (ship only)': ['Foul Deck'],
    'Hawk': ['Chicks'],
    'Holdback': ['Launch Bar', 'Shuttle'],
    'Hold-Down': ['Hot Refueling'],
    'Hook to Eye': ['Hook to Ramp'],
    'Hook to Ramp': ['Hook to Eye', 'Ramp'],
    'Hot Refueling': ['Hot Seat'],
    'Hot Seat': ['Hot Refueling'],
    'Improved Fresnel Lens Optical Landing System (IFLOLS)': ['Meatball', 'Mirror', 'Datum Lights', 'Cut Lights'],
    'In the Middle Position': ['Start'],
    'Jet Blast Deflector (JBD)': ['Shuttle'],
    'Landing Signals Officer (LSO)': ['Paddles', 'Field Carrier Landing Practice (FCLP)', 'Roger Ball'],
    'Launch Bar': ['Shuttle', 'Holdback'],
    'Mark your Father': ['Father'],
    'Marshal': ['Primary Marshal Radial', 'Emergency Marshal'],
    'Meatball': ['Ball', 'Improved Fresnel Lens Optical Landing System (IFLOLS)', 'Clara'],
    'Mirror': ['Improved Fresnel Lens Optical Landing System (IFLOLS)'],
    'Mother': ['Father'],
    'On the Ball': ['Roger Ball'],
    'Paddles': ['Landing Signals Officer (LSO)'],
    'Parrot': ['Strangle Your Parrot', 'Red Crown'],
    'Pigeons': ['Divert', 'Steer'],
    'Plane Guard': ['Starboard Delta'],
    'Pri-Fly': ['Air Boss'],
    'Primary Marshal Radial': ['Marshal', 'Emergency Marshal'],
    'Pull Back': ['Push Back'],
    'Push Back': ['Pull Back'],
    'Ramp': ['Round Down', 'Hook to Ramp'],
    'Ramp Time (Ready Deck)': ['Charlie'],
    'Red Crown': ['Parrot'],
    'Roger Ball': ['Cut Lights', 'On the Ball', 'Landing Signals Officer (LSO)'],
    'Round Down': ['Ramp'],
    'Shuttle': ['Launch Bar', 'Tension'],
    'Starboard Delta': ['Delta', 'Plane Guard'],
    'Start': ['In the Middle Position'],
    'Steer': ['Divert', 'Pigeons'],
    'Strangle Your Parrot': ['Parrot'],
    'Suspend': ['Tension'],
    'Sweet Lock': ['Father'],
    'Tension': ['Shuttle', 'Suspend'],
    'Trick or Treat': ['Bingo'],
    'Zip Lip': ['Emission Control Procedures (EMCON)', 'Cut Lights'],
}
for k, v in list(NOT.items()) + list(ILGILI.items()):
    assert k in units_of, k
for v in ILGILI.values():
    for x in v:
        assert x in units_of, x

data = []
for (sid, stitle), h, d in rows:
    e = {"t": h, "s": sid, "u": units_of[h], "d": d}
    if h in NOT:
        e["n"] = NOT[h]
    if h in ILGILI:
        e["i"] = ILGILI[h]
    data.append(e)

sections = []
for (sid, stitle), _, _ in rows:
    if (sid, stitle) not in sections:
        sections.append((sid, stitle))

js = json.dumps(data, ensure_ascii=False, indent=0).replace("</", "<\\/")
chips = "".join(
    f'<button type="button" class="ekA-sz-cip" data-s="{sid}" aria-pressed="false">{stitle.split(":")[0]}</button>'
    for sid, stitle in sections)
html = f'''<!-- @@ ekA_sozluk -->
<!-- Ek A, parça a: aranabilir sözlük. Veri icerik/ekA_a.md tablolarından üretilir; tabloyu değiştirince yeniden üretin. -->
<div class="w w-ekA-sozluk">
  <div class="w-baslik">Sözlükte ara <small>İngilizce terimde ya da Türkçe tanımda</small></div>
  <div class="ekA-sz-arac">
    <input type="search" class="ekA-sz-ara" placeholder="ör. bingo, Charlie, yakıt, 2.500 ft…" aria-label="Sözlükte ara (İngilizce terim ya da Türkçe tanım)" autocomplete="off" spellcheck="false">
    <span class="ekA-sz-sayac" aria-live="polite"></span>
  </div>
  <div class="ekA-sz-cipler" role="group" aria-label="Harf grubu"><button type="button" class="ekA-sz-cip" data-s="" aria-pressed="true">Tümü</button>{chips}</div>
  <div class="ekA-sz-govde">
    <ul class="ekA-sz-liste" aria-label="Terimler"></ul>
    <div class="ekA-sz-detay" aria-live="polite"><p class="ekA-sz-bos">Tanımı görmek için listeden bir terim seçin.</p></div>
  </div>
  <p class="w-not">Tanımlar bu sayfadaki tablolarla aynıdır (Ek A, s. A-1 – A-6). Arama büyük/küçük harf ve Türkçe karakter (ı/i, ş/s, ğ/g, ü/u, ö/o, ç/c) farkı gözetmez. ◆ işaretli terimlerde belgede bir tutarsızlık vardır; ayrıntı derste mor <b>Kaynak notu</b> kutusundadır.</p>
  <script type="application/json" class="w-veri">{js}</script>
</div>
'''
out = os.path.join(ROOT, 'sablon', 'bilesenler_ekA_a.html')
open(out, 'w', encoding='utf-8', newline='\n').write(html)
print(f"{len(data)} terim, {len(sections)} bölüm -> {out}")
