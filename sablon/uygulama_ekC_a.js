/* Ek C, parça a: ekC_cagri (LSO çağrı alıştırması). Veri: Şekil C-1 – C-4 satırları (kaynak/ekC_sekil_birimleri_a.json). */
(function () {
  "use strict";
  var VERI = [{"id": "C-1.F2","g": "I","t": "“You’re (a little) high.”","a": "Uçak optimum glideslope'un (biraz) üstünde.","m": "Merkez topu (center ball) kurmak için batma oranını (sink rate) güç/burun duruşu (power/nose attitude) ile ayarla.","p": "Merkez topu kurmak için batma oranını burun duruşuyla ayarla. (In close kullanmaktan kaçının.)"},{"id": "C-1.F3","g": "I","t": "“You’re (a little) low.”","a": "Uçak optimum glideslope'un (biraz) altında.","m": "Glide slope'u hemen ayarla.","p": "Glide slope'u hemen ayarla."},{"id": "C-1.F4","g": "I","t": "“You’re going high (low).”","a": "Düzeltilmezse uçak optimum glideslope'un üstüne çıkacak (altına inecek).","m": "Merkez topu korumak için batma oranını güç/burun duruşu ile ayarla.","p": "Merkez topu korumak için batma oranını burun duruşuyla ayarla."},{"id": "C-1.F5","g": "I","t": "“You’re on centerline.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Yok (N/A).","p": "Yok (N/A)."},{"id": "C-1.F6","g": "I","t": "“You’re on glideslope/glidepath.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Yok (N/A).","p": "Yok (N/A)."},{"id": "C-1.F7","g": "I","t": "“You’re on speed.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Yok (N/A).","p": "Yok (N/A)."},{"id": "C-1.F8","g": "I","t": "“You’re lined up left/right.”","a": "Uçak merkez hattını kısa geçmiş / aşmış (undershot/overshot).","m": "Ortalanmış hattı (centered lineup) yeniden kur.","p": "Ortalanmış hattı yeniden kur."},{"id": "C-1.F9","g": "I","t": "“You’re drifting left/right.”","a": "Uçak merkez hattının soluna/sağına kayıyor (drifting).","m": "Hattı merkez hattına düzelt.","p": "Hattı merkez hattına düzelt."},{"id": "C-1.F10","g": "I","t": "“You’re (a little fast/slow).” (To be followed by “Go manual” if auto.)","a": "Açıklama gerektirmez (self-explanatory). Uçak auto'daysa ardından “Go manual” gelir.","m": "Optimum AOA'yı kurmak için burun duruşunu/gücü ayarla.","p": "APC uçağı optimum AOA'da tutmuyor. APC'yi devreden çıkar (disengage) ve optimum AOA'yı korumak için gücü/duruşu ayarla."},{"id": "C-1.F11","g": "I","t": "“Roger Ball” (“Auto”/“Coupled” as appropriate).","a": "LSO, pilotun meatball'u gördüğünü (meatball acquisition), hat referansını (lineup reference) ve hücum açısını (angle of attack) aldığını onaylar. Duruma göre “Auto” / “Coupled” eklenir.","m": "Yok (N/A).","p": "Yok (N/A)."},{"id": "C-1.F12","g": "I","t": "“Paddles contact.”","a": "LSO kontrolü CCA'dan devralıyor.","m": "Yok (N/A).","p": "Yok (N/A)."},{"id": "C-1.F13","g": "I","t": "“Continue.”","a": "LSO CLARA çağrısını onaylar ama kontrolü CCA'dan devralamaz.","m": "Yaklaşmaya minimumlara kadar devam et.","p": "Yaklaşmaya minimumlara kadar devam et."},{"id": "C-1.F14","g": "I","t": "“The deck is moving down/up (a little).”","a": "OLS bilgisi geçersiz olabilir (ardından advisory/imperative çağrılar gelir).","m": "Gücü ve duruşu LSO'nun yönlendirmesiyle (under LSO guidance) ayarla.","p": "Duruşu LSO'nun yönlendirmesiyle ayarla."},{"id": "C-1.F15","g": "I","t": "“The deck is steady.”","a": "OLS bilgisi geçerli.","m": "Normal yaklaşma uç.","p": "Normal yaklaşma uç."},{"id": "C-1.F16","g": "I","t": "“Winds are (slightly) starboard/port/axial.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Merkez hattını korumak için hattı izle (monitor lineup).","p": "Merkez hattını korumak için hattı izle."},{"id": "C-1.F17","g": "I","t": "“You’re underpowered/overpowered.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Duruşu ve gücü gerektiği gibi ayarla.","p": "Kullanılmaz (not used)."},{"id": "C-1.F18","g": "I","t": "“Ship’s in a starboard/port turn.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Hattı gerektiği gibi ayarla.","p": "Hattı gerektiği gibi ayarla."},{"id": "C-1.F19","g": "I","t": "“MOVLAS recovery.”","a": "MOVLAS kullanımda.","m": "“Roger ball” alınana kadar yayımlanmış patern irtifasını (published pattern altitude) uç.","p": "“Roger ball” alınana kadar yayımlanmış patern irtifasını uç."},{"id": "C-2.F2","g": "A","t": "“Keep your turn in.”","a": "Yatış açısı (angle of bank) ayarlanmazsa uçak merkez hattını aşacak (overshoot).","m": "Yatış açısını ayarla.","p": "Yatış açısını ayarla."},{"id": "C-2.F3","g": "A","t": "“Check your lineup.” (Start only.)","a": "(Yalnızca start'ta.) Uçağın hattı optimum değil.","m": "Uçağı merkez hattında tutmak için hat kaymasını (lineup drift) ya da konumu düzelt.","p": "Uçağı merkez hattında tutmak için hat kaymasını ya da konumu düzelt."},{"id": "C-2.F4","g": "A","t": "“Back to the right/left.”","a": "Uçak, kayma düzeltilmezse merkez hattını aşacak biçimde kayıyor.","m": "Merkez hattında kalmak için hat kaymasını düzelt.","p": "Merkez hattında kalmak için hat kaymasını düzelt."},{"id": "C-2.F5","g": "A","t": "“Don’t settle.” “Don’t go low.”","a": "Düzeltilmezse uçak optimum glideslope'un altına çökecek (settle).","m": "Glideslope'un altına çökmemek için batma oranını ve meatball'u kontrol et.","p": "Glideslope'un altına çökmemek için batma oranını ve meatball'u kontrol et."},{"id": "C-2.F6","g": "A","t": "“Don’t climb.” “Don’t go high.”","a": "Uçak optimum glideslope'ta ya da glideslope'un üstünde; sabit glideslope'u korumaya yetecek alçalma oranı (rate of descent) yok.","m": "Topun yükselmesini durdurmak için gücü/duruşu ayarla.","p": "Topun yükselmesini durdurmak için gücü/duruşu ayarla."},{"id": "C-2.F7","g": "A","t": "“Don’t go any lower (higher).”","a": "Uçak optimum glideslope'un epey altında (üstünde) kalıyor; düzeltme yetersiz ya da hiç yok.","m": "Optimum glideslope'a doğru pozitif düzeltme için gücü/duruşu ayarla.","p": "Optimum glideslope'a doğru pozitif düzeltme için duruşu ayarla."},{"id": "C-2.F8","g": "A","t": "“Don’t chase it”","a": "Pilotu, güvertenin aşağı/yukarı hareket ettiği ve bunun tırmanma ya da alçalma yanılsaması (illusion) yaratabileceği konusunda uyarır.","m": "Güverte hareketini dikkate alma; alçalma oranını ve optimum hava hızını korumak için gücü/duruşu ayarla.","p": "Güverte hareketini dikkate alma; alçalma oranını ve optimum hava hızını korumak için gücü/duruşu ayarla."},{"id": "C-2.F9","g": "A","t": "“Hold what you’ve got.”","a": "OLS bilgisi geçersiz. Mevcut alçalma oranı, uygun (proper) glideslope'u korumak için doğru.","m": "Gücü/duruşu ayarla. Mevcut alçalma oranını ve optimum hava hızını koru.","p": "Duruşu ayarla. Mevcut (optimum) alçalma oranını koru."},{"id": "C-2.F10","g": "A","t": "“Fly the ball.”","a": "OLS bilgisi geçerli.","m": "Lensi tara; optimum glideslope'u korumak için gücü/duruşu ayarla.","p": "Lensi tara; optimum glideslope'u korumak için duruşu ayarla."},{"id": "C-2.F11","g": "A","t": "“Easy with it.”","a": "Bu çağrıdan hemen önceki güç düzeltmesinin büyüklüğü aşırı.","m": "Optimum glideslope'u ve hava hızını yakalayıp yeniden kurmak için güç düzeltmesinin büyüklüğünü azalt.","p": "Optimum glideslope'u ve hava hızını yakalayıp yeniden kurmak için burun duruşu düzeltmesinin büyüklüğünü azalt."},{"id": "C-2.F12","g": "A","t": "“Easy with your nose.”","a": "Bu çağrıdan hemen önceki burun duruşu düzeltmesinin büyüklüğü aşırı.","m": "Optimum uçak duruşunu kurmak için burun duruşu düzeltmesinin büyüklüğünü azalt.","p": "Kullanılmaz (not used)."},{"id": "C-2.F13","g": "A","t": "“Easy with your wings.”","a": "Bu çağrıdan hemen önceki hat (lineup) düzeltmesinin büyüklüğü aşırı.","m": "Merkez hattını yakalayıp yeniden kurmak için hat düzeltmesinin büyüklüğünü azalt.","p": "Merkez hattını yakalayıp yeniden kurmak için hat düzeltmesinin büyüklüğünü azalt."},{"id": "C-3.F2","g": "E","t": "“A little power.”","a": "Uçak yavaşlıyor ya da çöküyor (settling).","m": "Güçle düzelt.","p": "Kullanılmaz (not used)."},{"id": "C-3.F3","g": "E","t": "“Power back on.”","a": "Pilot aşırı güç azaltması yaptı.","m": "Optimum glideslope/AOA'yı korumak için güç ekle.","p": "APC'yi devreden çıkar. Optimum glideslope/AOA'yı korumak için güç ekle."},{"id": "C-3.F4","g": "E","t": "“Power.”","a": "Uçak alçak/yavaş.","m": "Güç ekle.","p": "APC'yi devreden çıkar. Not'a bakın (Refer to Note)."},{"id": "C-3.F5","g": "E","t": "“Burner.”","a": "Uçağın gücü aşırı derecede yetersiz (extremely underpowered) ya da uçak in extremis.","m": "Afterburner gücünü seç.","p": "Afterburner gücünü seç."},{"id": "C-3.F6","g": "E","t": "“Go manual.”","a": "APC'yi devreden çıkar.","m": "Kullanılmaz (not used).","p": "APC'yi devreden çıkar. Not'a bakın (Refer to Note)."},{"id": "C-3.F7","g": "E","t": "“Attitude.” (“A little attitude.”)","a": "Manual: uçağın burnu alçak. Auto: uçak alçak/“setting” ya da burun alçak.","m": "İniş duruşunu (landing attitude) kurmak için burun duruşunu (biraz) artır.","p": "Batma oranını azaltmak ya da iniş duruşunu kurmak için burun duruşunu (biraz) artır."},{"id": "C-3.F8","g": "E","t": "“(A little) right/left rudder.”","a": "Uçakta yeterli sağ ya da sol rudder yok; düzeltilmezse sağa ya da sola yaw'lı (yawed) inecek.","m": "Uçağı dengeli uçuşa (balanced flight) döndürmek için rudder'ı ayarla.","p": "Uygulanmaz (not applicable)."},{"id": "C-3.F9","g": "E","t": "“(A little) Right for lineup.” “(A little) Come left.”","a": "Düzeltilmezse uçak merkez hattının soluna/sağına inecek.","m": "Hattı merkez hattına düzelt, sonra kanatları düzle.","p": "Hattı merkez hattına düzelt, sonra kanatları düzle."},{"id": "C-3.F10","g": "E","t": "“Bolter.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Bolter'ı model NATOPS el kitabına göre uygula.","p": "Bolter'ı model NATOPS el kitabına göre uygula."},{"id": "C-3.F11","g": "E","t": "“Waveoff” or “Waveoff, foul deck.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Waveoff'u model NATOPS el kitabına göre uygula.","p": "Waveoff'u model NATOPS el kitabına göre uygula."},{"id": "C-3.F12","g": "E","t": "“Waveoff up the starboard side.”","a": "İniş alanının üzerinden uçmaya yönelik dönüş girişimini bırak.","m": "Waveoff'u model NATOPS el kitabına göre, iniş alanının sancağında (island tarafı) uygula.","p": "Waveoff'u model NATOPS el kitabına göre, iniş alanının sancağında (island tarafı) uygula."},{"id": "C-3.F13","g": "E","t": "“Cut.”","a": "Uçak inmeye uygun konumda (in a position to land).","m": "Barricade recovery'de: güverteye emniyetle inince throttle(lar)ı idle'a çek ve motor(lar)ı kapat (secure).","p": "Barricade recovery'de: güverteye emniyetle inince throttle(lar)ı idle'a çek ve motor(lar)ı kapat (secure)."},{"id": "C-3.F14","g": "E","t": "“Speedbrakes.”","a": "Speedbrake'ler açık (extended).","m": "Speedbrake'leri kapat (retract).","p": "Speedbrake'leri kapat (retract)."},{"id": "C-3.F15","g": "E","t": "“Extend speedbrakes.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Yerine getir (comply).","p": "Yerine getir (comply)."},{"id": "C-4.F2","g": "E","t": "“Drop your hook.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Yerine getir (comply).","p": "Yerine getir (comply)."},{"id": "C-4.F3","g": "E","t": "“Drop your gear.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Yerine getir (comply).","p": "Yerine getir (comply)."},{"id": "C-4.F4","g": "E","t": "“Drop your flaps.”","a": "Açıklama gerektirmez (self-explanatory).","m": "Yerine getir (comply).","p": "Yerine getir (comply)."},{"id": "C-4.F5","g": "E","t": "“Level your wings.”","a": "Uçak yatışta (in angle of bank).","m": "Yerine getir (comply).","p": "Yerine getir (comply)."},{"id": "C-4.F6","g": "E","t": "“Downgrade.”*","a": "ACLS'i devreden çıkar.","m": "ACLS'i devreden çıkar.","p": "ACLS'i devreden çıkar."},{"id": "C-4.F7","g": "E","t": "“Climb.”","a": "Uçak bolter yaptı / waveoff aldı ama pozitif tırmanma oranı için uygun duruşu/gücü kurmadı.","m": "Burun duruşunu optimuma ayarla, kanatları düzle ve pozitif tırmanma oranı kurmak için MRT'yi koru (gerekirse afterburner).","p": null}];
  var GRUP = { I: "INFORMATIVE", A: "ADVISORY", E: "IMPERATIVE" };
  var GRUP_TR = { I: "Informative (bilgilendirici)", A: "Advisory (tavsiye)", E: "Imperative (emir)" };
  var SORU = {
    a: "Bu çağrı ne anlama gelir (MEANING)?",
    m: "Uçak manual moddayken pilotun yanıtı nedir?",
    p: "Uçak APC modundayken pilotun yanıtı nedir?",
    g: "Bu çağrı hangi gruptadır?"
  };
  var qa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var q1 = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  var karistir = function (a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  var alan = function (r, f) { return f === "p" && r.p == null ? r.m : r[f]; };

  qa(".w-ekC-cagri").forEach(function (w) {
    if (!VERI.length) return;
    var gBtn = qa(".ekC-g", w), tip = q1(".ekC-tip", w);
    var rozet = q1(".ekC-rozet", w), skorE = q1(".ekC-skor", w), cagri = q1(".ekC-cagri", w);
    var soruE = q1(".ekC-soru", w), siklar = q1(".ekC-siklar", w), geri = q1(".ekC-geri", w);
    var kalan = q1(".ekC-kalan", w), sonraki = q1(".ekC-sonraki", w);
    var grup = "", deste = [], idx = 0, dogru = 0, toplam = 0, cevaplandi = false;

    var havuz = function () { return VERI.filter(function (r) { return !grup || r.g === grup; }); };
    var yeniDeste = function () { deste = karistir(havuz().slice()); idx = 0; };

    var secenekler = function (r, f) {
      if (f === "g") return ["I", "A", "E"].map(function (g) { return { t: GRUP_TR[g], ok: g === r.g }; });
      var dogruT = alan(r, f), gorulen = {}, out = [{ t: dogruT, ok: true }];
      gorulen[dogruT] = true;
      var ekle = function (liste) {
        karistir(liste.slice()).forEach(function (x) {
          var t = alan(x, f);
          if (out.length < 4 && !gorulen[t]) { gorulen[t] = true; out.push({ t: t, ok: false }); }
        });
      };
      ekle(VERI.filter(function (x) { return x !== r && x.g === r.g; }));
      ekle(VERI.filter(function (x) { return x !== r; }));
      return karistir(out);
    };

    var satir = function (etiket, metin) {
      var p = el("p", "ekC-satir");
      p.appendChild(el("b", "", etiket + ": "));
      p.appendChild(document.createTextNode(metin));
      return p;
    };

    var geriBildirim = function (r, ok) {
      geri.innerHTML = "";
      geri.appendChild(el("p", "ekC-sonuc " + (ok ? "ekC-iyi" : "ekC-kotu"), ok ? "Doğru." : "Yanlış — doğru cevap yeşil işaretli."));
      geri.appendChild(satir("Çağrı", r.t));
      geri.appendChild(satir("Grup", GRUP_TR[r.g]));
      geri.appendChild(satir("Anlamı", r.a));
      if (r.p == null) {
        geri.appendChild(satir("Manual ve APC (tek hücre)", r.m));
      } else {
        geri.appendChild(satir("Manual mod", r.m));
        geri.appendChild(satir("APC modu", r.p));
      }
      geri.appendChild(el("p", "ekC-kaynak", "Kaynak: Şekil " + r.id.split(".")[0] + " · " + r.id));
      geri.hidden = false;
    };

    var skor = function () { skorE.textContent = toplam ? ("Doğru: " + dogru + " / " + toplam) : ""; };

    var goster = function () {
      if (idx >= deste.length) yeniDeste();
      var r = deste[idx];
      var f = tip.value === "k" ? ["a", "m", "p", "g"][Math.floor(Math.random() * 4)] : tip.value;
      cevaplandi = false;
      cagri.textContent = r.t;
      soruE.textContent = SORU[f];
      rozet.textContent = f === "g" ? "GRUP?" : GRUP[r.g];
      rozet.className = "ekC-rozet" + (f === "g" ? "" : " ekC-r" + r.g);
      geri.hidden = true;
      geri.innerHTML = "";
      siklar.innerHTML = "";
      kalan.textContent = (idx + 1) + " / " + deste.length;
      secenekler(r, f).forEach(function (s) {
        var b = el("button", "ekC-sik", s.t);
        b.type = "button";
        b.setAttribute("data-ok", s.ok ? "1" : "0");
        b.addEventListener("click", function () {
          if (cevaplandi) return;
          cevaplandi = true;
          toplam++;
          if (s.ok) dogru++;
          qa(".ekC-sik", siklar).forEach(function (x) {
            x.disabled = true;
            if (x.getAttribute("data-ok") === "1") x.classList.add("ekC-dogru");
          });
          if (!s.ok) b.classList.add("ekC-yanlis");
          rozet.textContent = GRUP[r.g];
          rozet.className = "ekC-rozet ekC-r" + r.g;
          geriBildirim(r, s.ok);
          skor();
          sonraki.focus();
        });
        siklar.appendChild(b);
      });
    };

    gBtn.forEach(function (b) {
      b.addEventListener("click", function () {
        grup = b.getAttribute("data-g");
        gBtn.forEach(function (x) {
          var a = x === b;
          x.classList.toggle("aktif", a);
          x.setAttribute("aria-pressed", a ? "true" : "false");
        });
        yeniDeste();
        goster();
      });
    });
    tip.addEventListener("change", goster);
    sonraki.addEventListener("click", function () { idx++; goster(); });
    yeniDeste();
    skor();
    goster();
  });
})();
