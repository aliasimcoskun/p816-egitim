<!--
Ek C, parça a: C.1 – C.4 (s. C-1 – C-4) — LSO telsiz çağrıları (LSO Radio Calls)
Şekil birimleri: kaynak/ekC_sekil_birimleri_a.json (her tablo satırı bir birim)
Bileşen: ekC_cagri (sablon/bilesenler_ekC_a.html)
Çağrılar (TRANSMISSION) İngilizce, tırnak içinde aynen; parantezler ve eğik çizgiler kaynaktaki gibidir.
-->

## C.1 | Bilgilendirici çağrılar (Informative)

### Ek C nasıl okunur?

Ek C, LSO'nun telsiz çağrılarını dört şekilde (**Şekil C-1 – C-4, "LSO Radio Calls 1–4"**) tablo hâlinde verir. Çağrılar üç gruba ayrılır; bunlar Bölüm 1'de (101) sayılan üç çağrı tipiyle aynıdır: INFORMATIVE, ADVISORY ve IMPERATIVE.

| Grup | Tablodaki tanım | Şekil |
|---|---|---|
| **INFORMATIVE CALLS** (bilgilendirici) | Pilotları **mevcut durumlar** hakkında bilgilendirmek için kullanılır. | C-1 |
| **ADVISORY CALLS** (tavsiye) | Pilotun dikkatini **olası zorluklara** çekmek ve **olası kumanda hatalarını önlemek** için kullanılır. | C-2 |
| **IMPERATIVE CALLS** (emir) | Pilota **belirli bir kumanda hareketini** yaptırmak için kullanılır. **ZORUNLU, ANINDA YANIT** (*MANDATORY IMMEDIATE RESPONSE*). | C-3 ve C-4 ("IMPERATIVE CALLS (Cont.)") |
@k C-1.01, C-2.01, C-3.01, C-4.01, C-1.F1, C-2.F1, C-3.F1, C-4.F1

Her tablonun dört sütunu vardır: **TRANSMISSION** (LSO'nun yaptığı çağrı), **MEANING** (anlamı), **RESPONSE (Aircraft in Manual Mode)** (uçak *manual* moddayken pilotun yanıtı) ve **RESPONSE (Aircraft in APC Mode)** (uçak **APC** modundayken pilotun yanıtı). Aşağıdaki tablolarda çağrılar İngilizce ve tırnak içinde aynen verilmiştir; parantez içindeki sözcükler ve eğik çizgili seçenekler (ör. "(a little)", "left/right") kaynaktaki gibidir.
@k C-1.F1, C-2.F1, C-3.F1, C-4.F1

**APC modu.** Belge APC kısaltmasını açmaz; tablodan şunlar anlaşılır: APC'deki uçak için *auto* da denir (hız çağrısı "if auto" ise "Go manual" ile izlenir); **"Go manual."** çağrısının anlamı **APC'yi devreden çıkarmaktır** (*Disengage APC*); hız çağrısının APC yanıtı "APC is not maintaining aircraft at optimum AOA" der, yani APC'nin uçağı **optimum AOA**'da tutması beklenir. Bu nedenle APC yanıtlarında pilot düzeltmeyi çoğunlukla **burun duruşuyla** (*attitude*) yapar; güç gerektiren bazı çağrılarda ise önce **APC devreden çıkarılır**. Ayrıntılı karşılaştırma C.4'tedir.
@k C-1.F10, C-3.F6, C-1.F2, C-3.F3

@f sC-1_0.png | Şekil C-1 — LSO telsiz çağrıları 1: bilgilendirici çağrılar (LSO Radio Calls 1)
Şekil, **INFORMATIVE CALLS** tablosudur ("Used to inform pilots of existing situations"): **18 çağrı**, dört sütun (TRANSMISSION, MEANING, RESPONSE — Manual Mode, RESPONSE — APC Mode). Satırlar aşağıda konularına göre gruplanarak Türkçe tablolarla verilmiştir.
@k C-1.01, C-1.F1

### Süzülüş yolu (glideslope) çağrıları

Bu çağrılar uçağın optimum glideslope'a göre konumunu bildirir. "high" ve "going high (low)" çağrılarında **manual** modda batma oranı **güç/burun duruşu** ile, **APC** modunda **yalnızca burun duruşuyla** ayarlanır; "high" çağrısının APC yanıtına ayrıca "(Avoid using in close.)" notu düşülmüştür. "low" çağrısında iki modda da yanıt aynıdır: glide slope **hemen** ayarlanır.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “You’re (a little) high.” | Uçak optimum glideslope'un (biraz) **üstünde**. | Merkez topu (*center ball*) kurmak için batma oranını (*sink rate*) **güç/burun duruşu** (*power/nose attitude*) ile ayarla. | Merkez topu kurmak için batma oranını **burun duruşuyla** ayarla. (*In close* kullanmaktan kaçının.) |
| You’re (a little) low.” | Uçak optimum glideslope'un (biraz) **altında**. | Glide slope'u **hemen** ayarla. | Glide slope'u **hemen** ayarla. |
| “You’re going high (low).” | Düzeltilmezse uçak optimum glideslope'un **üstüne çıkacak (altına inecek)**. | Merkez topu **korumak** için batma oranını **güç/burun duruşu** ile ayarla. | Merkez topu korumak için batma oranını **burun duruşuyla** ayarla. |
| “You’re on glideslope/glidepath.” | Açıklama gerektirmez (*self-explanatory*). | Yok (*N/A*). | Yok (*N/A*). |
@k C-1.F2..C-1.F4, C-1.F6

### Hız ve güç

"You’re on speed." bilgi verir, yanıt gerektirmez. Hız çağrısında uçak **auto**'daysa (APC) ardından **"Go manual"** gelir; APC yanıtı APC'yi devreden çıkarıp gücü/duruşu elle ayarlamaktır. "You’re underpowered/overpowered." çağrısı APC modunda **kullanılmaz**.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “You’re on speed.” | Açıklama gerektirmez (*self-explanatory*). | Yok (*N/A*). | Yok (*N/A*). |
| “You’re (a little fast/slow).” (To be followed by “Go manual” if auto.) | Açıklama gerektirmez (*self-explanatory*). Uçak *auto*'daysa ardından **“Go manual”** gelir. | Optimum **AOA**'yı kurmak için burun duruşunu/gücü ayarla. | APC uçağı optimum AOA'da tutmuyor. **APC'yi devreden çıkar** (*disengage*) ve optimum AOA'yı korumak için gücü/duruşu ayarla. |
| “You’re underpowered/overpowered.” | Açıklama gerektirmez (*self-explanatory*). | Duruşu ve gücü gerektiği gibi ayarla. | Kullanılmaz (*not used*). |
@k C-1.F7, C-1.F10, C-1.F17

### Hat (lineup) ve dış etkenler

"lined up" çağrısı hattın kısa geçildiğini/aşıldığını (yanıt: ortalanmış hattı **yeniden kur**), "drifting" çağrısı uçağın **kaymakta** olduğunu (yanıt: hattı merkez hattına **düzelt**) bildirir. Rüzgâr ve geminin dönüşüyle ilgili çağrılarda da pilot hattı izler ya da ayarlar. Bu grupta iki modun yanıtları aynıdır.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “You’re on centerline.” | Açıklama gerektirmez (*self-explanatory*). | Yok (*N/A*). | Yok (*N/A*). |
| “You’re lined up left/right.” | Uçak merkez hattını **kısa geçmiş / aşmış** (*undershot/overshot*). | Ortalanmış hattı (*centered lineup*) **yeniden kur**. | Ortalanmış hattı **yeniden kur**. |
| “You’re drifting left/right.” | Uçak merkez hattının soluna/sağına **kayıyor** (*drifting*). | Hattı merkez hattına **düzelt**. | Hattı merkez hattına **düzelt**. |
| “Winds are (slightly) starboard/port/axial.” | Açıklama gerektirmez (*self-explanatory*). | Merkez hattını korumak için hattı **izle** (*monitor lineup*). | Merkez hattını korumak için hattı **izle**. |
| “Ship’s in a starboard/port turn.” | Açıklama gerektirmez (*self-explanatory*). | Hattı gerektiği gibi ayarla. | Hattı gerektiği gibi ayarla. |
@k C-1.F5, C-1.F8, C-1.F9, C-1.F16, C-1.F18

### LSO'nun kontrolü ve onay çağrıları

**"Roger Ball"**, **"Paddles contact."** ve **"Continue."** LSO'nun kontrol ve onay çağrılarıdır. "Roger Ball" ve "Paddles contact." için pilot yanıtı yoktur (N/A). "Continue." çağrısında LSO pilotun **CLARA** çağrısını onaylar ama kontrolü **CCA'dan devralamaz**; pilot yaklaşmaya **minimumlara kadar** devam eder. **MOVLAS** kullanımdayken ("MOVLAS recovery.") pilot "Roger ball" alınana kadar yayımlanmış patern irtifasını uçar.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Roger Ball” (“Auto”/“Coupled” as appropriate). | LSO, pilotun **meatball'u gördüğünü** (*meatball acquisition*), **hat referansını** (*lineup reference*) ve **hücum açısını** (*angle of attack*) aldığını onaylar. Duruma göre “Auto” / “Coupled” eklenir. | Yok (*N/A*). | Yok (*N/A*). |
| “Paddles contact.” | LSO kontrolü **CCA'dan devralıyor**. | Yok (*N/A*). | Yok (*N/A*). |
| “Continue.” | LSO **CLARA** çağrısını onaylar ama kontrolü **CCA'dan devralamaz**. | Yaklaşmaya **minimumlara kadar** devam et. | Yaklaşmaya **minimumlara kadar** devam et. |
| “MOVLAS recovery.” | **MOVLAS** kullanımda. | **“Roger ball”** alınana kadar yayımlanmış patern irtifasını (*published pattern altitude*) uç. | **“Roger ball”** alınana kadar yayımlanmış patern irtifasını uç. |
@k C-1.F11..C-1.F13, C-1.F19

!not Bölüm 1 ve 2 ile bağlantı: "Roger ball", CLARA ve MOVLAS
- **Roger ball:** Zip Lip ya da EMCON'da LSO, uçak groove'a yaklaşırken **cut ışıklarını kısa süre yakarak** "Roger ball" der (1-12.16, 1-12.17); Zip Lip'te söylenmemiş ball call da aynı şekilde onaylanır (2-18.18). Telsizle yapılan ball call'u LSO'lar "roger"lar (2-25.08); Case III örneğinde LSO'nun yanıtı **"Roger ball"**dur (2-27.21). Ek C bu çağrının anlamını meatball, hat referansı ve AOA'nın onayı olarak verir; Ek A sözlüğü ise "Roger Ball"ı inişe izin verildiğini ve LSO'nun pozitif kontrolü aldığını gösteren çağrı olarak tanımlar (A-6.04).
- **Paddles:** LSO'nun lakabı ve çağrı adıdır (1-2.17; Ek A, A-5.06); "Paddles contact." LSO'nun kontrolü devraldığını bildirir.
- **CLARA:** Top görünmüyorsa pilotun yaptığı çağrıdır ("405, Clara", 2-18.16, 2-18.19; Ek A: "Meatball is not in sight", A-2.16). Ek C'deki **"Continue."**, LSO'nun bu çağrıya kontrolü devralamadığı durumdaki yanıtıdır.
- **MOVLAS:** Birincil sistem çalışmadığında, IFLOLS stabilizasyon limitleri aşıldığında ve eğitimde kullanılan yedek iniş yardımcısıdır (1-14.02); topu doğrudan LSO kontrol eder (1-15.01).
@k C-1.F11..C-1.F13, C-1.F19

!kaynak "CCA" kısaltması belgede iki anlamda
Ek C'de "Paddles contact." = "LSO assuming control from **CCA**." ve "Continue." = "... not able to assume control from **CCA**". Belge CCA'yı iki ayrı anlamda kullanır: Bölüm 1'de **Carrier Control Area** (geminin 50 NM çevresi, 1-3.25, 1-3.26) ve ACLS Mode III için **Carrier Controlled Approach** (1-10.19); Ek A sözlüğü de "CCA: Carrier-controlled approach similar to a GCA" der (A-2.10). Ek C kısaltmayı açmaz; kontrolün LSO'ya geçişi bağlamı **Carrier Controlled Approach** anlamına uyar.
@k C-1.F12, C-1.F13

### Güverte hareketi ve OLS

Güverte hareket ederken OLS bilgisi **geçersiz olabilir**; LSO ardından advisory/imperative çağrılar yapar ve pilot LSO'nun yönlendirmesiyle düzeltir (APC'de yalnızca duruşla). Güverte sabitse OLS bilgisi **geçerlidir** ve normal yaklaşma uçulur.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “The deck is moving down/up (a little).” | OLS bilgisi **geçersiz olabilir** (ardından advisory/imperative çağrılar gelir). | Gücü ve duruşu **LSO'nun yönlendirmesiyle** (*under LSO guidance*) ayarla. | **Duruşu** LSO'nun yönlendirmesiyle ayarla. |
| “The deck is steady.” | OLS bilgisi **geçerli**. | **Normal yaklaşma** uç. | **Normal yaklaşma** uç. |
@k C-1.F14, C-1.F15

## C.2 | Tavsiye çağrıları (Advisory)

**ADVISORY CALLS**, pilotun dikkatini **olası zorluklara** çekmek ve **olası kumanda hatalarını önlemek** için kullanılır (*Used to direct pilot’s attention to potential difficulties and prevent possible control errors*). Tablo **12 çağrı** içerir.
@k C-2.F1

@f sC-2_0.png | Şekil C-2 — LSO telsiz çağrıları 2: tavsiye çağrıları (LSO Radio Calls 2)
Şekil, **ADVISORY CALLS** tablosudur: 12 çağrı, dört sütun (TRANSMISSION, MEANING, RESPONSE — Manual Mode, RESPONSE — APC Mode). Satırlar aşağıda Türkçe tablolarla verilmiştir.
@k C-2.01, C-2.F1

### Yatış ve hat

Üç çağrı da uçağın merkez hattını **aşma** ya da hattın optimum olmaması tehlikesini haber verir; yanıtlar iki modda aynıdır. **"Check your lineup."** yalnızca **start**'ta (*Start only*) kullanılır.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Keep your turn in.” | Yatış açısı (*angle of bank*) ayarlanmazsa uçak merkez hattını **aşacak** (*overshoot*). | **Yatış açısını** ayarla. | **Yatış açısını** ayarla. |
| “Check your lineup.” (Start only.) | (Yalnızca **start**'ta.) Uçağın hattı optimum değil. | Uçağı merkez hattında tutmak için hat kaymasını (*lineup drift*) ya da konumu düzelt. | Uçağı merkez hattında tutmak için hat kaymasını ya da konumu düzelt. |
| “Back to the right/left.” | Uçak, kayma düzeltilmezse merkez hattını **aşacak** biçimde kayıyor. | Merkez hattında kalmak için hat kaymasını düzelt. | Merkez hattında kalmak için hat kaymasını düzelt. |
@k C-2.F2..C-2.F4

### Süzülüş yolu

"Don’t settle." / "Don’t go low." çökmeyi, "Don’t climb." / "Don’t go high." **topun yükselmesini**, "Don’t go any lower (higher)." ise glideslope'un epey altında (üstünde) **düzeltmesiz kalmayı** haber verir. Sonuncusunda APC yanıtı yalnızca **duruşla** düzeltmedir.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Don’t settle.” “Don’t go low.” | Düzeltilmezse uçak optimum glideslope'un **altına çökecek** (*settle*). | Glideslope'un altına çökmemek için **batma oranını ve meatball'u** kontrol et. | Glideslope'un altına çökmemek için **batma oranını ve meatball'u** kontrol et. |
| “Don’t climb.” “Don’t go high.” | Uçak optimum glideslope'**ta ya da glideslope'un üstünde**; sabit glideslope'u korumaya yetecek alçalma oranı (*rate of descent*) **yok**. | **Topun yükselmesini durdurmak** için gücü/duruşu ayarla. | **Topun yükselmesini durdurmak** için gücü/duruşu ayarla. |
| “Don’t go any lower (higher).” | Uçak optimum glideslope'un **epey altında (üstünde)** kalıyor; düzeltme yetersiz ya da hiç yok. | Optimum glideslope'a doğru **pozitif düzeltme** için gücü/duruşu ayarla. | Optimum glideslope'a doğru pozitif düzeltme için **duruşu** ayarla. |
@k C-2.F5..C-2.F7

!not Bölüm 1 ile bağlantı: "Meatball Motherhood"
Bölüm 1'deki kurallardan biri "Never re-center a high ball in close, but stop a rising ball" der (1-15.14). Ek C'de **"Don’t climb." / "Don’t go high."** çağrısının yanıtı da **topun yükselmesini durdurmaktır**; "You’re (a little) high." çağrısının APC yanıtında ise "(Avoid using in close.)" notu vardır.
@k C-2.F6, C-1.F2

### Güverte hareketi ve OLS bilgisi

Bu üç çağrı OLS'nin (ışıkların) güvenilir olup olmadığını söyler: **"Don’t chase it"** güverte hareketinin **yanılsama** yaratabileceğini, **"Hold what you’ve got."** OLS bilgisinin **geçersiz** ama mevcut alçalma oranının **doğru** olduğunu, **"Fly the ball."** OLS bilgisinin **geçerli** olduğunu bildirir.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Don’t chase it” | Pilotu, güvertenin aşağı/yukarı hareket ettiği ve bunun **tırmanma ya da alçalma yanılsaması** (*illusion*) yaratabileceği konusunda uyarır. | **Güverte hareketini dikkate alma**; alçalma oranını ve optimum hava hızını korumak için gücü/duruşu ayarla. | **Güverte hareketini dikkate alma**; alçalma oranını ve optimum hava hızını korumak için gücü/duruşu ayarla. |
| “Hold what you’ve got.” | OLS bilgisi **geçersiz**. Mevcut alçalma oranı, uygun (*proper*) glideslope'u korumak için **doğru**. | Gücü/duruşu ayarla. **Mevcut alçalma oranını** ve optimum hava hızını koru. | Duruşu ayarla. **Mevcut (optimum) alçalma oranını** koru. |
| “Fly the ball.” | OLS bilgisi **geçerli**. | **Lensi tara**; optimum glideslope'u korumak için gücü/duruşu ayarla. | **Lensi tara**; optimum glideslope'u korumak için duruşu ayarla. |
@k C-2.F8..C-2.F10

### Aşırı düzeltmeler ("Easy ...")

"Easy" çağrıları, **bu çağrıdan hemen önce** yapılan düzeltmenin büyüklüğünün **aşırı** olduğunu bildirir: "Easy with it." **güç**, "Easy with your nose." **burun duruşu**, "Easy with your wings." **hat** düzeltmesi için. "Easy with it." çağrısında APC'deki pilot **burun duruşu** düzeltmesini azaltır; "Easy with your nose." APC modunda **kullanılmaz**.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Easy with it.” | Bu çağrıdan hemen önceki **güç düzeltmesinin** büyüklüğü aşırı. | Optimum glideslope'u ve hava hızını yakalayıp yeniden kurmak için **güç düzeltmesinin** büyüklüğünü azalt. | Optimum glideslope'u ve hava hızını yakalayıp yeniden kurmak için **burun duruşu düzeltmesinin** büyüklüğünü azalt. |
| “Easy with your nose.” | Bu çağrıdan hemen önceki **burun duruşu düzeltmesinin** büyüklüğü aşırı. | Optimum uçak duruşunu kurmak için burun duruşu düzeltmesinin büyüklüğünü azalt. | Kullanılmaz (*not used*). |
| “Easy with your wings.” | Bu çağrıdan hemen önceki **hat (lineup) düzeltmesinin** büyüklüğü aşırı. | Merkez hattını yakalayıp yeniden kurmak için hat düzeltmesinin büyüklüğünü azalt. | Merkez hattını yakalayıp yeniden kurmak için hat düzeltmesinin büyüklüğünü azalt. |
@k C-2.F11..C-2.F13

## C.3 | Emir çağrıları (Imperative)

**IMPERATIVE CALLS**, pilota **belirli bir kumanda hareketini** yaptırmak için kullanılır; yanıt **zorunlu ve anında** verilir (*MANDATORY IMMEDIATE RESPONSE*). Tablo Şekil C-3'te başlar ve Şekil C-4'te **"IMPERATIVE CALLS (Cont.)"** başlığıyla sürer: toplam **20 çağrı** (C-3'te 14, C-4'te 6) ve C-4'ün altında bir **Not**.
@k C-3.F1, C-4.F1, C-4.F8

@f sC-3_0.png | Şekil C-3 — LSO telsiz çağrıları 3: emir çağrıları (LSO Radio Calls 3)
Şekil, **IMPERATIVE CALLS** tablosunun ilk kısmıdır: 14 çağrı, dört sütun. Başlık altındaki açıklama: "Used to direct the pilot to execute a specific control action. MANDATORY IMMEDIATE RESPONSE".
@k C-3.01, C-3.F1

@f sC-4_0.png | Şekil C-4 — LSO telsiz çağrıları 4: emir çağrıları, devam (LSO Radio Calls 4)
Şekil, **IMPERATIVE CALLS (Cont.)** tablosudur: 6 çağrı. "Climb." satırında iki yanıt sütunu **tek hücrede** birleşiktir. Tablonun altındaki **Note** kutusu, yıldız işaretiyle "Downgrade." çağrısına bağlanır.
@k C-4.01, C-4.F1, C-4.F7, C-4.F8

### Güç

Güç çağrılarında manual ve APC yanıtları en çok burada ayrılır: **"A little power."** APC modunda **kullanılmaz**; **"Power back on."** ve **"Power."** APC'de önce **APC'nin devreden çıkarılmasını** ister; **"Go manual."** manual modda **kullanılmaz**, APC'de APC'yi devreden çıkarır. **"Burner."** iki modda da **afterburner** gücü seçtirir (uçağın gücü aşırı yetersiz ya da uçak *in extremis*).

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “A little power.” | Uçak **yavaşlıyor ya da çöküyor** (*settling*). | **Güçle** düzelt. | Kullanılmaz (*not used*). |
| “Power back on.” | Pilot **aşırı güç azaltması** yaptı. | Optimum glideslope/AOA'yı korumak için **güç ekle**. | **APC'yi devreden çıkar.** Optimum glideslope/AOA'yı korumak için güç ekle. |
| “Power.” | Uçak **alçak/yavaş**. | **Güç ekle.** | **APC'yi devreden çıkar.** Not'a bakın (*Refer to Note*). |
| “Burner.” | Uçağın gücü **aşırı derecede yetersiz** (*extremely underpowered*) ya da uçak *in extremis*. | **Afterburner** gücünü seç. | **Afterburner** gücünü seç. |
| “Go manual.” | **APC'yi devreden çıkar.** | Kullanılmaz (*not used*). | **APC'yi devreden çıkar.** Not'a bakın (*Refer to Note*). |
@k C-3.F2..C-3.F6

!not Bölüm 1 ile bağlantı: cut ışıkları, "Roger ball" ve güç
Zip Lip ya da EMCON'da telsiz yerine **cut ışıkları** kullanılır: groove'a yaklaşırken kısa süre yanmaları "Roger ball", **sonradan yeniden yanmaları güç ekleme çağrısıdır** (1-12.17, 1-12.18; Ek A da cut ışıklarının sonraki yanışını "power" olarak tanımlar, A-2.25). Adı benzese de belgede cut ışıkları **"Cut."** çağrısı için anılmaz; Ek C'deki "Cut." çağrısının yanıtı barricade recovery içindir.
@k C-3.F4, C-3.F2, C-3.F13, C-1.F11

!kaynak "Refer to Note" atfının karşılığı yok
"Power." ve "Go manual." satırlarının APC yanıtı **"Disengage APC. Refer to Note."** der (Şekil C-3). Ancak C-3 sayfasında not yoktur; Ek C'deki **tek Not**, Şekil C-4'ün altında yıldız işaretiyle **"Downgrade."** çağrısına bağlanmıştır ve yalnızca Downgrade sonrasını anlatır: "Aircraft is considered to be in manual mode immediately after the 'Downgrade' call." Atfın hangi nota yapıldığı belgeden anlaşılmıyor.
@k C-3.F4, C-3.F6, C-4.F6, C-4.F8

!kaynak Afterburner yalnızca Ek C'de geçiyor
"Burner." çağrısı **"Select afterburner power."**, "Climb." çağrısı **"maintain MRT (afterburner if required)"** der. Belgenin 1. ve 2. bölümlerinde afterburner'dan söz edilmez: touch and go/bolter ve waveoff prosedürleri yalnızca **MRT** verir ("advance power to MRT", 2-16.04, 2-17.07). Tablodaki "throttle(s)" ve "engine(s)" ifadeleri de tablonun tek bir uçak tipine göre değil, genel olarak yazıldığını düşündürür. Tablo yanıtlarında da "in accordance with model NATOPS manual" denir.
@k C-3.F5, C-4.F7, C-3.F13, C-3.F10

### Burun duruşu, rudder ve hat

**"Attitude."** çağrısının anlamı moda göre değişir (manual: burun alçak; auto: uçak alçak/"setting" ya da burun alçak); yanıt burun duruşunu (biraz) **artırmaktır**. **Rudder** çağrısı APC'de **uygulanmaz** (*not applicable*). **"Right for lineup" / "Come left"** çağrısında önce hat düzeltilir, **sonra kanatlar düzlenir**. **"Level your wings."** uçağın yatışta olduğunu bildirir; yanıt: yerine getir.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Attitude.” (“A little attitude.”) | Manual: uçağın **burnu alçak**. Auto: uçak alçak/“setting” ya da **burun alçak**. | İniş duruşunu (*landing attitude*) kurmak için burun duruşunu (biraz) **artır**. | **Batma oranını azaltmak** ya da iniş duruşunu kurmak için burun duruşunu (biraz) artır. |
| “(A little) right/left rudder.” | Uçakta yeterli sağ ya da sol **rudder** yok; düzeltilmezse sağa ya da sola **yaw'lı** (*yawed*) inecek. | Uçağı **dengeli uçuşa** (*balanced flight*) döndürmek için rudder'ı ayarla. | Uygulanmaz (*not applicable*). |
| “(A little) Right for lineup.” “(A little) Come left.” | Düzeltilmezse uçak merkez hattının **soluna/sağına** inecek. | Hattı merkez hattına düzelt, **sonra kanatları düzle**. | Hattı merkez hattına düzelt, **sonra kanatları düzle**. |
| “Level your wings.” | Uçak **yatışta** (*in angle of bank*). | Yerine getir (*comply*). | Yerine getir (*comply*). |
@k C-3.F7..C-3.F9, C-4.F5

!kaynak Tablodaki yazım hataları
- "Attitude." satırının anlamı: "Auto: Aircraft is low/**setting** or nose is low." Aynı tabloda "A little power." için "Aircraft is decelerating or **settling**" geçtiğinden "setting" büyük olasılıkla "settling" (çökme) olmalıdır.
- Şekil C-1'in ikinci satırında çağrının açılış tırnağı yoktur: **You’re (a little) low."** Çağrı diğerleri gibi tırnak içinde okunmalıdır.
@k C-3.F7, C-3.F2, C-1.F3

### Bolter, waveoff, cut ve tırmanma

**"Bolter."** ve **"Waveoff"** / **"Waveoff, foul deck."** çağrılarında yanıt **model NATOPS** el kitabına göre bolter ya da waveoff'tur. **"Waveoff up the starboard side."** dönüş girişiminin bırakılmasını ve waveoff'un iniş alanının **sancağında (island tarafı)** yapılmasını ister. **"Cut."** uçağın inmeye uygun konumda olduğunu bildirir; **barricade recovery**'de pilot güverteye emniyetle inince throttle(lar)ı **idle**'a çeker ve motor(lar)ı kapatır. **"Climb."** bolter/waveoff sonrası uygun duruş/güç kurulmadığında verilir.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Bolter.” | Açıklama gerektirmez (*self-explanatory*). | Bolter'ı **model NATOPS** el kitabına göre uygula. | Bolter'ı **model NATOPS** el kitabına göre uygula. |
| “Waveoff” or “Waveoff, foul deck.” | Açıklama gerektirmez (*self-explanatory*). | Waveoff'u **model NATOPS** el kitabına göre uygula. | Waveoff'u **model NATOPS** el kitabına göre uygula. |
| “Waveoff up the starboard side.” | İniş alanının üzerinden uçmaya yönelik **dönüş girişimini bırak**. | Waveoff'u model NATOPS el kitabına göre, iniş alanının **sancağında** (*island* tarafı) uygula. | Waveoff'u model NATOPS el kitabına göre, iniş alanının **sancağında** (*island* tarafı) uygula. |
| “Cut.” | Uçak **inmeye uygun konumda** (*in a position to land*). | **Barricade recovery**'de: güverteye emniyetle inince throttle(lar)ı **idle**'a çek ve motor(lar)ı kapat (*secure*). | **Barricade recovery**'de: güverteye emniyetle inince throttle(lar)ı **idle**'a çek ve motor(lar)ı kapat (*secure*). |
| “Climb.” | Uçak bolter yaptı / waveoff aldı ama **pozitif tırmanma oranı** için uygun duruşu/gücü kurmadı. | Burun duruşunu **optimuma** ayarla, **kanatları düzle** ve pozitif tırmanma oranı kurmak için **MRT**'yi koru (**gerekirse afterburner**). | Soldaki yanıtla aynı (kaynakta iki yanıt sütunu **tek hücre**). |
@k C-3.F10..C-3.F13, C-4.F7

!not Bölüm 1 ve 2 ile bağlantı: waveoff, bolter ve barricade
- Waveoff'lar **ZORUNLUDUR** (2-17.03); sözlü ya da yalnızca lensteki waveoff ışıklarıyla verilse de uyulur (2-17.05). Waveoff ışıkları yandığında uçak **derhal** waveoff yapar (1-13.03). Bu, Ek C'de imperative çağrılar için verilen "MANDATORY IMMEDIATE RESPONSE" ile uyumludur.
- Waveoff'lar LSO ya da tower aksini söylemedikçe açılı güverte boyunca yapılır; Bölüm 2'deki örnek "waveoff starboard side"dır (2-17.04).
- Bölüm 2'de waveoff (2-17.07: güç MRT, speed brake'ler kapalı, iniş duruşu, kanatlar düz, açılı güverte boyunca tırmanma) ve bolter (2-16.04) adımları verilir; Ek C'deki **"Climb."** yanıtı da duruşu optimuma getirmeyi, kanatları düzlemeyi ve MRT'yi korumayı ister.
- Barricade, normal durdurma yapılamadığında kullanılan **acil durum** sistemidir (1-7.23); Ek C'deki "Cut." yanıtı barricade recovery içindir.
@k C-3.F1, C-3.F10..C-3.F13, C-4.F7

!kaynak Waveoff çağrısının ifadesi: "up the starboard side" / "starboard side"
Ek C çağrıyı **"Waveoff up the starboard side."** olarak verir; Bölüm 2 aynı durumu **"waveoff starboard side"** örneğiyle anar ("All waveoffs are made up the angled deck unless otherwise directed by the LSO or the tower (i.e. 'waveoff starboard side')", 2-17.04).
@k C-3.F12

### Konfigürasyon

**"Speedbrakes."** çağrısı speedbrake'lerin **açık** olduğunu bildirir ve **kapatılmasını** ister; **"Extend speedbrakes."** ise açılmasını ister. Kanca, iniş takımı ve flap çağrılarında yanıt iki modda da **yerine getirmektir** (*Comply*).

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Speedbrakes.” | Speedbrake'ler **açık** (*extended*). | Speedbrake'leri **kapat** (*retract*). | Speedbrake'leri **kapat** (*retract*). |
| “Extend speedbrakes.” | Açıklama gerektirmez (*self-explanatory*). | Yerine getir (*comply*). | Yerine getir (*comply*). |
| “Drop your hook.” | Açıklama gerektirmez (*self-explanatory*). | Yerine getir (*comply*). | Yerine getir (*comply*). |
| “Drop your gear.” | Açıklama gerektirmez (*self-explanatory*). | Yerine getir (*comply*). | Yerine getir (*comply*). |
| “Drop your flaps.” | Açıklama gerektirmez (*self-explanatory*). | Yerine getir (*comply*). | Yerine getir (*comply*). |
@k C-3.F14, C-3.F15, C-4.F2..C-4.F4

### Downgrade (ACLS)

**"Downgrade."** çağrısı **ACLS'in devreden çıkarılması** demektir; yanıt iki modda da budur. Tablonun altındaki **Not**: "Downgrade" çağrısından **hemen sonra** uçak **manual modda** kabul edilir; bundan sonra **manual çağrılar/yanıtlar** geçerlidir. ACLS modları için bkz. 102.3.

| Çağrı (TRANSMISSION) | Anlamı (MEANING) | Manual mod yanıtı | APC modu yanıtı |
|---|---|---|---|
| “Downgrade.”* | **ACLS'i devreden çıkar.** | ACLS'i devreden çıkar. | ACLS'i devreden çıkar. |
@k C-4.F6, C-4.F8

## C.4 | Manual / APC farkları ve çağrı alıştırması

### Manual ile APC yanıtları nerede ayrılır?

Tabloların çoğunda iki yanıt sütunu aynıdır. Farklı oldukları yerler:

| Fark | Çağrılar | Manual mod | APC modu |
|---|---|---|---|
| APC'de **kullanılmaz / uygulanmaz** | "You’re underpowered/overpowered.", "Easy with your nose.", "A little power."; rudder: "(A little) right/left rudder." | Normal yanıt (duruş/güç, burun düzeltmesini azaltma, güçle düzeltme, rudder ayarı) | *Not used*; rudder için *Not applicable* |
| Manual'de **kullanılmaz** | "Go manual." | *Not used* | Disengage APC. Refer to Note. |
| APC'de önce **APC devreden çıkarılır** | "You’re (a little fast/slow).", "Power back on.", "Power.", "Go manual." | Duruş/güç ayarı, güç ekleme | Disengage APC (ardından güç/duruş ayarı ya da güç ekleme; "Power." ve "Go manual." için "Refer to Note") |
| APC'de yalnızca **duruş** (*attitude*) | "You’re (a little) high.", "You’re going high (low).", "The deck is moving down/up (a little).", "Don’t go any lower (higher).", "Hold what you’ve got.", "Fly the ball." | Güç/burun duruşu (power/attitude) | Burun duruşu (attitude) |
| Düzeltilen büyüklük farklı | "Easy with it." | Güç düzeltmesini azalt | Burun duruşu düzeltmesini azalt |
| Amaç farklı | "Attitude." ("A little attitude.") | İniş duruşunu kurmak için burun duruşunu (biraz) artır | Batma oranını azaltmak ya da iniş duruşunu kurmak için burun duruşunu (biraz) artır |
@k C-1.F17, C-2.F12, C-3.F2, C-3.F8, C-3.F6, C-1.F10, C-3.F3, C-3.F4, C-1.F2, C-1.F4, C-1.F14, C-2.F7, C-2.F9, C-2.F10, C-2.F11, C-3.F7

**"Downgrade."** ACLS'i, **"Go manual."** APC'yi devreden çıkarır; ikisi karıştırılmamalıdır. Downgrade'den hemen sonra uçak manual modda sayılır ve manual sütunu geçerli olur. **"Climb."** satırında iki yanıt tek hücrede birleşiktir; **"Burner."** iki modda da aynıdır (APC devreden çıkarma istenmez).
@k C-4.F6, C-3.F6, C-4.F8, C-4.F7, C-3.F5

### Sık karıştırılan çağrılar

| Konu | Çağrı | Grup | Ne der / ne istenir? |
|---|---|---|---|
| Güç | "A little power." | Imperative | Yavaşlama ya da çökme; güçle düzelt (APC'de kullanılmaz) |
| Güç | "Power back on." | Imperative | Aşırı güç azaltması; güç ekle (APC: önce devreden çıkar) |
| Güç | "Power." | Imperative | Uçak alçak/yavaş; güç ekle (APC: devreden çıkar, Not'a bak) |
| Güç | "Burner." | Imperative | Aşırı güç yetersizliği ya da *in extremis*; afterburner |
| Güç | "You’re underpowered/overpowered." | Informative | Bilgi; duruş ve gücü ayarla (APC'de kullanılmaz) |
| Hat | "You’re lined up left/right." | Informative | Hat kısa geçildi/aşıldı; ortalanmış hattı yeniden kur |
| Hat | "You’re drifting left/right." | Informative | Kayıyor; hattı merkez hattına düzelt |
| Hat | "Back to the right/left." | Advisory | Kayma düzeltilmezse merkez hattı aşılacak |
| Hat | "Keep your turn in." | Advisory | Yatış ayarlanmazsa merkez hattı aşılacak; yatış açısını ayarla |
| Hat | "(A little) Right for lineup." "(A little) Come left." | Imperative | Düzeltilmezse sola/sağa inecek; hattı düzelt, sonra kanatları düzle |
| OLS | "The deck is moving down/up (a little)." | Informative | OLS bilgisi geçersiz olabilir |
| OLS | "The deck is steady." | Informative | OLS bilgisi geçerli; normal yaklaşma |
| OLS | "Don’t chase it" | Advisory | Güverte hareketi yanılsama yaratabilir; hareketi dikkate alma |
| OLS | "Hold what you’ve got." | Advisory | OLS geçersiz, mevcut alçalma oranı doğru; koru |
| OLS | "Fly the ball." | Advisory | OLS geçerli; lensi tara |
| Kontrol | "Roger Ball" | Informative | LSO meatball, hat referansı ve AOA'yı onaylar |
| Kontrol | "Paddles contact." | Informative | LSO kontrolü CCA'dan devralıyor |
| Kontrol | "Continue." | Informative | CLARA onaylandı ama LSO kontrolü devralamıyor; minimumlara kadar devam |
| Speedbrake | "Speedbrakes." | Imperative | Speedbrake'ler açık; **kapat** |
| Speedbrake | "Extend speedbrakes." | Imperative | **Aç** (yerine getir) |
@k C-3.F2..C-3.F5, C-1.F17, C-1.F8, C-1.F9, C-2.F4, C-2.F2, C-3.F9, C-1.F14, C-1.F15, C-2.F8..C-2.F10, C-1.F11..C-1.F13, C-3.F14, C-3.F15

### Alıştırma: çağrıyı tanı

Aşağıdaki alıştırma Ek C'deki 50 çağrının tamamını kullanır. Grup seçip (Informative / Advisory / Imperative) çağrının **anlamını**, **manual** ya da **APC** yanıtını veya **grubunu** bulun; geri bildirimde satırın tamamı gösterilir.

@w ekC_cagri
@k C-1.F2..C-1.F19, C-2.F2..C-2.F13, C-3.F2..C-3.F15, C-4.F2..C-4.F7
