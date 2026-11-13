/* Bölüm 2, parça c bileşenleri: c_inispaterni (Case I iniş paterni), c_holding (overhead holding aralıkları) */
(function () {
  "use strict";
  var q = function (s, r) { return (r || document).querySelector(s); };
  var qa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var SVGNS = "http://www.w3.org/2000/svg";

  /* ---------- c_inispaterni ---------- */
  qa(".w-c-inispaterni").forEach(function (w) {
    var veri;
    try { veri = JSON.parse(q(".w-veri", w).textContent); } catch (e) { return; }
    var bilgi = q(".c-ip-bilgi", w), adimlar = q(".c-ip-adimlar", w);
    var noktalar = qa(".c-ip-nokta", w), dugmeler = [], secili = -1;

    veri.forEach(function (d, i) {
      var b = document.createElement("button");
      b.className = "btn c-ip-adim";
      b.type = "button";
      b.innerHTML = "<span>" + (i + 1) + " · " + d.k + "</span><small>" + d.i + "</small>";
      b.addEventListener("click", function () { sec(i); });
      adimlar.appendChild(b);
      dugmeler.push(b);
    });

    function sec(i) {
      if (i < 0 || i >= veri.length) return;
      secili = i;
      noktalar.forEach(function (g) { g.classList.toggle("secili", +g.getAttribute("data-n") === i + 1); });
      dugmeler.forEach(function (b, j) {
        b.classList.toggle("aktif", j === i);
        b.setAttribute("aria-pressed", j === i ? "true" : "false");
      });
      bilgi.innerHTML = veri[i].t;
    }

    noktalar.forEach(function (g) {
      var n = +g.getAttribute("data-n") - 1;
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", (n + 1) + ". " + (veri[n] ? veri[n].k : ""));
      g.addEventListener("click", function () { sec(n); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sec(n); }
      });
    });

    qa(".c-ip-nav .btn", w).forEach(function (b) {
      b.addEventListener("click", function () {
        var yon = +b.getAttribute("data-yon");
        var n = secili < 0 ? 0 : (secili + yon + veri.length) % veri.length;
        sec(n);
      });
    });
  });

  /* ---------- c_holding ---------- */
  qa(".w-c-holding").forEach(function (w) {
    var svg = q("svg", w), katman = q(".c-ho-ucaklar", w), bilgi = q(".c-ho-bilgi", w);
    var oynatBtn = q(".c-ho-oynat", w);
    if (!svg || !katman) return;
    var CX = 200, CY = 190, R = 120;          /* halka merkezi ve yarıçapı (SVG birimi) */
    var kol = 2, aci0 = 0, oynuyor = false, son = 0, gecis = 0;

    /* Ekran açısı: 0° = sağ (Point 1), saat yönünün tersine artar (sol el akış). */
    function konum(derece) {
      var r = derece * Math.PI / 180;
      return { x: CX + R * Math.cos(r), y: CY - R * Math.sin(r) };
    }

    function ciz() {
      while (katman.firstChild) katman.removeChild(katman.firstChild);
      var aralik = 360 / kol;
      for (var i = 0; i < kol; i++) {
        var p = konum(aci0 + i * aralik);
        var c = document.createElementNS(SVGNS, "circle");
        c.setAttribute("cx", p.x.toFixed(1));
        c.setAttribute("cy", p.y.toFixed(1));
        c.setAttribute("r", "9");
        c.setAttribute("class", "c-ho-ucak");
        katman.appendChild(c);
        var t = document.createElementNS(SVGNS, "text");
        t.setAttribute("x", p.x.toFixed(1));
        t.setAttribute("y", (p.y + 4).toFixed(1));
        t.setAttribute("class", "c-ho-ucak-no");
        t.textContent = String.fromCharCode(65 + i);   /* kollar A, B, C, D */
        katman.appendChild(t);
      }
    }

    function yaz() {
      var aralik = 360 / kol;
      bilgi.innerHTML = "Aynı irtifada <b>" + kol + " kol</b> → aralarında <b>" + aralik + "°</b>. " +
        "Kollar Point 1 (Mother) üzerinden düzenli aralıklarla geçer: her tam turda " + kol + " geçiş." +
        (gecis ? " <span class=\"c-ho-sayac\">Point 1 geçişi: " + gecis + "</span>" : "");
    }

    function kur(n) {
      kol = n; aci0 = 0; gecis = 0;
      qa(".c-ho-sec .btn", w).forEach(function (b) {
        var on = +b.getAttribute("data-kol") === n;
        b.classList.toggle("aktif", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      ciz(); yaz();
    }

    function adim(zaman) {
      if (!oynuyor) return;
      var dt = son ? Math.min(zaman - son, 100) : 16;
      son = zaman;
      var onceki = aci0;
      aci0 = (aci0 + dt * 0.03) % 360;            /* yaklaşık 12 s'de bir tur (şematik hız) */
      /* bir kol Point 1'i (0°) geçtiyse say */
      var aralik = 360 / kol;
      var a = onceki % aralik, b = aci0 % aralik;
      if (b < a) { gecis++; yaz(); }
      ciz();
      requestAnimationFrame(adim);
    }

    function oynat(on) {
      oynuyor = on;
      oynatBtn.textContent = on ? "Durdur" : "Oynat";
      oynatBtn.setAttribute("aria-pressed", on ? "true" : "false");
      if (on) { son = 0; requestAnimationFrame(adim); }
    }

    qa(".c-ho-sec .btn", w).forEach(function (b) {
      b.addEventListener("click", function () { kur(+b.getAttribute("data-kol")); });
    });
    oynatBtn.addEventListener("click", function () { oynat(!oynuyor); });
    kur(2);
  });
})();
