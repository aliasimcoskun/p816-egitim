/* Bölüm 2, parça d: d_marshal (marshal holding hesaplayıcı), d_cv1 (CV-1 yaklaşma adımları) */
(function () {
  "use strict";
  var SVGNS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent, text) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function q(s, r) { return r.querySelector(s); }
  function qa(s, r) { return Array.prototype.slice.call(r.querySelectorAll(s)); }
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
  function binlik(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function rad3(r) { r = ((Math.round(r) % 360) + 360) % 360; return ("00" + r).slice(-3); }

  /* ---------- d_marshal: holding fix = angels + 15 ---------- */
  qa(".w-d-marshal", document).forEach(function (w) {
    var rIn = q(".dm-radyal", w), aIn = q(".dm-angels", w), sonuc = q(".dm-sonuc", w), svg = q(".dm-svg", w);
    var X = function (nm) { return 40 + nm * 13; };      /* 0–35 NM */
    var Y = function (ang) { return 186 - ang * 7.4; };  /* angels 0–20 */

    function ciz(secili) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      el("line", { x1: 14, y1: 188, x2: 556, y2: 188, "class": "dm-deniz" }, svg);
      el("path", { d: "M26,188 L54,188 L50,182 L32,182 Z", "class": "dm-gemi" }, svg);
      el("rect", { x: 42, y: 174, width: 5, height: 8, "class": "dm-gemi" }, svg);
      for (var nm = 0; nm <= 35; nm += 5) {
        el("line", { x1: X(nm), y1: 188, x2: X(nm), y2: 194, "class": "dm-tik" }, svg);
        el("text", { x: X(nm), y: 208, "text-anchor": "middle", "class": "d-k" }, svg, nm === 0 ? "gemi" : String(nm));
      }
      el("text", { x: 556, y: 224, "text-anchor": "end", "class": "d-k" }, svg, "DME (NM), ölçeksiz şema");
      var ust = secili >= 6 && secili <= 20 ? secili : 9;
      for (var a = 6; a <= ust; a++) {
        var fx = X(a + 15), y = Y(a), on = a === secili;
        el("rect", { x: fx, y: y - 4, width: 46, height: 8, rx: 4, "class": "dm-pat" + (on ? " secili" : "") }, svg);
        if (on) {
          el("text", { x: fx + 46, y: y - 9, "text-anchor": "end", "class": "d-t" }, svg,
            "angels " + a + " · " + binlik(a * 1000) + " ft · " + (a + 15) + " DME");
        }
      }
      if (secili >= 6 && secili <= 20) {
        el("line", { x1: X(0), y1: 182, x2: X(secili + 15), y2: Y(secili), "class": "dm-cizgi" }, svg);
        el("line", { x1: X(secili + 15), y1: Y(secili) + 4, x2: X(secili + 15), y2: 188, "class": "dm-cizgi" }, svg);
      }
      el("text", { x: 14, y: 20, "class": "d-k" }, svg, "Stack: 1.000 ft dikey ayrım · en düşük 6.000 ft (angels 6 → 21 DME)");
    }

    function guncelle() {
      var a = Math.round(Number(aIn.value)), r = Number(rIn.value);
      if (!isFinite(r) || r < 0 || r > 359) { sonuc.className = "dm-sonuc uyari"; sonuc.textContent = "Radyal 000–359 arasında olmalı."; ciz(); return; }
      if (!isFinite(a) || a < 6) {
        sonuc.className = "dm-sonuc uyari";
        sonuc.textContent = "Turboprop ve jet uçaklarına atanabilecek en düşük irtifa 6.000 ft'tir (angels 6).";
        ciz(); return;
      }
      if (a > 20) { sonuc.className = "dm-sonuc uyari"; sonuc.textContent = "Bu şema angels 20'ye kadar çizer."; ciz(); return; }
      sonuc.className = "dm-sonuc";
      sonuc.innerHTML = "<b>" + rad3(r) + " radyalinde, " + (a + 15) + " DME'de, " + binlik(a * 1000) + " ft'te</b> bekle. " +
        "<span class=\"dm-hesap\">Distance = Angels + 15 = " + a + " + 15 = " + (a + 15) + "</span>";
      ciz(a);
    }
    rIn.addEventListener("input", guncelle);
    aIn.addEventListener("input", guncelle);
    guncelle();

    /* kendini dene */
    var soru = q(".dm-soru", w), tahmin = q(".dm-tahmin", w), geri = q(".dm-geri", w), aktif = null;
    function yeni() {
      aktif = { r: Math.floor(Math.random() * 72) * 5, a: 6 + Math.floor(Math.random() * 10) };
      soru.textContent = "Marshal — \"405, ... Marshal on the " + rad3(aktif.r) + ", ?, angels " + aktif.a + ".\"";
      tahmin.value = ""; geri.textContent = ""; geri.className = "dm-geri";
    }
    function kontrol() {
      if (!aktif) return;
      var t = Number(tahmin.value), dogru = aktif.a + 15, ok = t === dogru;
      geri.className = "dm-geri " + (ok ? "ok" : "hata");
      geri.textContent = (ok ? "✓ Doğru: " : "✗ Hayır: ") + "angels " + aktif.a + " + 15 = " + dogru + " DME (" +
        binlik(aktif.a * 1000) + " ft, " + rad3(aktif.r) + " radyali).";
      rIn.value = aktif.r; aIn.value = aktif.a; guncelle();
    }
    q(".dm-kontrol", w).addEventListener("click", kontrol);
    q(".dm-yeni", w).addEventListener("click", yeni);
    tahmin.addEventListener("keydown", function (e) { if (e.key === "Enter") kontrol(); });
    yeni();
  });

  /* ---------- d_cv1: CV-1 yaklaşma adımları ---------- */
  qa(".w-d-cv1", document).forEach(function (w) {
    var adimlar = JSON.parse(q(".w-veri", w).textContent);
    var svg = q(".d1-svg", w), liste = q(".d1-adimlar", w), kart = q(".d1-kart", w), sayac = q(".d1-sayac", w);
    var PL = 20.3; /* şematik platform konumu */
    function alt(d) {
      if (d >= PL) return 5000 + (d - PL) / (22 - PL) * 2000;
      if (d >= 10) return 1200 + (d - 10) / (PL - 10) * 3800;
      if (d >= 3) return 1200;
      return 400 * d;
    }
    function X(d) { return d <= 10 ? 60 + d * 36 : 420 + (d - 10) * (220 / 12); }
    function Y(a) { return a <= 1200 ? 222 - a * 0.05 : 162 - (a - 1200) * (130 / 5800); }
    function P(d) { return X(d).toFixed(1) + "," + Y(alt(d)).toFixed(1); }

    /* zemin */
    el("line", { x1: 0, y1: 228, x2: 680, y2: 228, "class": "dm-deniz" }, svg);
    el("path", { d: "M44,222 L78,222 L73,228 L49,228 Z", "class": "dm-gemi" }, svg);
    el("rect", { x: 64, y: 214, width: 5, height: 8, "class": "dm-gemi" }, svg);
    var bant = el("rect", { x: X(4), y: 150, width: X(8) - X(4), height: 24, rx: 3, "class": "d1-bant" }, svg);
    el("text", { x: (X(4) + X(8)) / 2, y: 186, "text-anchor": "middle", "class": "d-k" }, svg, "ACLS lock-on 8–4 DME");
    el("path", { d: "M60,222 Q34,190 14,162", "class": "d1-bolter" }, svg);
    el("text", { x: 6, y: 152, "class": "d-k" }, svg, "bolter/waveoff: 1.200 ft");
    /* yol */
    el("path", { d: "M" + P(22) + " L" + P(PL) + " L" + P(10) + " L" + P(3) + " L" + P(0), "class": "d1-yol" }, svg);
    el("ellipse", { cx: X(22) + 14, cy: Y(7000), rx: 14, ry: 4, "class": "d1-hold" }, svg);
    el("text", { x: 676, y: 18, "text-anchor": "end", "class": "d-t" }, svg, "Holding · angels 7 · 22 DME");
    el("text", { x: 612, y: 46, "text-anchor": "end", "class": "d-k" }, svg, "250 KIAS · 4.000 ft/dk");
    el("circle", { cx: X(PL), cy: Y(5000), r: 3.5, "class": "d1-nokta" }, svg);
    el("text", { x: X(PL) - 8, y: Y(5000) - 6, "text-anchor": "end", "class": "d-t" }, svg, "Platform 5.000 ft");
    el("text", { x: 520, y: 152, "text-anchor": "middle", "class": "d-k" }, svg, "2.000 ft/dk");
    el("text", { x: 384, y: 154, "text-anchor": "middle", "class": "d-t" }, svg, "1.200 ft");
    [[3, "1.200"], [2, "800"], [1, "400"], [0.5, "200"]].forEach(function (g) {
      el("circle", { cx: X(g[0]), cy: Y(alt(g[0])), r: 3, "class": "d1-nokta" }, svg);
      el("text", { x: X(g[0]) - 5, y: Y(alt(g[0])) - 6, "text-anchor": "end", "class": "d-k" }, svg, g[1]);
    });
    var tikler = {};
    [0, 1, 2, 3, 4, 6, 8, 10, 12, 20, 22].forEach(function (d) {
      el("line", { x1: X(d), y1: 228, x2: X(d), y2: 234, "class": "dm-tik" }, svg);
      tikler[d] = el("text", { x: X(d), y: 247, "text-anchor": "middle", "class": "d-k d1-tik-y" }, svg, d === 0 ? "gemi" : String(d));
    });
    el("text", { x: 676, y: 260, "text-anchor": "end", "class": "d-k" }, svg, "DME / NM (ölçeksiz)");
    var imlec = el("circle", { cx: X(22), cy: Y(7000), r: 7, "class": "d1-imlec" }, svg);

    /* adım düğmeleri */
    var dugmeler = adimlar.map(function (a, i) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = String(i + 1); b.title = a.ad; b.setAttribute("aria-label", (i + 1) + ". " + a.ad);
      b.addEventListener("click", function () { git(i); });
      liste.appendChild(b);
      return b;
    });

    var idx = 0;
    function git(i) {
      idx = (i + adimlar.length) % adimlar.length;
      var a = adimlar[idx];
      dugmeler.forEach(function (b, j) { b.classList.toggle("aktif", j === idx); });
      imlec.setAttribute("cx", X(a.dme).toFixed(1));
      imlec.setAttribute("cy", Y(alt(a.dme)).toFixed(1));
      bant.classList.toggle("aktif", !!a.bant);
      Object.keys(tikler).forEach(function (d) { tikler[d].classList.toggle("aktif", Number(d) === a.dme); });
      var h = '<div class="d1-baslik"><span class="d1-no">' + (idx + 1) + "</span> " + esc(a.ad) + "</div>" +
        '<p class="d1-kosul">' + esc(a.kosul) + "</p><ul>" +
        a.eylem.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") + "</ul>";
      if (a.cagri.length) {
        h += '<div class="d1-telsiz"><b>Telsiz (belgedeki örnek)</b><ul>' +
          a.cagri.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></div>";
      }
      kart.innerHTML = h;
      sayac.textContent = (idx + 1) + " / " + adimlar.length;
    }
    q(".d1-geri", w).addEventListener("click", function () { git(idx - 1); });
    q(".d1-ileri", w).addEventListener("click", function () { git(idx + 1); });
    w.addEventListener("keydown", function (e) {
      if (e.target && e.target.tagName === "INPUT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); git(idx + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); git(idx - 1); }
    });
    git(0);
  });
})();
