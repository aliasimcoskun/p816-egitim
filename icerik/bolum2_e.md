<!--
Bölüm 2, parça e: 205 EMERGENCIES (s. 2-28 – 2-38). Yazım kuralları: araclar/YAZIM_REHBERI.md
Şekil 2-10 / 2-11 birimleri: kaynak/bolum2_sekil_birimleri_e.json
-->

## 205.1 | Uçak acil durumları ve bingo

### Bingo

**Bingo bir acil durumdur.** Uçağın *minimum fuel* seviyesinde değil, **acil durum yakıt seviyesinde** (*emergency fuel level*) olduğu anlamına gelir.
@k 2-28.03..2-28.04

Her uçağın yakıt durumu **Air Ops ve Tower** tarafından sürekli izlenir. Yakıt durumu Air Ops'un belirlediği **hold-down** seviyesine ulaştığında uçak yakıt ikmali için **güvertede tutulur**. Yakıtınız hold-down seviyesinde **veya altındayken** katapulta taxi yapmanız yönlendirilirse **Tower'a çağrı yapın**.
@k 2-28.05..2-28.07

### Temiz (clean) bingo profilinin hesaplanması

Temiz konfigürasyonda bingo profili şu adımlarla hesaplanır (Şekil 2-10):

**Adım i — Üsse olan mesafeyi (*distance to base*) belirleyin.**
@k 2-28.08..2-28.09

!not NOTE
Uçaklar divert sahasına kerteriz / mesafe bilgisini (**pigeons**) ve **bingo fuel** durumunu **ilk check-in'de Marshal'dan** alır. Bu bilgi periyodik olarak güncellenir ve **Marshal ve tower frekanslarında** yayınlanır. Bingo ve pigeons bilgisini **her zaman yazın**.
@k 2-28.11..2-28.13

**Adım ii — Doğru bingo bilgilerini belirlemek için PCL'ye bakın:**

- (a) Gereken yakıt (*fuel required*)
- (b) Bingo için gereken süre (*time required*): tırmanışın başından inişe kadar geçen **toplam süre**
- (c) Tırmanış hızı (KIAS)
- (d) Seyir irtifası (*cruise altitude*)
- (e) Seyir irtifasındaki seyir hızı (KIAS / IMN)
- (f) Alçalma hızı (KIAS)
- (g) Alçalma noktası (*descent point*)
@k 2-28.14..2-28.21

Geminin bildirdiği bingo değerlerini **her zaman**, bingo sahasına olan mesafeye göre **bingo fuel grafiğiyle doğrulayın**. Güncel grafikler için **PCL veya NATOPS**'a bakın.
@k 2-28.22..2-28.23

#### Örnek problem: temiz bingo

Örnek bingo profili hesaplama problemi. Aşağıdaki verilerle doğru bingo bilgilerini belirleyin:

| Verilen | Değer |
|---|---|
| Uçak konfigürasyonu | gear up, flaps up |
| Zero fuel weight | 10.500 lb |
| Drag index | 0 |
| Bingo sahasına mesafe | 100 NM |
@k 2-28.24..2-29.04

Çözüm ve Şekil 2-10'daki karşılığı: değerler **DRAG INDEX = 0** bloğunun **100 NM** satırından okunur (aşağıdaki Türkçe tabloda kalın gösterilen satır). Tırmanış ve alçalma hızı bloğun tüm satırları için ortaktır.

| Kalem | Çözüm (metin) | Şekil 2-10, DRAG INDEX = 0, 100 NM |
|---|---|---|
| DIST TO BASE | 100 NM | DIST TO BASE 100 NM |
| FUEL REQD | **712 lb** | FUEL REQD, rüzgârsız: 712 LB |
| CLIMB SPEED | **300 KIAS / 0,75 IMN** | CLIMB SPEED: 300/0,75 (sütun birimi KCAS) |
| CRUISE ALT | **20.000 ft** | CRUISE ALT: 20.000 FEET |
| CRUISE SPEED | **218 KIAS, 0,48 IMN** | CRUISE SPEED: 218 KCAS |
| DESCENT SPEED | **180 KIAS** | DESCEND SPEED: 180 KCAS |
| DESCENT DIST | **55 NM** (bingo sahasından) | DESCEND DIST, rüzgârsız: 55 NM |

Aynı satırda **100 kt baş rüzgârı** için gereken yakıt **921 lb**, alçalma mesafesi **29 NM**'dir.
@k 2-29.05..2-29.12, 2-30.F3, 2-30.F7

!not NOTE
Gereken yakıta (*fuel required*) şunlar dahildir: **300 lb yedek yakıt**, belirtilen irtifaya **maksimum thrust** ile tırmanış ve deniz seviyesine **idle thrust** ile alçalma.
@k 2-29.14

!kaynak Örnek çözüm ile grafik arasındaki farklar
- Adım ii'deki listede "(b). Time required for bingo" sayılıyor; ama Şekil 2-10'da süre sütunu yok, örnek çözüm de süre vermiyor.
- Metin hızları KIAS / IMN ile veriyor ("CLIMB SPEED = 300 KIAS/.75 IMN", "CRUISE SPEED = 218 KIAS .48 IMN"); grafiğin hız sütunları ise **KCAS** birimli. Grafikte tırmanış hızı yalnızca "300/0.75" olarak yazılı, **0,48 IMN** değeri grafikte yok.
@k 2-28.16, 2-29.08, 2-29.10, 2-30.F2, 2-30.F3

@f s2-30_0.jpg | Şekil 2-10 — Temiz bingo grafiği (Clean Bingo Chart)
Grafik başlığı **BINGO**, konfigürasyon **GEAR UP - FLAPS UP** (bu etiket tablonun altında, notların üstünde tekrarlanır). Satırlar **DRAG INDEX = 0, 50 ve 100** olmak üzere üç bloğa ayrılır; her blokta üsse mesafe (**DIST TO BASE**) 25'ten 250 NM'ye 25'er NM artar. Sütunlar: **MAXIMUM RANGE CRUISE** grubunda gereken yakıt (**FUEL REQD**: NO WIND ve 100 KT HEAD WIND, LB), tırmanış hızı (**CLIMB SPEED**, KCAS), seyir (**CRUISE**: ALT, FEET ve SPEED, KCAS), alçalma (**DESCEND**: SPEED, KCAS ve DIST: NO WIND ve 100 KT HEAD WIND, NM); **SEA LEVEL CRUISE** grubunda gereken yakıt (NO WIND ve 100 KT HEAD WIND, LB) ve seyir hızı (CRUISE SPEED, KCAS). Aşağıda "a / b" = rüzgârsız / 100 kt baş rüzgârı; "–" = grafikte değer yok.

**DRAG INDEX = 0** — tırmanış hızı (CLIMB SPEED) **300/0,75**, alçalma hızı (DESCEND SPEED) **180 KCAS** (bloktaki tüm mesafeler için tek değer):

| Mesafe (NM) | Gereken yakıt (lb): rüzgârsız / 100 kt baş rüzgârı | Seyir irtifası (ft) | Seyir hızı (KCAS) | Alçalma mesafesi (NM): rüzgârsız / 100 kt baş rüzgârı | Deniz seviyesi seyri, yakıt (lb): rüzgârsız / 100 kt baş rüzgârı | Deniz seviyesi seyir hızı (KCAS) |
|---|---|---|---|---|---|---|
| 25 | 420 / 515 | 5.000 | 221 | 14 / 6 | 429 / 535 | 220 |
| 50 | 528 / 682 | 10.000 | 222 | 27 / 13 | 559 / 771 | 221 |
| 75 | 625 / 815 | 15.000 | 219 | 41 / 21 | 690 / 1.006 | 221 |
| **100** | **712 / 921** | **20.000** | **218** | **55 / 29** | **820 / 1.240** | **222** |
| 125 | 795 / 1.006 | 25.000 | 225 | 69 / 37 | 952 / 1.474 | 222 |
| 150 | 869 / 1.081 | 30.000 | 224 | 83 / 46 | 1.083 / 1.707 | 223 |
| 175 | 935 / 1.150 | 35.000 | 215 | 97 / 55 | 1.216 / 1.940 | 224 |
| 200 | 999 / 1.238 | 35.000 | 216 | 97 / 55 | 1.349 / 2.172 | 224 |
| 225 | 1.063 / 1.327 | 35.000 | 216 | 97 / 55 | 1.482 / 2.404 | 225 |
| 250 | 1.127 / 1.392 | 40.000 | 213 | 111 / 65 | 1.616 / 2.635 | 226 |

**DRAG INDEX = 50** — tırmanış hızı (CLIMB SPEED) **265/0,70**, alçalma hızı (DESCEND SPEED) **170 KCAS** (bloktaki tüm mesafeler için tek değer):

| Mesafe (NM) | Gereken yakıt (lb): rüzgârsız / 100 kt baş rüzgârı | Seyir irtifası (ft) | Seyir hızı (KCAS) | Alçalma mesafesi (NM): rüzgârsız / 100 kt baş rüzgârı | Deniz seviyesi seyri, yakıt (lb): rüzgârsız / 100 kt baş rüzgârı | Deniz seviyesi seyir hızı (KCAS) |
|---|---|---|---|---|---|---|
| 25 | 433 / 542 | 5.000 | 214 | 12 / 5 | 441 / 562 | 214 |
| 50 | 551 / 731 | 10.000 | 214 | 24 / 11 | 582 / 823 | 215 |
| 75 | 656 / 875 | 15.000 | 214 | 37 / 17 | 724 / 1.085 | 216 |
| 100 | 752 / 993 | 20.000 | 213 | 49 / 24 | 867 / 1.348 | 216 |
| 125 | 840 / 1.089 | 25.000 | 215 | 61 / 31 | 1.010 / 1.610 | 216 |
| 150 | 924 / 1.175 | 30.000 | 214 | 74 / 39 | 1.153 / 1.872 | 217 |
| 175 | 1.000 / 1.259 | 35.000 | 208 | 86 / 47 | 1.297 / 2.135 | 217 |
| 200 | 1.074 / 1.361 | 35.000 | 208 | 86 / 47 | 1.442 / 2.398 | 218 |
| 225 | 1.147 / 1.464 | 35.000 | 208 | 86 / 47 | 1.587 / 2.661 | 218 |
| 250 | 1.221 / 1.568 | 35.000 | 209 | 86 / 47 | 1.733 / – | 219 |

**DRAG INDEX = 100** — tırmanış hızı (CLIMB SPEED) **245/0,60**, alçalma hızı (DESCEND SPEED) **165 KCAS** (bloktaki tüm mesafeler için tek değer):

| Mesafe (NM) | Gereken yakıt (lb): rüzgârsız / 100 kt baş rüzgârı | Seyir irtifası (ft) | Seyir hızı (KCAS) | Alçalma mesafesi (NM): rüzgârsız / 100 kt baş rüzgârı | Deniz seviyesi seyri, yakıt (lb): rüzgârsız / 100 kt baş rüzgârı | Deniz seviyesi seyir hızı (KCAS) |
|---|---|---|---|---|---|---|
| 25 | 444 / 566 | 5.000 | 210 | 11 / 5 | 452 / 589 | 209 |
| 50 | 572 / 773 | 10.000 | 208 | 22 / 10 | 604 / 877 | 209 |
| 75 | 685 / 993 | 15.000 | 207 | 33 / 15 | 757 / 1.165 | 210 |
| 100 | 788 / 1.060 | 20.000 | 207 | 44 / 21 | 911 / 1.454 | 211 |
| 125 | 880 / 1.132 | 30.000 | 201 | 66 / 34 | 1.066 / 1.742 | 211 |
| 150 | 965 / 1.257 | 30.000 | 201 | 66 / 34 | 1.221 / 2.030 | 212 |
| 175 | 1.051 / 1.358 | 35.000 | 195 | 77 / 41 | 1.377 / 2.318 | 212 |
| 200 | 1.133 / 1.477 | 35.000 | 195 | 77 / 41 | 1.533 / 2.606 | 213 |
| 225 | 1.216 / 1.597 | 35.000 | 196 | 77 / 41 | 1.690 / 2.893 | 213 |
| 250 | 1.299 / 1.717 | 35.000 | 196 | 77 / 41 | 1.848 / – | 214 |

Grafik notları (**NOTES**):

1. Gereken yakıta (*fuel required*) **300 lb yedek yakıt** dahildir.
2. Başlangıç irtifası **deniz seviyesidir**.
3. Seyir irtifasına **maksimum thrust** ile tırmanış.
4. Deniz seviyesine **idle thrust** ile **maksimum menzil alçalması** (speedbrake'ler kapalı).
@k 2-30.01, 2-30.F1..2-30.F39

### Temiz bingo uçuş prosedürleri

Bingo yakıt durumuna ulaşınca: **bingo heading'ine dönün**, **temizlenin** (*clean up*), **300 KIAS**'a hızlanın ve bingo profilini uçun (**tırmanış MRT ile**). Dönüşü veya tırmanışı **geciktirmeyin**, ama geminin konumunun ve paterndeki diğer uçakların farkında olun. Niyetinizi gemiye bildirin. Tower'ın cevabını beklerken bingo profiline başlamayı **geciktirmeyin**. **7700 squawk** edin ve uygun herhangi bir kontrol birimiyle (*controlling agency*) iletişim kurun.
@k 2-31.01..2-31.05

**Alçalma noktasında** (*descent point*), alçalma hızında bingo sahasına **idle alçalmaya** başlayın.
@k 2-31.06

!dikkat CAUTION
Bingo'ya yerleştikten sonra *wet compass*'ı (sıvılı pusula) **her zaman çapraz kontrol edin**.
@k 2-31.08

!not NOTE
Bingo profili doğru uçulursa uçak sahanın üzerine **300–500 lb** yakıtla varmalıdır. Bu, ilk denemede emniyetli bir yaklaşma yapamazsanız **downwind'e bir dönüş** ya da **360 derecelik bir dönüş** yapmanıza yetecek yakıttır. Sağduyulu davranın (*use good headwork*).
@k 2-31.10..2-31.12

### Kirli (dirty) bingo profilinin hesaplanması

Bingo profilleri normalde temiz konfigürasyonda uçulduğu için gemiden (CV) hesaplanan bingo bilgisi **temiz bingo** içindir. Ancak uçakta iniş takımı (*gear*) ve/veya flap/slat arızası nedeniyle **kirli konfigürasyon** oluşmuşsa **yakıt gereksinimi daha yüksektir**. Kirli bingo bilgisi temiz bingo ile **aynı yöntemle** hesaplanır; tek fark **başka bir grafik** (Şekil 2-11) kullanılmasıdır. Güncel grafikler için **PCL veya NATOPS**'a bakın.
@k 2-31.13..2-31.15

Kirli konfigürasyonda bingo profili şöyle hesaplanır:

**Adım i — Üsse olan mesafeyi belirleyin.** **Adım ii — Doğru bingo bilgileri için PCL'ye bakın:**

- (a) Gereken yakıt (*fuel required*)
- (b) Tırmanış hızı (KIAS)
- (c) Seyir irtifası (*cruise altitude*)
- (d) Seyir irtifasındaki seyir hızı (KIAS / IMN)
- (e) Alçalma hızı (KIAS)
- (f) Alçalma noktası (*descent point*)

Temiz bingo listesinden farkı: bu listede **süre** (*time required*) maddesi yoktur.
@k 2-31.16..2-31.24, 2-28.16

#### Örnek problem: kirli bingo

Örnek bingo profili hesaplama problemi. Aşağıdaki verilerle doğru bingo bilgilerini belirleyin:

| Verilen | Değer |
|---|---|
| Uçak konfigürasyonu | gear down, flaps full |
| Zero fuel weight | 10.500 lb |
| Drag index | 0 (hızı hesaplamak için) |
| Bingo sahasına mesafe | 100 NM |
@k 2-32.01..2-32.06

Çözüm ve Şekil 2-11'deki karşılığı: değerler **DRAG INDEX = 0** bloğunun **100 NM** satırından okunur (aşağıdaki Türkçe tabloda kalın gösterilen satır).

| Kalem | Çözüm (metin) | Şekil 2-11, DRAG INDEX = 0, 100 NM |
|---|---|---|
| DIST TO BASE | 100 NM | DIST TO BASE 100 NM |
| FUEL REQD | **1.950 lb** | FUEL REQD, rüzgârsız: 1.950 LB |
| CLIMB SPEED | **120 KIAS** | CLIMB SPEED: 120 (sütun birimi KCAS) |
| CRUISE ALT | **15.000 ft** | CRUISE ALT: 15.000 FEET |
| CRUISE SPEED | **118 KIAS / 0,24 IMN** | CRUISE SPEED: 118 KCAS |
| DESCENT SPEED | **110 KIAS** | DESCEND SPEED: 110 KCAS |
| DESCENT DIST | **15 NM** (bingo sahasından) | DESCEND DIST, rüzgârsız: 15 NM |

Aynı satırda **50 kt baş rüzgârı** için gereken yakıt **2.809 lb**, alçalma mesafesi **9 NM**'dir. Karşılaştırma: aynı 100 NM için temiz bingo (Şekil 2-10, DI 0) **712 lb**, kirli bingo **1.950 lb** gerektirir.
@k 2-32.07..2-32.14, 2-33.F3, 2-33.F7, 2-30.F7

!not NOTE
Gereken yakıta şunlar dahildir: **300 lb yedek yakıt**, belirtilen irtifaya **maksimum thrust** ile tırmanış ve deniz seviyesine **idle thrust** ile alçalma.
@k 2-32.16

!kaynak Kirli örnekte de birim farkı
Metin "CRUISE SPEED = 118 KIAS/.24 IMN" diyor; Şekil 2-11'in hız sütunları **KCAS** birimli ve **0,24 IMN** değeri grafikte yer almıyor.
@k 2-32.12, 2-33.F2, 2-33.F7

@f s2-33_0.jpg | Şekil 2-11 — Kirli bingo grafiği (Dirty Bingo Chart)
Grafik başlığı **BINGO**, konfigürasyon **GEAR DOWN - FULL FLAPS** (bu etiket tablonun altında, notların üstünde tekrarlanır). Sütun düzeni Şekil 2-10 ile aynıdır; tek fark baş rüzgârı sütunlarının **50 KT HEAD WIND** olmasıdır. Satırlar yine **DRAG INDEX = 0, 50 ve 100** bloklarına ayrılır ve DIST TO BASE 25–250 NM'dir, ama yüksek mesafelerin satırlarında değer yoktur ("-"). Üç blokta da tırmanış hızı **120**, alçalma hızı **110 KCAS**'tır. Aşağıda "a / b" = rüzgârsız / 50 kt baş rüzgârı; "–" = grafikte değer yok.

**DRAG INDEX = 0** — tırmanış hızı (CLIMB SPEED) **120**, alçalma hızı (DESCEND SPEED) **110 KCAS** (bloktaki tüm mesafeler için tek değer):

| Mesafe (NM) | Gereken yakıt (lb): rüzgârsız / 50 kt baş rüzgârı | Seyir irtifası (ft) | Seyir hızı (KCAS) | Alçalma mesafesi (NM): rüzgârsız / 50 kt baş rüzgârı | Deniz seviyesi seyri, yakıt (lb): rüzgârsız / 50 kt baş rüzgârı | Deniz seviyesi seyir hızı (KCAS) |
|---|---|---|---|---|---|---|
| 25 | 743 / 1.001 | 8.000 | 122 | 8 / 4 | 758 / 1.074 | 123 |
| 50 | 1.142 / 1.598 | 12.500 | 118 | 12 / 7 | 1.226 / 1.858 | 124 |
| 75 | 1.541 / 2.187 | 15.000 | 117 | 15 / 9 | 1.704 / 2.652 | 126 |
| **100** | **1.950 / 2.809** | **15.000** | **118** | **15 / 9** | **2.195 / –** | **127** |
| 125 | 2.369 / – | 15.000 | 119 | 15 / – | 2.697 / – | 129 |
| 150 | 2.819 / – | 12.500 | 120 | 12 / – | – / – | – |
| 175–250 | – | – | – | – | – | – |

**DRAG INDEX = 50** — tırmanış hızı (CLIMB SPEED) **120**, alçalma hızı (DESCEND SPEED) **110 KCAS** (bloktaki tüm mesafeler için tek değer):

| Mesafe (NM) | Gereken yakıt (lb): rüzgârsız / 50 kt baş rüzgârı | Seyir irtifası (ft) | Seyir hızı (KCAS) | Alçalma mesafesi (NM): rüzgârsız / 50 kt baş rüzgârı | Deniz seviyesi seyri, yakıt (lb): rüzgârsız / 50 kt baş rüzgârı | Deniz seviyesi seyir hızı (KCAS) |
|---|---|---|---|---|---|---|
| 25 | 749 / 1.011 | 8.000 | 121 | 8 / 4 | 764 / 1.087 | 122 |
| 50 | 1.155 / 1.620 | 12.500 | 117 | 12 / 7 | 1.239 / 1.885 | 124 |
| 75 | 1.562 / 2.221 | 15.000 | 116 | 14 / 9 | 1.725 / 2.694 | 125 |
| 100 | 1.979 / 2.854 | 15.000 | 117 | 14 / 9 | 2.222 / – | 127 |
| 125 | 2.406 / – | 15.000 | 118 | 14 / – | 2.732 / – | 128 |
| 150 | 2.866 / – | 12.500 | 120 | 12 / – | – / – | – |
| 175–250 | – | – | – | – | – | – |

**DRAG INDEX = 100** — tırmanış hızı (CLIMB SPEED) **120**, alçalma hızı (DESCEND SPEED) **110 KCAS** (bloktaki tüm mesafeler için tek değer):

| Mesafe (NM) | Gereken yakıt (lb): rüzgârsız / 50 kt baş rüzgârı | Seyir irtifası (ft) | Seyir hızı (KCAS) | Alçalma mesafesi (NM): rüzgârsız / 50 kt baş rüzgârı | Deniz seviyesi seyri, yakıt (lb): rüzgârsız / 50 kt baş rüzgârı | Deniz seviyesi seyir hızı (KCAS) |
|---|---|---|---|---|---|---|
| 25 | 754 / 1.022 | 8.000 | 121 | 8 / 4 | 771 / 1.100 | 122 |
| 50 | 1.169 / 1.643 | 12.500 | 116 | 12 / 7 | 1.252 / 1.912 | 123 |
| 75 | 1.583 / 2.257 | 15.000 | 116 | 14 / 8 | 1.745 / 2.737 | 125 |
| 100 | 2.007 / – | 15.000 | 117 | 14 / – | 2.250 / – | 126 |
| 125 | 2.442 / – | 15.000 | 118 | 14 / – | 2.766 / – | 127 |
| 150–250 | – | – | – | – | – | – |

Grafik notları (**NOTES**, Şekil 2-10 ile aynı):

1. Gereken yakıta (*fuel required*) **300 lb yedek yakıt** dahildir.
2. Başlangıç irtifası **deniz seviyesidir**.
3. Seyir irtifasına **maksimum thrust** ile tırmanış.
4. Deniz seviyesine **idle thrust** ile **maksimum menzil alçalması** (speedbrake'ler kapalı).
@k 2-33.01, 2-33.F1..2-33.F29

@w e_bingo
@k 2-30.F1..2-30.F39, 2-33.F1..2-33.F29

### Kirli bingo uçuş prosedürleri

Bingo yakıt durumuna ulaşınca **bingo heading'ine dönün**. Dönüşü veya tırmanışı **geciktirmeyin**, ama diğer uçaklara karşı gözünüz açık olsun. Hesaplanan bingo profilini uçun ve **MRT ile tırmanın**. Temiz bingo uygularken bildireceğiniz bilgilerin **aynısını** bildirin.
@k 2-32.17..2-32.20

### Patlak lastik (Blown Tire)

Kirli bingonun **en yaygın nedeni patlak lastiktir**. Bir wingman sizi gözle kontrol edip **flaplarda hasar veya parça (*debris*) olmadığını** teyit edebilirse, yakıt tasarrufu için flapleri kaldırıp **gear down / flaps up** kirli bingo yapabilirsiniz.
@k 2-32.21..2-32.22

!kaynak gear down / flaps up için grafik yok
Metin **gear down / flaps up** kirli bingodan söz ediyor; ama bu belgede yalnızca **GEAR UP - FLAPS UP** (Şekil 2-10) ve **GEAR DOWN - FULL FLAPS** (Şekil 2-11) grafikleri var. Gear down / flaps up için grafik verilmemiştir.
@k 2-32.22, 2-30.F1, 2-33.F1

Patlak lastikte uygulanacak prosedür, arızanın **hangi durumda** meydana geldiğine bağlıdır:

- **Touch and go sırasında veya katapult kalkışından sonra** patlarsa: uçak gemiye **trap** yapabilir ya da **divert**'e yönlendirilebilir.
- **Arrestment'tan sonra** patlarsa: **yellow shirt**'ün işaretlerini izleyerek iniş alanından taxi ile çıkın ya da çekilin (*towed*).
- **Divert talimatı alırsanız** kirli profili uçun; bu **dikkatli yakıt takibi** gerektirir. Bingo yakıtının **çok üzerinde olsanız bile** yine **kirli bingo profilini** uçun (en yakıt verimli profil).
@k 2-32.23..2-32.26, 2-34.01

Saha arrestment prosedürleri (*field arrestment*) için **PCL veya NATOPS**'a bakın. Bu prosedürlere **harfiyen** uyulmaması **hook skip**'e yol açabilir.
@k 2-34.02..2-34.03

!uyari WARNING
Bir veya iki ana lastik patlakken pistte **yön kontrolü son derece zor** olacaktır.
@k 2-34.05

Tek ana lastik patlakken teker koyunca uçak **anında ve hızla patlak lastik tarafına** yaw yapar / savrulur (*swerve*); ayrıca yaw yönünün **tersine yaklaşık 3°** yatış açısı (**AOB**, *Angle of Bank*) oluşur (ör. **sağa yaw, sola AOB**). İlk savrulma ve onu düzeltmek için yapılan pilot girdileri sırasında kokpitteki yanal (yan yana) ivme **0,5 g**'ye kadar çıkabilir; bu çok rahatsız edici olabilir. İniş alanındaki yanal sapma, doğru kumanda girdilerinin (**savrulmanın tersine rudder**) ne kadar hızlı uygulandığına göre değişir.
@k 2-34.06..2-34.08

Gemide arrested landing denemesinde LSO, teker koyma noktasını **2 teli** (*2-wire*) hedefleyerek ayarlamayı seçebilir. Pilot **bolter / hook skip** olasılığına hazırlıklı olmalıdır. Bu olursa, tek patlak lastiğin savrulmasını karşılamak ve iniş alanının yanal sınırları içinde kalmak için teker koyduktan sonra **agresif ve hızlı rudder pedalı** sapması gerekir (**0,25 saniye içinde 180 pound'a kadar kuvvet**). Havalanınca **rudder pedallarını ortalayın** ve *flyaway* duruşunu (*flyaway attitude*) kurun.
@k 2-34.09..2-34.12

### Cross-deck pendant / hook point arızası

1. Uçağın güvertede durdurulup durdurulamayacağını **derhal** belirleyin.
2. Güvertede durdurulamıyorsa uçuş için **yeterli hız** olup olmadığını belirleyin.
3. Hız yeterli değilse **eject** edin.
4. Hız yeterliyse **MRT**'yi koruyun, **speed brake'lerin kapalı** olduğunu kontrol edin ve yumuşakça **optimum AOA**'ya rotate edin.
5. Batma hızı (*sink rate*) durdurulamazsa AOA'yı **24 unit**'e artırın, **kanatları düz** tutun ve **pozitif tırmanış** hızı kurun.
@k 2-34.13..2-34.17

### Uçuş güvertesinde NWS arızası

Burun tekerleği yönlendirmesi (**NWS**, *nose wheel steering*) arızasının belirtileri:

- **MSTR ALERT** ışığı yanıp söner
- Kulaklıkta **caution tone** duyulur
- Amber **NOSE WHEEL STR** caution ışığı yanar
- Yeşil **NOSE WHEEL STR** advisory ışığı söner (*high gain* seçiliyse)
- Rudder pedalları yönlendirmede **etkisizdir**
@k 2-34.18..2-34.23

Bu belirtiler varsa **uçağı durdurun**. Çalışmayan NWS ile **taxi yapmayın**. **Tower'a** NWS arızasını bildirin. Pilotun NWS'i ayırmak için **paddle switch**'e bastığını ve (ışığı ve tonu iptal etmek için) **MSTR ALERT** ışığına bastığını teyit edin. Güverte ekibi bir **tow bar** (çeki demiri) takacaktır. Çekilirken *flight director*'ın işaretlerini izleyin.
@k 2-34.24..2-34.28

!uyari WARNING
Tow bar takılıyken **NWS'i yeniden devreye almayın** ve **diferansiyel fren kullanmayın**.
@k 2-35.02

!kaynak "flight director" ifadesi
Metin "While being towed, follow the flight director's signals" diyor. "Flight director" ifadesi belgede yalnızca burada geçer; Şekil 1-1'de güvertede uçağı yönlendiren sarı formalılar "Plane Directors (Taxi Directors)" olarak adlandırılır. Hangisinin kastedildiği belgede açıklanmaz.
@k 2-34.28

### Fren arızası (Brake Failure)

Fren arızasının belirtileri: **HYD 1 PRESS** caution ışığının yanması, fren basınç göstergesinde **düşük basınç**, ya da fren pedalı basıncının **azalması veya kaybı**. Bu belirtiler olursa dururken yön kontrolünü korumak için **high gain** burun tekerleği yönlendirmesini ve mevcut frenlemeyi kullanın. **Yalnızca bir fren** arızalıysa uçağı **NWS ve çalışan frenle** durdurun.
@k 2-35.03..2-35.05

Varsa **park frenini** çekin ve (güverte personeline fren arızası olduğunu bildirmek için) **arresting hook**'u indirin; **ANTI-SKID** switch'inin **OFF** konumunda olduğundan emin olun. Durumu **Tower'a** bildirin. Throttle'ı **yalnızca çarpışma kaçınılmazsa OFF**'a alın, çünkü motoru kapatmak **NWS'i ve kalan tüm hidrolik hizmetleri** kaybettirir.
@k 2-35.06..2-35.07

Ada'ya veya başka bir uçağa çarpmak anlamına gelse bile uçağı uçuş güvertesinde tutmak için **her çabayı gösterin**. Uçak güverteden çıkıyorsa **eject** edin. Bir teker güverteden çıktığında (yani uçak **artık düz değilse**) uçak **ejection zarfının (*ejection envelope*) dışında** olabilir ve ejection **artık önerilmez**.
@k 2-35.08..2-35.10

#### Suya çıkış (water egress)

Aşağıdaki suya çıkış prosedürleri gerekebilir:

1. **MDC** (*Mild Detonating Cord*) ateşleme kolunu (*firing handle*) çekin ve **acil oksijeni** devreye alın. Su altından çıkışta oksijen ekipmanıyla **16 ft** derinliğe kadar su altında nefes almak mümkündür.
2. Mümkünse **survival kit ile** çıkın: üst **Koch** bağlantılarını açın, **emergency restraint release**'i çekin (bacak bağlarını açmak için), uçağı **seatpack** ile terk edin ve can yeleğini (**LPU**, *life preserver unit*) şişirin.
3. **Survival kit olmadan** çıkarken: üst Koch bağlantılarını açın, emergency restraint release'i çekin, **alt Koch** bağlantılarını açın, **oksijen / haberleşme** bağlantılarını ayırın ve LPU'yu şişirin.
4. Kokpit su dolduysa LPU, **suyla çalışan otomatik şişirme cihazı** nedeniyle şişmiş olabilir. Öyleyse çıkışta **LPU'ya zarar vermemeye** dikkat edin.
@k 2-35.11..2-35.17

### Launch bar arızası (havada)

Launch bar arızası, **warning tone** ile birlikte yanan kırmızı **L BAR** warning ışığıyla belirtilir. Bu belirtiler olursa launch bar switch'inin **RETRACT** konumunda olduğunu doğrulayın. Launch bar **geri çekilmezse** **LSO / tower**'ı bilgilendirin ve PCL'deki **Landing Gear Malfunction – Landing Guide** grafiğine bakın.
@k 2-35.18..2-35.20

Launch bar'ın **DOWN** konumunda olduğu **görsel olarak teyit edilirse**: temizlenin (*clean up*), **standart prosedürlerle** paterni terk edin ve tower talimatlarına göre **overhead'de rendezvous** yapın. **Divert** edip, **short-field arresting gear'ı sökülmüş** (*de-rigged*) bir kara sahasına inmeyi bekleyin.
@k 2-35.21..2-35.22

@baglam 2-28.24, 2-28.25, 2-29.05, 2-31.16, 2-32.01, 2-32.02, 2-32.07, 2-35.11

## 205.2 | Katapult arızaları ve acil durumları

Katapulttayken bir uçak acil durumu olursa **katapult suspend** prosedürlerini uygulayın:

- Olumsuz işaret olarak **başınızı sallayın** (*head shake*) ve **"Suspend, suspend, suspend."** yayınlayın.
- Katapult subayı (*catapult officer*) uçağın **kanadının önüne geçip** **throttle back** işaretini verene kadar **MRT**'yi koruyun.
@k 2-36.02..2-36.03

!dikkat CAUTION
İki elinizi de kokpitte **aşağıda ve görünmez** tutun; el hareketleriniz **selamla (*salute*) karıştırılmasın**.
@k 2-36.05

### Hang fire (katapult arızası)

Katapult subayı güverteye dokunmuş, uçağı fırlatmak için düğmeye basılmış, **ama katapult ateşlenmemişse** buna *hang fire* denir. Hang fire olursa katapult subayı önce **suspend** işaretini, **ardından hang fire** işaretini verir. Katapult **emniyete alınınca** uçağın önüne geçip **throttle back** işaretini verir.
@k 2-36.06..2-36.08

### Holdback fitting arızası

Uçak **gerdirildikten** sonra (*in tension*) holdback fitting arızası olabilir. Holdback fitting koparsa uçak öne doğru yuvarlanmaya başlar ve katapult darbesi (*catapult stroke*) yerine **normal bir kalkış koşusundaymış** gibi hissedilir. Bu olursa throttle'ı **derhal IDLE**'a çekin, **speed brake'leri açın** ve **maksimum frenleme** uygulayın. Gerekirse güvertede kalmak için **NWS** kullanın. NWS'i etkinleştirmek için **launch bar geri çekilmeli** ya da **NWS düğmesine basılmalıdır**.
@k 2-36.09..2-36.13

!dikkat CAUTION
Yukarıdaki prosedürleri **derhal** uygulamamak uçağı güvertede tutmayı imkânsız hâle getirip **ejection** gerektirebilir. **Eject edemiyorsanız**: **MDC** kolunu çekin, **acil oksijeni** devreye alın, uçakla birlikte suya girin (*ride the aircraft into the water*) ve suya çıkış (*water egress*) yapın.
@k 2-36.15..2-36.16

### Katapult arızası (cold / soft catapult)

1. Uçağın güvertede durdurulup durdurulamayacağını **derhal** belirleyin.
2. Güvertede durdurulamıyorsa uçuş için **yeterli hız** olup olmadığını belirleyin.
3. Hız yeterli değilse **eject** edin.
4. Hız yeterliyse **MRT**'yi koruyun ve batmayı (*sink rate*) durdurmak için yumuşakça **optimum AOA**'ya rotate edin.
5. Batma hızı durdurulamazsa AOA'yı **24 unit**'e artırın.
6. **Kanatları düz** tutun ve **pozitif tırmanış** hızı kurun.

Bu sıra cross-deck pendant / hook point arızasındakiyle aynıdır; o prosedürde ek olarak **speed brake'lerin kapalı olduğu** kontrol edilir.
@k 2-36.17..2-36.22, 2-34.16

### İletişim arızaları

!kaynak Başlık yapısı
Belgede iletişim arızası maddeleri **(d)–(g)**, "2. Catapult Malfunctions/Emergencies" başlığı altında katapult arızalarının (a)–(c) devamı olarak harflendirilmiştir; ayrı bir başlıkları yoktur. Burada belge yapısı korunmuştur.
@k 2-37.01, 2-37.02, 2-37.04, 2-37.14

**İletişim arızası (*Communication Failure*):** İletişim arızasında sistemi **her zaman** switch'leri kontrol ederek ve **gevşek bağlantı** arayarak gidermeye (*troubleshoot*) çalışın.
@k 2-37.01

**Gemiye giderken iletişim kaybı (*Lost Comm Enroute To Ship*):** **El işaretleriyle** lidere (*lead*) **NORDO** durumunuzu ve **yakıt durumunuzu** bildirin. Lider **Marshal** ile temas kurup bir **recovery ya da divert** koordine eder.
@k 2-37.02..2-37.03

**Paternde iletişim kaybı (*Lost Comm In The Pattern*):**

1. Normal paterni *start*'a kadar uçun ve topu çağırın (*call the ball*).
2. **Cut ışıkları gelmezse** yaklaşmayı **waveoff** edin ve **300 ft'in altına inmeyin**.
3. **Kanatları sallayarak** (*rocking the wings*) açılı güverte boyunca uçun.
4. Geminin **pruvasının abeam**'ine gelince **BRC'ye paralel** dönün, sonra **500 ft**'e tırmanıp koruyun ve **150 KIAS**'a hızlanın.
5. Aralığa göre dönerek (*turning on interval*) paternde devam edin.
@k 2-37.04..2-37.08

!dikkat CAUTION
1. Tırmanırken diğer uçaklara karşı **tetikte olun**. Geminin **5 NM** içinde kalın ve **gemiyi gözden kaybetmeyin**.
2. **Bingo** yakıt durumuna ulaşılırsa ya da **derhal iniş** gerektiren bir acil durum olursa **divert sahasına gidin** ve **7700 squawk** edin. Heading'in doğru hizalandığından emin olmak için **wet compass ve HSI**'ı çapraz kontrol edin. Bingo sahasına başka bir uçak **eskort** olarak katılabilir.
@k 2-37.10..2-37.13

**Uçuş güvertesinde iletişim kaybı (*Lost Comm On The Flight Deck*):** Bilinen bir iletişim arızasıyla kalkış için **asla katapulta taxi yapmayın**. Yellow shirt'e iletişim arızası işaretini verin (**kulakları veya maskeyi gösterip ardından başparmak aşağı**) ve yellow shirt'ün işaretleriyle bir **park alanına** gidin. Uygun olduğunda arızayı giderin (switch'leri açıp kapatın — *cycle* — ve **maske ve kask bağlantılarını** kontrol edin).
@k 2-37.14..2-37.16
