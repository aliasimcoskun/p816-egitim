/* Bölüm 2, parça a: a_dongu (cyclic operations adımları), a_case (Case I/II/III seçici) */
(function () {
  "use strict";
  var qa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var q1 = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  };

  /* ---------- a_dongu ---------- */
  qa(".w-a-dongu").forEach(function (w) {
    var veri;
    try { veri = JSON.parse(q1(".w-veri", w).textContent); } catch (e) { return; }
    var adimlar = q1(".ad-adimlar", w), havaY = q1(".ad-hava .ad-yuva", w), guvY = q1(".ad-guverte .ad-yuva", w);
    var metin = q1(".ad-metin", w), sayac = q1(".ad-sayac", w), geri = q1(".ad-geri", w), ileri = q1(".ad-ileri", w);
    var i = 0, noktalar = [];
    var cipler = function (yer, liste) {
      yer.innerHTML = "";
      if (!liste.length) { yer.appendChild(el("span", "ad-bos", "—")); return; }
      liste.forEach(function (c) {
        var cip = el("span", "ad-cip ad-g" + c.g, c.l);
        if (c.n) cip.appendChild(el("small", "", c.n));
        yer.appendChild(cip);
      });
    };
    var ciz = function () {
      var s = veri[i];
      cipler(havaY, s.hava);
      cipler(guvY, s.guverte);
      metin.textContent = "";
      metin.appendChild(el("b", "", s.t + ". "));
      metin.appendChild(document.createTextNode(s.m));
      sayac.textContent = (i + 1) + " / " + veri.length;
      geri.disabled = i === 0;
      ileri.disabled = i === veri.length - 1;
      noktalar.forEach(function (n, j) { n.classList.toggle("aktif", j === i); n.setAttribute("aria-pressed", j === i ? "true" : "false"); });
    };
    veri.forEach(function (s, j) {
      var b = el("button", "ad-nokta", String(j + 1));
      b.type = "button";
      b.title = s.t;
      b.setAttribute("aria-label", (j + 1) + ". adım: " + s.t);
      b.addEventListener("click", function () { i = j; ciz(); });
      adimlar.appendChild(b);
      noktalar.push(b);
    });
    geri.addEventListener("click", function () { if (i > 0) { i--; ciz(); } });
    ileri.addEventListener("click", function () { if (i < veri.length - 1) { i++; ciz(); } });
    ciz();
  });

  /* ---------- a_case ---------- */
  qa(".w-a-case").forEach(function (w) {
    var tavan = q1(".ac-tavan", w), gorus = q1(".ac-gorus", w), zaman = q1(".ac-zaman", w), imc = q1(".ac-imc", w);
    var tavanD = q1(".ac-tavan-d", w), gorusD = q1(".ac-gorus-d", w);
    var sonuc = q1(".ac-sonuc", w), caseE = q1(".ac-case", w), neden = q1(".ac-neden", w);
    var sayi = function (x) { try { return x.toLocaleString("tr-TR"); } catch (e) { return String(x); } };
    var hesap = function () {
      var t = Number(tavan.value), g = Number(gorus.value), gece = zaman.value === "gece", ongoru = imc.checked;
      tavanD.textContent = sayi(t) + " ft";
      gorusD.textContent = sayi(g) + " NM";
      var c, m;
      if (gece) {
        c = 3; m = "Tüm gece operasyonları Case III ile yapılır. Case III açısından gece: gün batımından 30 dakika önce – gün doğumundan 30 dakika sonra.";
      } else if (t < 1000 || g < 5) {
        c = 3; m = "Tavan 1.000 ft'in altında ya da görüş 5 NM'den az: bu Case III havasıdır.";
      } else if (t < 3000) {
        c = 2; m = "Case I için tavan 3.000 ft'ten alçak olmamalı. Tavan 1.000 ft veya üstü ve görüş 5 NM: Case II asgarisi karşılanıyor.";
      } else if (ongoru) {
        c = 2; m = "Gündüz, ama uçağın IMC'ye girebileceği öngörülüyor: Case II (normalde overcast tabaka varken ilan edilir).";
      } else {
        c = 1; m = "Gündüz, VMC; tavan 3.000 ft'ten alçak değil, görüş 5 NM'den az değil: Case I.";
      }
      caseE.textContent = "Case " + ["I", "II", "III"][c - 1];
      neden.textContent = m;
      sonuc.className = "ac-sonuc ac-c" + c;
    };
    [tavan, gorus, zaman, imc].forEach(function (x) {
      x.addEventListener("input", hesap);
      x.addEventListener("change", hesap);
    });
    hesap();
  });
})();
