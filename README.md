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
| `cikti/P-816_bolumN.apkg` | Anki destesi: bilgi kartları ve bölüm soruları (bkz. [Anki desteleri](#anki-desteleri)). |
| `cikti/kapsam_bolumN.csv` | Kapsam raporu, Excel için (`;` ayraçlı, UTF-8). |

## Anki desteleri

[Anki](https://apps.ankiweb.net), bilgi kartlarıyla ezber yapmaya yarayan ücretsiz bir uygulamadır. Kartın ön yüzünde soru, arka yüzünde cevap vardır. Cevabı düşünüp kartı çevirirsiniz, sonra ne kadar bildiğinizi işaretlersiniz (*Tekrar*, *Zor*, *İyi*, *Kolay*). Anki bilmediğiniz kartı kısa süre sonra yeniden sorar, bildiğinizi giderek daha seyrek gösterir: günler, sonra haftalar sonra. Bu **aralıklı tekrar** yöntemi, el işaretleri, telsiz çağrıları, hız, irtifa ve yakıt değerleri gibi birebir ezberlenmesi gereken bilgileri kalıcı hâle getirir. Günde 10-15 dakika yeterlidir.

Her bölüm için bir deste vardır (Anki'de `P-816` altında alt deste olarak görünür). Destede iki tür kart bulunur:

- **Bilgi kartları:** sitedeki "Bilgi kartları" bölümündekilerin aynısı. Ek B'deki el işareti çizimleri kartlarda da görünür.
- **Sorular:** bölüm sonu soruları; ön yüzde soru, arka yüzde doğru cevap ve açıklaması. `soru` etiketini taşırlar, istenirse Anki'de bu etiketle ayrı çalışılabilir.

| Deste | Bilgi kartı | Soru | Toplam |
|---|---|---|---|
| [Bölüm 1](cikti/P-816_bolum1.apkg) | 160 | 63 | 223 |
| [Bölüm 2](cikti/P-816_bolum2.apkg) | 353 | 281 | 634 |
| [Ek A](cikti/P-816_ekA.apkg) | 104 | 55 | 159 |
| [Ek B](cikti/P-816_ekB.apkg) | 75 | 48 | 123 |
| [Ek C](cikti/P-816_ekC.apkg) | 55 | 41 | 96 |
| **Toplam** | **747** | **488** | **1.235** |

Kullanmak için:

1. Uygulamayı kurun: bilgisayarda Anki ([apps.ankiweb.net](https://apps.ankiweb.net)), Android'de AnkiDroid (ücretsiz), iPhone'da AnkiMobile (ücretli).
2. Desteyi indirin (GitHub'da dosyayı açıp indirme düğmesine basın) ve Anki'de *Dosya → İçe aktar* ile açın.
3. Her gün desteyi seçip *Şimdi çalış* deyin. Ücretsiz bir AnkiWeb hesabıyla telefon ve bilgisayar arasında ilerleme eşitlenir.

Desteler GitHub Pages sitesinde yayınlanmaz (site yalnızca `site/` klasörüdür); depodaki `cikti/` klasöründen indirilir. Kart kimlikleri ön yüz metninden üretilir: güncel bir desteyi yeniden içe aktarmak değişmeyen kartları çoğaltmaz, çalışma geçmişi korunur. Ön yüzü değişen kart yeni kart olarak eklenir.

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
- **Veri kullanımı:** sayfayı açmak hiçbir ses dosyası indirmez. Bir bloğun MP3'ü yalnızca *Dinle*'ye basılınca indirilir; çalarken geçişte boşluk olmasın diye yalnızca sıradaki blok önceden indirilir. Bir blok genelde 0,2–1 MB, ses dakikası yaklaşık 350 KB tutar. Sayfa açıkken aynı blok yeniden indirilmez. Bir bölümü baştan sona dinleyen o bölümün tamamını indirmiş olur (ör. Bölüm 2 için yaklaşık 53 MB); yalnızca okuyan ses için veri harcamaz.

## Yeni bölüm eklemek (ör. Ek A, PDF sayfa 63–68)

1. `python araclar/kaynak_cikar.py <P-816.pdf> 63 68 kaynak/ekA_birimler.json img`
2. Görsel sayfalardaki bilgileri `kaynak/ekA_sekil_birimleri.json` dosyasına yazın (bu sayfalar metin çıkarımında boş gelir).
3. `icerik/ekA.md` (başlık, `@kisa`, `@aralik`), ders metni, sorular ve kartlar.
4. `python araclar/derle.py ekA`
5. İsteğe bağlı: `python araclar/ses_uret.py ekA`

## Belgede tespit edilen tutarsızlıklar

Her bölümün kapsam raporunda "Belgede tespit edilen tutarsızlıklar" listesi vardır; derste mor **Kaynak notu** kutularıyla işaretlidir. Eğitimden önce güncel bir kaynaktan doğrulanmalıdır.
