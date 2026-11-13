<!--
Bölüm 2, parça c: 204 (varış ve recovery, genel) ve 204.1 (Case I recovery), s. 2-11 – 2-18.
Kaynak birimleri: 2-11.13 – 2-18.22; şekil birimleri: kaynak/bolum2_sekil_birimleri_c.json
-->

## 204 | Varış ve recovery: genel

### Görevden dönüş: Red Crown ve Strike

Görevden sonra uçaklar, planlanmış döngüsel iniş zamanlarına (*scheduled cyclic land time*) yetişecek şekilde **Mother**'a döner. Görev frekansından çıkış (*check out*) yapıldıktan sonra CSG hava savunma kontrolörü **Red Crown** aranır; **çağrı adı (*call sign*), konum ve irtifa** bildirilir. Red Crown talimatlarını verir, ardından uçağı **Strike Control**'e devreder (*hand off*). Bu devir **50 NM**'lik **Carrier Control Area (CCA)**'ya girmeden **önce** gerçekleşmelidir.
@k 2-11.14..2-11.17

Strike'a yapılan check-in Red Crown'a yapılanla aynıdır; tek farkı, koldaki (*flight*) **en düşük yakıt durumunun (*low fuel state*)** da bildirilmesidir. Koldaki herhangi bir uçağın bakım arızası (**"alibis"**) varsa bunlar **Strike kontrolörüne** bildirilir; Strike da bunları **ready room**'a aktarır. Zaman elverirse Strike güncel hava durumunu, beklenen recovery **Case**'ini ve recovery ile ilgili diğer genel bilgileri verir.
@k 2-11.18..2-11.20

### Gemi–kara geçişi: HAIL-R kontrol listesi

Gemiden karaya ya da karadan gemiye uçuluyorsa uçağın o recovery'nin özelliklerine göre ayarlandığından emin olmak önemlidir. Bunu sağlamak için **ship-to-shore checklist (HAIL-R)** uygulanır:

| Harf | Kontrol maddeleri |
|---|---|
| **H** | Hook / Heats |
| **A** | Anti-Skid / Altimeter |
| **I** | Instruments |
| **L** | Landing Weight / Lights |
| **R** | Radios / RADALT |

Bu listeden bir maddeyi atlamanın nasıl gerçek bir soruna yol açabileceği kolayca görülür: **pistte lastik patlaması**, **gemiye fazla ağır (*overweight*) iniş** ya da **karada (*on the beach*) istemeden tele takılma (*trap*)**.
@k 2-11.21..2-11.26, 2-12.01, 2-12.02

### Marshal'a check-in

CCA'nın **içine** girildikten sonra Strike uçakları **Marshal** kontrolörüne devreder. Marshal frekansında **çağrı adı, konum, irtifa ve low state** ile check-in yapılır. Marshal, recovery Case'ine göre **holding talimatlarını (atanmış irtifa dahil)** verir; geminin **hava durumunu, altimetre ayarını, BRC'yi ve bingo bilgisini** iletir. **BRC**, recovery sırasında **geminin heading'idir** (*the ship's heading during the recovery*).
@k 2-12.03..2-12.06

- **Case I:** Marshal uçakları **overhead holding** paternine gönderir (*clear*) ve gemiden **10 NM**'de **"see me"** çağrısı yapılmasını ister. Bu çağrı, Mother ile **görsel temas** kurulduğunu gösterir.
- **Case II ve III:** Marshal **holding talimatlarını** ve **beklenen yaklaşma zamanını** (*expected approach time*, **"push time"**) verir.
@k 2-12.07..2-12.09

Özetle, dönüşteki üç kontrolör:

| Kontrolör | Ne zaman | Check-in'de bildirilenler | Kontrolörün verdikleri |
|---|---|---|---|
| **Red Crown** (CSG hava savunma kontrolörü) | Görev frekansından çıkınca | Çağrı adı, konum, irtifa | Talimatlar; ardından Strike'a devir (50 NM CCA'ya girmeden önce) |
| **Strike** (Strike Control) | CCA'ya girmeden önce devralır | Red Crown ile aynı + koldaki low fuel state; varsa alibis | Zaman elverirse güncel hava, beklenen Case, genel bilgi; CCA içinde Marshal'a devir |
| **Marshal** | CCA içinde | Çağrı adı, konum, irtifa, low state | Holding talimatı (irtifa dahil), hava, altimetre, BRC, bingo · Case I: overhead holding + 10 NM'de "see me" · Case II/III: holding + push time |
@k 2-11.15..2-11.20, 2-12.03..2-12.09

### Örnek telsiz konuşmaları

Belgedeki örnek konuşmalar (**405** = uçağın çağrı adı):

| Konuşan | Çağrı | İçerik |
|---|---|---|
| 405 | "Red Crown, 405, Mother's 250 for 75, Angels 17" | Çağrı adı, konum (Mother'ın 250 radyalinde 75 mil), irtifa (Angels 17) |
| Red Crown | "405, sweet/sweet, contact Strike" | Strike'a devir |
| 405 | "Strike, 405, Mother's 250 for 55, Angels 12, State 2.4. No alibis" | Aynı bilgiler + yakıt durumu (**State 2.4**) + bakım arızası yok (**No alibis**) |
| Strike | "405, sweet/sweet, Mother is VFR, Case I. Contact Marshal" | Gemide hava VFR, Case I; Marshal'a devir |
| 405 | "Marshal, 405, 250 for 52, Angels 9, State 2.4" | Çağrı adı, konum, irtifa, low state |
| Marshal (Case I) | "405, Case I. BRC is 015, Expected Charlie time 22. Report see me" | Case, BRC (015), beklenen Charlie time (22), "see me" talimatı |
| Marshal (Case II ya da III) | "405, Case II (or III). BRC is 015. Marshal on the 245 radial at 25 DME, Angels 10. Expected approach time 22, Approach button 17, altimeter 29.94" | Case, BRC, holding fix (**245 radyali, 25 DME, Angels 10**), beklenen yaklaşma zamanı (22), Approach button (17), altimetre (29.94) |
@k 2-12.10..2-12.18

!kaynak Örnekte Marshal check-in'i CCA dışında
Metin, Strike'ın uçakları Marshal'a "Once inside the CCA" devrettiğini söyler; CCA **50 NM**'dir. Bu örnekte ise 405, Marshal'a "250 for **52**" konumundan, yani CCA'nın dışından check-in yapıyor. (Strike'a "250 for 55" ile CCA dışında check-in yapılması metne uygundur; s. 2-17'deki örnekte Marshal check-in'i "250 for 42" ile CCA içindedir.)
@k 2-12.03, 2-12.11, 2-12.13, 2-17.26

!kaynak "See me" mi, "see you" mu?
s. 2-12'de Marshal'ın pilota 10 NM'de "see me" çağrısı yapmasını söyleyeceği yazılıdır ("instruct you to call 'see me'"). s. 2-13'te ise pilotun Marshal'ı **"see you"** çağrısıyla bilgilendireceği yazılıdır. Örnek konuşmalarda Marshal'ın talimatı "Report see me", pilotun çağrısı "405, See you at 10" şeklindedir.
@k 2-12.07, 2-13.04, 2-17.27, 2-18.03

@baglam 2-12.10

## 204.1 | Case I recovery

### Ne zaman Case I?

Case I recovery, hava **3.000/5'ten iyi** olduğu sürece mümkün olan en geniş ölçüde kullanılır.
@k 2-13.02

!kaynak Sınır değerde ifade farkı
Burada Case I için "better than 3,000/5" deniyor. s. 2-4'te Case I havası "ceiling ... no lower than 3,000 feet and not less than 5 NM visibility", s. 2-9'da "WX 3,000-5 or better" olarak, yani 3.000/5 **dahil** verilir. Tam sınır değerde hangi ifadenin geçerli olduğu belgeden anlaşılmaz.
@k 2-13.02

### a. Overhead (port) holding

Marshal'a ilk check-in'den sonra **doğrudan Mother'a** gidilir ve **filonun holding irtifasında** overhead holding'e girilir. Mother ile görsel temas kurulunca Marshal **"see you"** çağrısıyla bilgilendirilir. Case I recovery için dönen uçaklar kendi holding irtifalarına **en geç 10 NM**'de yerleşmiş (*established*) olmalıdır. Overhead holding'e gidilir ve paterne **teğet (*tangentially*)** girilir (Şekil 2-3).
@k 2-13.03..2-13.06

@f s2-13_1.png | Şekil 2-3 — Case I port holding paternine giriş (Case I Port Holding Pattern Entry)
Şekilde:
- Halka biçiminde bir holding paterni; halkada **1** (sağda), **2** (üstte, BRC tarafında), **3** (solda) ve **4** (altta) noktaları işaretli. **"Pattern Flow"** oku akışın **saat yönünün tersine (sol el)** olduğunu gösterir.
- Gemi halkanın içinde, pruvası yukarıda, halka merkezi ile 1 noktası arasında çizilmiştir; pruvadan yukarı doğru **"BRC"** oku uzanır.
- Halkanın merkezinden geçip bir kenarından öbür kenarına çizilmiş çift başlı ok **"5 NM"** etiketlidir.
- Halkanın üst yarısı (3'ten 2 üzerinden 1'e) **yeşil**, alt yarısı (3'ten 4 üzerinden 1'e) **mavi** boyalıdır; bu şekilde renklerin açıklaması yoktur.
- İki kesik çizgili giriş hattı halkaya akış yönünde **teğet** olarak katılır: biri sol üstten gelip **3 noktasında**, diğeri soldan gelip altta **4 noktası yakınında**. İkisi de **"10 NM Establish Pattern Altitude"** (10 NM'de patern irtifasına yerleş) etiketlidir.
@k 2-13.07, 2-13.F1..2-13.F5

Overhead holding paterni **sol el (*left-hand*)** bir paterndir; **Point 1 geminin tam üstündedir** (*directly overhead the carrier*). **Point 2, 3 ve 4** sırayla **90°**'lik aralıklarla gelir (Şekil 2-4). Bu holding paterni genellikle **"stack"** diye anılır; tüm uçaklar **5 NM içinde** ve **2.000 ft AGL'nin altına inmeden** kalmalıdır. Holding sırasında kol, aksi brief edilmedikçe **max conserve** yakıt akışında (*fuel flow*) kalır.
@k 2-13.08..2-13.11

@f s2-14_0.jpg | Şekil 2-4 — Case I overhead holding paterni (Case I Overhead Holding Pattern)
Şekilde:
- Şekil 2-3'teki halka: **1** (sağ), **2** (üst), **3** (sol), **4** (alt) noktaları, saat yönünün tersine **"Pattern Flow"**, halkanın içinde gemi ve yukarı doğru **"BRC"** oku, halkayı boydan boya kesen çift başlı **"5 NM"** oku.
- Halkanın **1–2–3** arasındaki üst (yeşil) yarısı **"Pattern Climb Area"** (tırmanma bölgesi), **3–4–1** arasındaki alt (mavi) yarısı **"Pattern Descent Area"** (alçalma bölgesi) olarak etiketlidir.
- Kesik çizgili ayrılış hattı halkadan **3 noktasında** sol alta doğru (okla) ayrılır, geminin kıç tarafında dönerek geri gelir ve geminin **sancak** tarafı boyunca içeri doğru, **1 noktasından** geçerek **BRC'ye paralel** uzanır.
- Sağ taraftaki **"3 NM"** ölçüsü, 1 noktasının hizasından içeri uçuş hattı üzerinde kıç taraftaki bir noktaya kadar olan mesafeyi gösterir.
- Geminin önünde, içeri uçuş hattından art arda noktalarda **sola** kıvrılan **dört etiketsiz** kesik çizgili yay vardır.
@k 2-14.01, 2-14.F1..2-14.F5

!kaynak Şekil 2-3 / 2-4 ile metin: Point 1'in yeri ve "5 NM"
- Metin Point 1'i "directly overhead the carrier" diye tanımlar ve ayrıca "point 1 (Mother)" diye anar. Şekil 2-3 ve 2-4'te ise **1** işareti halkanın sağ (sancak) kenarındadır; gemi halkanın içinde, merkez ile 1 noktası arasında çizilmiştir.
- Metin uçakların "within 5 NM" kalmasını söyler; şekillerde ise "5 NM" etiketli çift başlı ok halkanın **bir kenarından öbür kenarına** (çap boyunca) çizilmiştir. 5 NM'nin yarıçap mı çap mı olduğu belgeden kesin anlaşılmaz. Şekiller ölçeksizdir.
@k 2-13.08, 2-13.10, 2-15.09, 2-13.F2, 2-13.F3, 2-14.F1

### Stack'teki irtifalar

Her filonun stack'te **atanmış bir holding irtifası** vardır; bu irtifalar **2.000 ft AGL**'den başlar. Atanmış irtifalar arasında dikeyde **en az 1.000 ft** ayrım vardır ve irtifaları **CVW SOP** belirler. Holding'e yerleştikten sonra patern içindeki tüm irtifa değişiklikleri şöyle yapılır:

- **Tırmanmalar (*climbs*):** Point **1 ile 3** arasında yapılır.
- **Alçalmalar (*descents*):** Point **3 ile 1** arasında yapılır.

Şekil 2-4'te bu bölgeler, halkanın 1–2–3 arasındaki yarısında **"Pattern Climb Area"**, 3–4–1 arasındaki yarısında **"Pattern Descent Area"** olarak gösterilir.
@k 2-14.02..2-14.06, 2-14.F2

### Holding'den ayrılma

Stack'teki **en alçak uçak**, beklenen **ramp time**'da groove'a varabilmek için kalkışları (*launch*) yakından izlemelidir. **Son uçak kalkarken** ya da Tower'dan **"Signal Charlie"** çağrısı alındığında kol, holding paterninden **BRC'ye göre yaklaşık 210°** heading ile ayrılır. Stack'teki irtifalar boşaldıkça **bir üst irtifadaki** uçaklar **bir alttaki boşalan** irtifaya iner.
@k 2-14.07..2-14.09

### b. Breaking the deck

Case I operasyonlarının çoğu **Zip Lip** koşullarında yapılır: telsiz konuşmaları en aza indirilir (**CQ, düşük görüş ya da uçuş emniyeti** durumları hariç). Bu durumda Boss telsizden **"99, Charlie"** çağrısı **yapmaz**; bu yüzden holding'den ne zaman ayrılacağına, initial'e uçup ne zaman break yapacağına **overhead'de bekleyen uçakların kendisi** karar vermelidir. Amaç, uçuş güvertesi recovery operasyonlarına hazır hâle getirildiği anda (**ready deck**) **groove**'a varmaktır. Buna **"breaking the deck"** denir; recovery operasyonlarının verimini en üst düzeye çıkarmak için ustalaşılması gereken bir beceridir.
@k 2-15.01..2-15.04

Deck'i etkin biçimde "break" etmek için overhead holding'deki uçaklar, **aynı irtifadaki tüm kollarla eşit aralık** sağlayacak şekilde aralıklarını kaydırır (*stagger*):

| Aynı irtifadaki toplam kol sayısı | Kollar arasındaki açı |
|---|---|
| 2 | 180° |
| 3 | 120° |
| 4 | 90° |

Böylece uçaklar **Point 1 (Mother)** üzerinden **düzenli aralıklarla** geçer. Her kol kalkış (*departure*) operasyonlarını izler ve break için holding'den **Point 3**'te ayrılıp ayrılmayacağına kendisi karar verir.
@k 2-15.05..2-15.10

@w c_holding
@k 2-13.08..2-13.10, 2-14.02, 2-14.03, 2-14.05, 2-14.06, 2-14.08, 2-14.09, 2-15.05..2-15.10, 2-14.F2, 2-14.F3

### c. Break

Holding'den ayrılırken kol **Point 3'ün dışında 800 ft'e alçalır** ve geminin **3 NM gerisindeki (*astern*) initial**'e gider. Kol içeri doğru devam eder ve **800 ft**'te, geminin **sancak tarafının hemen dışından**, **BRC'ye paralel** uçar. **Break irtifası 800 ft'tir ve tüm break'ler yatay (*level*) yapılır.** Break aralığını **iniş paternindeki son uçak** belirler. **15–20 saniyelik** break aralığı **40–60 saniyelik** iniş aralığına karşılık gelir.
@k 2-15.11..2-15.15

Geminin **4 NM'den daha ilerisinde break yapılmaz.** 4 NM'den önce break yapamazsanız paterni terk edip yeniden girmeniz gerekir: **5 NM'ye kadar 800 ft**'i koruyun, sonra **1.200 ft**'e tırmanın ve initial'e geri dönmek için **sola doğru bir yay** (*left-hand arc*) uçun. Niyetinizi **Tower**'a bildirmeniz gerekir.
@k 2-15.16..2-15.19

### d. Spin prosedürleri

Kol **fantail**'e (geminin kıçına) vardığında patern **doluysa (paternde altıdan fazla uçak varsa)** kol **"spin it"** yapmak zorundadır. Spin için kol **aynı anda** **1.200 ft**'e tırmanır ve **3 DME içinde** kalarak **sola** döner. **270°** döndükten sonra (**abeam'in gerisinde**, *aft of abeam*) **800 ft**'e alçalır ve break için içeri gider. **Spin paterninden break'e yeniden giren uçakların break'te önceliği vardır.**
@k 2-15.20..2-15.23

**Upwind** aralığı **"first to the bow"** (pruvaya ilk varan) kuralıyla belirlenir; pruvaya ilk varan break trafiği, waveoff, touch-and-go ya da bolter olabilir. Ancak initial'e yeniden girerken, break için içeri gelen diğer uçaklarla çakışmamak için dikkatli olunmalıdır.
@k 2-15.24, 2-15.25

### e. Gemi iniş paterni (Carrier Landing Pattern)

Gemi iniş paterni sahadaki iniş paternine çok benzer. **En büyük fark**, gemide **180 ve Abeam pozisyonlarının aynı yerde** olmasıdır. Ayrıca gemide **downwind heading'i BRC'nin tersidir** (*reciprocal*); landing heading'in tersi değildir. Landing heading, açılı güverte nedeniyle **BRC'den yaklaşık 10° az** olur. Downwind'e yerleşince her uçak **600 ft** patern irtifasına alçalır, **landing checks**'i yapar ve **abeam mesafesini** yakından izler. Gemi iniş paterni Şekil 2-5'te gösterilmiştir.
@k 2-15.26..2-15.30

@f s2-16_0.jpg | Şekil 2-5 — Gemi iniş paterni (Carrier Landing Pattern)
Şekildeki etiketler, paterndeki sırayla:

| Pozisyon | Şekildeki bilgi |
|---|---|
| **INITIAL** | 3 nm astern · 800 ft · **300 KIAS** |
| **BREAK** | "On Interval or No Earlier Than 1 nm" (aralıkta ya da 1 nm'den önce değil) · "Wingman: 15 sec Interval" (wingman: 15 saniye aralık); etiketin yanında büyük, içi boş bir ok |
| **TURN DOWNWIND** | "Interval's Hook Down, 7 o'clock" |
| **DOWNWIND** | 600 ft on-speed · Airspeed Check (hız kontrolü) · Landing Checks · Trimmed Up (trimli) |
| **ABEAM** | 600 ft · Establish VSI: 200–300 fpm, 27–30° AOB · abeam noktasında **"ABEAM CALL"** işareti |
| Abeam mesafesi | Abeam noktasından gemiye kesik çizgi: ".9 - 1.1 nm" (**0,9–1,1 NM**) |
| **90** | **450 ft** · 27–30° AOB · VSI: 500 fpm |
| **45** | **325–375 ft** |
| **BALL CALL** | Finalde, iniş alanı hizasındaki uçakta; uçaktan geminin kıçına kesik çizgi |
| **TOUCH AND GO/BOLTER** | "Climb, Turn to Parallel BRC" (tırman, BRC'ye paralel dön) |

Ayrıca abeam noktasından finale doğru dışta uzanan ince bir eğri üzerinde **"90°"** (altta) ve **"45°"** (sağda) işaretleri vardır.
@k 2-16.01, 2-16.F1..2-16.F11

@w c_inispaterni
@k 2-15.11..2-15.18, 2-15.27..2-15.29, 2-16.03..2-16.08, 2-17.02, 2-17.07, 2-17.09, 2-17.10, 2-18.10, 2-18.14..2-18.18, 2-16.F1..2-16.F10

### f. Touch and go / bolter

Touch and go inişleri ile bolter prosedürleri **aynıdır**:

1. Top (**ball**) **teker değene kadar** uçulmaya devam edilir.
2. Temas anında **aynı anda**: güç **MRT**'ye getirilir, **speed brake**'ler kapatılır (*retract*) ve **optimum AOA**'ya rotate edilir.
3. Kanatlar düz tutulur, **pozitif tırmanma oranı** doğrulanır ve optimum AOA korunur.
4. Pozitif tırmanma oranı sağlanıp uçak **pruva hizasına** (*abeam the bow*) gelince **hafif bir sağ dönüşle** BRC'ye paralel olunur.
5. Pruvaya sizden önce varan her uçağa — ister break'e giriyor ister katapulttan kalkıyor olsun — **aralık verilir** (*take interval*).
6. **Patern irtifasına (600 ft)** tırmanılır ve uygun aralıkla downwind'e dönülür.
@k 2-16.02..2-16.08

!dikkat CAUTION
Katapulttan kalkan ya da break'teki uçaklarla çakışmamak için **geminin pruvasının önünden geçmeyin**.
@k 2-17.02

### g. Waveoff

**Waveoff'lar ZORUNLUDUR (*MANDATORY*).** LSO ya da tower aksini söylemedikçe (ör. **"waveoff starboard side"**) tüm waveoff'lar **açılı güverte boyunca** (*up the angled deck*) yapılır. Waveoff işaretleri ister **sözlü** olsun ister **yalnızca lens üzerindeki waveoff ışıklarıyla** verilsin, tüm uçaklar bunlara uymak zorundadır. Waveoff'a yol açabilecek durumlar: **fouled deck**, **limit dışı rüzgâr** (*winds out of limits*) ya da uçağın **emniyetli iniş için uygun durumda olmaması** (*not being set up for a safe landing*).
@k 2-17.03..2-17.06

Waveoff için **aynı anda**: güç **MRT**'ye getirilir, speed brake'ler kapatılır, **iniş duruşu (*landing attitude*) korunur (optimum AOA aşılmadan)**, kanatlar düzlenir ve **açılı güverte boyunca** tırmanılır. Pozitif tırmanma oranı doğrulanır ve optimum AOA korunur. Pozitif tırmanma oranı sağlanıp **pruva hizasına** gelince **hafif bir sağ dönüşle** geminin BRC'sine paralel olunur. **600 ft**'e tırmanılır ve uygun aralıkla downwind'e dönülür.
@k 2-17.07..2-17.10

Touch and go / bolter ile waveoff karşılaştırması:

| | Touch and go / bolter | Waveoff |
|---|---|---|
| Güç ve speed brake | Temasta aynı anda MRT, speed brake'ler içeri | Aynı anda MRT, speed brake'ler içeri |
| Duruş | Optimum AOA'ya rotate | Landing attitude korunur (optimum AOA aşılmaz) |
| Tırmanma | Kanatlar düz, pozitif tırmanma, optimum AOA | Kanatlar düz, açılı güverte boyunca tırmanma, pozitif tırmanma, optimum AOA |
| Dönüş | Pozitif tırmanma + pruva hizası → hafif sağ dönüş, BRC'ye paralel | Aynı |
| Sonra | 600 ft'e tırman, uygun aralıkla downwind | Aynı |
@k 2-16.04..2-16.08, 2-17.07..2-17.10

### h. Delta prosedürleri

Paterndeyken tower **signal Delta** verirse **patern irtifası korunur** ve **aynı iniş paterni** uçulur. Patern **on-speed**, **iniş konfigürasyonunda** ve **speed brake'ler kapalıyken** uçulur (**Delta Easy**). **Delta clean** ise **200 KIAS** ve **atanan irtifa** demektir. Delta paterninden çıkış izni (*cleared*) verildiğinde **180 pozisyonuna ilk varan uçak** normal yaklaşmaya devam eder.
@k 2-17.11..2-17.14

### i. Gemiye durdurmalı iniş (Carrier Arrestment)

Yaklaşma **tam olarak bir touch and go gibi** yapılır; top **teker değene kadar** uçulur. Uçak temas edince güç **MRT**'ye getirilir ve speed brake'ler kapatılır. **Durdurmalı inişi önceden beklemeyin** (*do not anticipate an arrested landing*). Sonraki sıra:

1. Uçak **tamamen durana** ve **saat 1–2 yönündeki yellow shirt** güç azaltma (**power back**) işareti verene kadar **MRT** korunur.
2. Yellow shirt **fren bırakma** (*brake release*) ve **geri çekilme** (*pull-back*) işareti verir.
3. Ardından **stop** işareti ve **hook up** işareti gelir.

Pull-back, **telin kancadan kurtulmasını** sağlar. Pilot bu sırada **fren yaparsa** uçak **geriye yatar** ve **kuyruk bölümü hasar görebilir**. **Yellow shirt'ün talimatlarına / komutlarına uyun.**
@k 2-17.15..2-17.22

### j. Haberleşme

Case I recovery'lerde Marshal ilk check-in'de **recovery Case'ini, güncel BRC'yi ve beklenen "Charlie" zamanını** verir. **Charlie time**, kalkış (*launch*) operasyonlarının **bittiği** ve recovery operasyonlarının **başladığı** zamandır. Ayrıca Marshal, gemi görüldüğünde — normalde **10 NM** civarında — kendisine bildirilmesini ister. Örnek konuşmalar:
@k 2-17.23..2-17.25

| Sıra | Konuşan | Çağrı |
|---|---|---|
| i | 405 | "Marshal, 405, 250 for 42, Angels 9, State 2.4" |
| ii | Marshal | "405, Case I. BRC is 015, Report, see me" |
| iii | 405 | "405, Wilco" |
| | *10 NM'de ya da gemi görülünce:* | |
| iv | 405 | "405, See you at 10" |
| v | Marshal | "405, Switch Tower" |
@k 2-17.26, 2-17.27, 2-18.01..2-18.04

!kaynak Örnekte Charlie time yok
(j) metni Marshal'ın ilk check-in'de beklenen "Charlie" zamanını vereceğini söyler ("expected 'Charlie' time upon initial check in"). Hemen ardından gelen örnekte ise Marshal'ın çağrısında ("405, Case I. BRC is 015, Report, see me") Charlie time yoktur; s. 2-12'deki örnekte vardır ("Expected Charlie time 22").
@k 2-17.23, 2-17.27, 2-12.14

### Tower frekansı ve Zip Lip

Tower frekansına geçildikten sonra frekans **yalnızca dinlenir**. Case I operasyonlarının çoğu **"Zip Lip"** yapılır: paternde telsiz çağrıları **ne gereklidir ne de istenir**. Ancak **düşük görüş** durumlarında şu çağrılar yapılır:
@k 2-18.05..2-18.08

| Durum | Çağrı |
|---|---|
| Overhead holding'den initial'e alçalırken | "405, commencing" |
| Initial (3 NM astern) | "405, initial" |
| Spin paternine girerken (gerekiyorsa) | "405, spinning" |
| Spin yaparken initial'den 90° sonra | "405, spin 90" |
| Port holding'e yeniden girmek için iniş paterninden ayrılırken | "405, Departing _____ NM, upwind" |
| Break yaparken | "405, breaking at X" (X = DME) |
| **Ball call:** groove'a girerken pilot topu görünce | "405, Goshawk Ball, 2.2" (2.2 = yakıt durumu) |
| **Clara:** top görünmüyorsa | "405, Clara" |
@k 2-18.09..2-18.16

**Zip Lip** operasyonlarında **ball call yapılmaz**. Uçak groove'a girerken LSO, söylenmemiş (örtük, *implied*) ball call'u **cut ışıklarını kısa süre yakarak** onaylar; bu, LSO'nun **"roger ball"** çağrısıyla aynıdır. Top görünmüyorsa **"clara"** çağrısı yapılır. Zip Lip operasyonları sırasında **uçuş emniyetini ilgilendiren her durumda, her an** telsiz çağrısı yapılır.
@k 2-18.17..2-18.20

!not NOTE
Başka bir uçak toptayken (*on the ball*), uçuş emniyeti gerektirmedikçe **asla telsizde konuşmayın**.
@k 2-18.22

@baglam 2-15.30, 2-17.25
