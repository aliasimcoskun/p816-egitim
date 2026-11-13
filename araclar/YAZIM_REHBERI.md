# Yazım rehberi — P-816 eğitim içeriği

Bu rehber, bir bölümün (ya da bölüm parçasının) Türkçe ders içeriğini, sorularını ve kartlarını yazan herkes içindir. Örnek olarak her zaman `icerik/bolum1.md`, `icerik/bolum1_sorular.txt` ve `icerik/bolum1_kartlar.txt` dosyalarına bakın; üslup, ayrıntı düzeyi ve biçim oradaki gibi olmalı.

## Temel ilke: hiçbir bilgi kaçmayacak, hiçbir bilgi uydurulmayacak

- Kaynak = `kaynak/<bolum>_birimler.json`. Her metin birimi (cümle / liste maddesi) en az bir ders bloğunda `@k` ile anılmalı ve o bloğun Türkçe metni o birimin **tüm** bilgisini taşımalı: her sayı, birim, koşul, istisna, sıra, isim.
- Kaynakta olmayan bilgi eklemeyin (genel havacılık bilginiz doğru olsa bile). Açıklama gerekiyorsa yalnızca kaynağın söylediğini sadeleştirin.
- Sayılar ve birimler aynen: ft, NM, kts, KIAS, lbs, °, saniye, dakika. Rakam biçimi Türkçe: 2.500 ft, 1,5 NM, 3,5°.
- Terimler İngilizce kalır (ilk geçişte gerekirse Türkçe karşılığıyla): Case I, marshal, bolter, waveoff, groove, break, abeam, bingo, tanker, ready deck, BRC, DME, EMCON, Zip Lip… Kalın (`**...**`) ya da italik (`*...*`) kullanın.
- Telsiz çağrıları ve kalıp ifadeler İngilizce, tırnak içinde aynen korunur; Türkçe açıklaması yanına yazılır.
- Kaynakta tutarsızlık, bozuk metin, şekil-metin çelişkisi görürseniz düzeltmeyin: `!kaynak` kutusuyla, ilgili İngilizce ifadeleri kısaca alıntılayarak belirtin.

## Dosya biçimi (`icerik/<bolum>_<parça>.md`)

```
## 203.2 | Katapult prosedürleri           <- bölüm (kimlik size verilir, değiştirmeyin)
### Alt başlık
Türkçe paragraf...                        <- blok: bir veya birkaç paragraf / liste / tablo
@k 2-6.21..2-6.24, 2-7.01                 <- bloğun kaynak birimleri (aralık ya da liste)

!uyari WARNING                            <- WARNING kutusu   (!dikkat = CAUTION, !not = NOTE)
Türkçe uyarı metni
@k 2-8.01..2-8.02

@f s2-10_0.jpg | Şekil 2-1 — Case I kalkışı (Case I Departure)
Şekilde: ... (şekildeki tüm bilgi Türkçe)
@k 2-10.01, 2-10.F1..2-10.F4

@w e_bingo                                <- etkileşimli bileşen (isteğe bağlı)
@k 2-30.F1..2-30.F9                       <- bileşen bilgi taşıyorsa kaynağını yazın

@baglam 2-1.02, 2-3.04                    <- sınavla ölçülmesi gerekmeyen birimler
```

- Satır içi: `**kalın**`, `*italik*`; listeler `- ` ve `1. `; tablolar `| a | b |` + `|---|---|`.
- `@k` olmadan metin bırakmayın (derleyici hata verir). Bir birim birden çok blokta anılabilir.
- NOTE / CAUTION / WARNING başlık birimleri (`kind: baslik`) denetlenmez ama içerikleri (sonraki metin birimleri) denetlenir; bunları ilgili kutuya koyun.
- `@baglam` yalnızca şunlar için: giriş/geçiş cümleleri ("The following...", "These include:"), şekle atıf cümleleri, alıntılar, motivasyon cümleleri. Bilgi taşıyan her şey ölçülmeli.

## Şekiller

- Görseller `img/` klasöründe (`s<sayfa>_<sıra>.<uzantı>`). Her şekli Read aracıyla açıp dikkatle inceleyin.
- Şekildeki her bilgi (etiket, irtifa, mesafe, açı, yön, ok, tablo satırı) `kaynak/<bolum>_sekil_birimleri_<parça>.json` dosyasına İngilizce birim olarak yazılır:
  `{"id": "2-10.F1", "page": "2-10", "kind": "sekil-icerik", "sec": "Figure 2-1", "text": "[Figure 2-1] ..."}`
  Kimlik: `<sayfa>.F<sıra>`; bir dosyadaki F birimleri sayfa sırasıyla ardışık olmalı (aralık yazabilmek için).
- Okuyamadığınız ya da emin olmadığınız değeri tahmin etmeyin; birimde "[okunamadı]" yazın ve raporunuzda belirtin.
- Grafik/tablo şekilleri (ör. bingo grafikleri) satır satır, sütun başlıklarıyla birlikte aktarılır; derste Türkçe tablo olarak verilir.

## Tamamen görsel sayfalar (Ek B el işaretleri, Ek C telsiz çağrıları)

- Sayfa görseli bir tablodur: her satır (her işaret / her çağrı) bir şekil birimidir; satırdaki tüm sütunlar (ör. SIGNAL, FROM, TO, EXECUTION Day/Night, Note) birimin İngilizce metnine aynen girer.
- Satırdaki çizimi ayrı bir görsel olarak kırpabilirsiniz (Pillow kurulu): `img/<sayfa-görseli-adı-uzantısız>_s<sıra>.png`, ör. `img/sB-1_0_s1.png`. Kırpıntıda işaretin **adı görünmesin** (tanıma alıştırması için); kırptıktan sonra Read ile açıp kontrol edin. Kırpma betiğinizi `araclar/` dışında, scratchpad'de tutun.
- Resimli kart: ön yüz `[img:sB-1_0_s1.png] Bu hangi işaret?` biçiminde başlar; derleyici görseli kartta ve Anki destesinde gösterir.
- Derste bir sayfanın tam görseli `@f` ile bir kez verilir; satırlar Türkçe tabloda ya da işaret başına kısa bloklarda anlatılır (kırpıntı görselleri bileşen içinde kullanılabilir).

## Sorular (`icerik/<bolum>_<parça>_sorular.txt`)

```
## 203.2
S: Soru metni?
- yanlış şık
+ doğru şık
- yanlış şık
- yanlış şık
A: Kısa açıklama (kaynaktaki ifadeyle).
K: 2-6.22
```
4 şık, tek doğru; çeldiriciler aynı alandan ve inandırıcı (başka bir sayı, başka bir Case, başka bir görevli). Doğru şık sırası önemli değil (sayfa karıştırır). Her önemli sayı, sıra, karar kuralı ve acil durum adımı için soru yazın; yaklaşık 4–6 bilgi birimine bir soru.

## Kartlar (`icerik/<bolum>_<parça>_kartlar.txt`)

`<bölüm kimliği> || ön yüz (soru) || arka yüz (cevap) || kaynak birimleri` — kısa, tek konulu. Soru ile ölçülmeyen her bilgi birimi en az bir kartta olmalı.

## Etkileşimli bileşenler (isteğe bağlı, parça başına en fazla 2)

Yalnızca gerçek öğrenme değeri olduğunda (ör. bekleme paterni geometrisi, iniş paterni irtifaları, bingo grafiği okuyucu). Kaynağa sadık, "şematik / ölçeksiz" notlu.
- HTML: `sablon/bilesenler_<bolum>_<parça>.html`, her bileşen `<!-- @@ <parça>_<ad> -->` işaretiyle başlar (ör. `<!-- @@ e_bingo -->`). Kapsayıcı: `<div class="w w-<parça>-<ad>">`, başlık `<div class="w-baslik">`, not `<p class="w-not">`. SVG yazıları için `hs-t` / `hs-k` sınıfları hazır.
- JS: `sablon/uygulama_<bolum>_<parça>.js` — kendi IIFE'si: `(function(){ ... })();`, yalnızca kendi kapsayıcı sınıfını arar.
- CSS: `sablon/stil_<bolum>_<parça>.css` — yalnızca kendi sınıflarınız; renkler için `var(--vurgu)`, `var(--metin)`, `var(--soluk)`, `var(--yuzey)`, `var(--yuzey2)`, `var(--cizgi)`, `var(--iyi)`, `var(--kotu)`, `var(--uyari)` (açık/koyu tema otomatik).
- Ortak dosyalara (`stil.css`, `uygulama.js`, `bilesenler.html`, `derle.py`) dokunmayın.

## Denetim

Parçanız bitince ve her büyük adımdan sonra:

```
python -I araclar/derle.py <bolum> --parca <parça> --sayfa <ilk>..<son> --kuru
```

Çıktıda `Ders kapsamı` ve `Ölçme kapsamı` tam olmalı, `HATA` ve `EKSİK` satırı olmamalı (çıkış kodu 0). `--kuru` dosya yazmaz; parça yazarken site çıktısını üretmeyin.
