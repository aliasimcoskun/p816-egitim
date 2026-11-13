/* Bölüm 2, parça e — e_bingo: Şekil 2-10 / 2-11 bingo grafiği okuyucu (eğitim amaçlı, uçuşta kullanılmaz). */
(function () {
  "use strict";
  /* Veri: kaynak/bolum2_sekil_birimleri_e.json ile aynı değerler.
     Satır: [mesafe, yakıt rüzgârsız, yakıt baş rüzgârı, seyir irtifası, seyir hızı,
             alçalma mesafesi rüzgârsız, alçalma mesafesi baş rüzgârı,
             deniz seviyesi yakıt rüzgârsız, deniz seviyesi yakıt baş rüzgârı, deniz seviyesi seyir hızı]; null = "-" */
  var VERI = {"temiz":{"hw":100,"konf":"GEAR UP - FLAPS UP","sekil":"Figure 2-10","bloklar":[{"di":0,"climb":"300/0,75","desc":180,"satirlar":[[25,420,515,5000,221,14,6,429,535,220],[50,528,682,10000,222,27,13,559,771,221],[75,625,815,15000,219,41,21,690,1006,221],[100,712,921,20000,218,55,29,820,1240,222],[125,795,1006,25000,225,69,37,952,1474,222],[150,869,1081,30000,224,83,46,1083,1707,223],[175,935,1150,35000,215,97,55,1216,1940,224],[200,999,1238,35000,216,97,55,1349,2172,224],[225,1063,1327,35000,216,97,55,1482,2404,225],[250,1127,1392,40000,213,111,65,1616,2635,226]]},{"di":50,"climb":"265/0,70","desc":170,"satirlar":[[25,433,542,5000,214,12,5,441,562,214],[50,551,731,10000,214,24,11,582,823,215],[75,656,875,15000,214,37,17,724,1085,216],[100,752,993,20000,213,49,24,867,1348,216],[125,840,1089,25000,215,61,31,1010,1610,216],[150,924,1175,30000,214,74,39,1153,1872,217],[175,1000,1259,35000,208,86,47,1297,2135,217],[200,1074,1361,35000,208,86,47,1442,2398,218],[225,1147,1464,35000,208,86,47,1587,2661,218],[250,1221,1568,35000,209,86,47,1733,null,219]]},{"di":100,"climb":"245/0,60","desc":165,"satirlar":[[25,444,566,5000,210,11,5,452,589,209],[50,572,773,10000,208,22,10,604,877,209],[75,685,993,15000,207,33,15,757,1165,210],[100,788,1060,20000,207,44,21,911,1454,211],[125,880,1132,30000,201,66,34,1066,1742,211],[150,965,1257,30000,201,66,34,1221,2030,212],[175,1051,1358,35000,195,77,41,1377,2318,212],[200,1133,1477,35000,195,77,41,1533,2606,213],[225,1216,1597,35000,196,77,41,1690,2893,213],[250,1299,1717,35000,196,77,41,1848,null,214]]}]},"kirli":{"hw":50,"konf":"GEAR DOWN - FULL FLAPS","sekil":"Figure 2-11","bloklar":[{"di":0,"climb":"120","desc":110,"satirlar":[[25,743,1001,8000,122,8,4,758,1074,123],[50,1142,1598,12500,118,12,7,1226,1858,124],[75,1541,2187,15000,117,15,9,1704,2652,126],[100,1950,2809,15000,118,15,9,2195,null,127],[125,2369,null,15000,119,15,null,2697,null,129],[150,2819,null,12500,120,12,null,null,null,null],[175,null,null,null,null,null,null,null,null,null],[200,null,null,null,null,null,null,null,null,null],[225,null,null,null,null,null,null,null,null,null],[250,null,null,null,null,null,null,null,null,null]]},{"di":50,"climb":"120","desc":110,"satirlar":[[25,749,1011,8000,121,8,4,764,1087,122],[50,1155,1620,12500,117,12,7,1239,1885,124],[75,1562,2221,15000,116,14,9,1725,2694,125],[100,1979,2854,15000,117,14,9,2222,null,127],[125,2406,null,15000,118,14,null,2732,null,128],[150,2866,null,12500,120,12,null,null,null,null],[175,null,null,null,null,null,null,null,null,null],[200,null,null,null,null,null,null,null,null,null],[225,null,null,null,null,null,null,null,null,null],[250,null,null,null,null,null,null,null,null,null]]},{"di":100,"climb":"120","desc":110,"satirlar":[[25,754,1022,8000,121,8,4,771,1100,122],[50,1169,1643,12500,116,12,7,1252,1912,123],[75,1583,2257,15000,116,14,8,1745,2737,125],[100,2007,null,15000,117,14,null,2250,null,126],[125,2442,null,15000,118,14,null,2766,null,127],[150,null,null,null,null,null,null,null,null,null],[175,null,null,null,null,null,null,null,null,null],[200,null,null,null,null,null,null,null,null,null],[225,null,null,null,null,null,null,null,null,null],[250,null,null,null,null,null,null,null,null,null]]}]}};
  var SVGNS = "http://www.w3.org/2000/svg";

  function sayi(n) {
    if (n === null || n === undefined) return "–";
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function el(tag, attrs, parent, text) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function h(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  Array.prototype.slice.call(document.querySelectorAll(".w-e-bingo")).forEach(function (kap) {
    var durum = { konf: "temiz", di: 0, ruzgar: 0, mesafe: 100 };
    var svg = kap.querySelector(".eb-profil");
    var sonuc = kap.querySelector(".eb-sonuc");
    var aralik = kap.querySelector('input[type="range"]');
    var mesafeEt = kap.querySelector(".eb-mesafe-deger");
    var ruzgarBtn = kap.querySelector('[data-eb-ruzgar="1"]');

    function sec(attr, deger) {
      Array.prototype.slice.call(kap.querySelectorAll("[" + attr + "]")).forEach(function (b) {
        b.classList.toggle("aktif", b.getAttribute(attr) === String(deger));
        b.setAttribute("aria-pressed", b.getAttribute(attr) === String(deger) ? "true" : "false");
      });
    }

    function satirBul() {
      var g = VERI[durum.konf], blok = null, satir = null;
      g.bloklar.forEach(function (b) { if (b.di === durum.di) blok = b; });
      blok.satirlar.forEach(function (r) { if (r[0] === durum.mesafe) satir = r; });
      return { g: g, blok: blok, r: satir };
    }

    function olcu(xa, xb, y, metin) {
      el("line", { x1: xa, y1: y, x2: xb, y2: y, "class": "eb-olcu" }, svg);
      el("line", { x1: xa, y1: y - 5, x2: xa, y2: y + 5, "class": "eb-olcu-uc" }, svg);
      el("line", { x1: xb, y1: y - 5, x2: xb, y2: y + 5, "class": "eb-olcu-uc" }, svg);
      el("text", { x: (xa + xb) / 2, y: y + 14, "class": "hs-k", "text-anchor": "middle" }, svg, metin);
    }

    function ciz(s) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var r = s.r, bos = r.slice(1).every(function (v) { return v === null; });
      var y0 = 165, x0 = 50, x1 = 200, x2 = 430, x3 = 600;
      el("line", { x1: 20, y1: y0, x2: 620, y2: y0, "class": "eb-deniz" }, svg);
      el("text", { x: 20, y: y0 + 16, "class": "hs-k", "text-anchor": "start" }, svg, "başlangıç: deniz seviyesi");
      el("text", { x: 620, y: y0 + 16, "class": "hs-k", "text-anchor": "end" }, svg, "bingo sahası");
      el("circle", { cx: x0, cy: y0, r: 5, "class": "eb-nokta" }, svg);
      el("circle", { cx: x3, cy: y0, r: 5, "class": "eb-nokta" }, svg);
      olcu(x0, x3, y0 + 56, "DIST TO BASE " + durum.mesafe + " NM");
      if (bos) {
        el("text", { x: 320, y: 95, "class": "hs-t" }, svg, "Grafikte bu mesafe için değer yok (–)");
        return;
      }
      var alt = r[3], yc = y0 - 25 - (alt / 40000) * 115;
      var dd = r[5 + durum.ruzgar];
      el("polyline", { points: [x0, y0, x1, yc, x2, yc, x3, y0].join(" "), "class": "eb-yol" }, svg);
      el("circle", { cx: x2, cy: yc, r: 5, "class": "eb-alcalma" }, svg);
      el("text", { x: 160, y: y0 - 24, "class": "hs-k", "text-anchor": "start" }, svg, "tırmanış: maks. thrust (MRT)");
      el("text", { x: 160, y: y0 - 8, "class": "hs-k", "text-anchor": "start" }, svg, "CLIMB SPEED " + s.blok.climb);
      el("text", { x: (x1 + x2) / 2, y: yc - 10, "class": "hs-t" }, svg,
        "seyir " + sayi(alt) + " ft · " + sayi(r[4]) + " KCAS");
      el("text", { x: x2 + 8, y: yc - 10, "class": "hs-k", "text-anchor": "start" }, svg, "alçalma noktası");
      el("text", { x: (x2 + x3) / 2 + 14, y: (y0 + yc) / 2 + 4, "class": "hs-k", "text-anchor": "start" }, svg,
        "idle · " + s.blok.desc + " KCAS");
      olcu(x2, x3, y0 + 28, (dd === null ? "–" : dd + " NM") + " (sahadan)");
    }

    function yaz(s) {
      var r = s.r, hw = s.g.hw, w = durum.ruzgar;
      var bos = r.slice(1).every(function (v) { return v === null; });
      var ruzgarAd = w ? hw + " kt baş rüzgârı" : "rüzgârsız";
      function cift(a, b) {
        return (w ? sayi(a) + " / <b>" + sayi(b) + "</b>" : "<b>" + sayi(a) + "</b> / " + sayi(b));
      }
      if (bos) {
        sonuc.innerHTML = "<p><b>" + h(s.g.sekil) + "</b>, DRAG INDEX = " + durum.di + ", " + durum.mesafe +
          " NM: grafikte bu satırın tüm sütunlarında \"-\" var (değer verilmemiş).</p>";
        return;
      }
      sonuc.innerHTML =
        "<p class=\"eb-kaynak\">" + h(s.g.sekil) + " · " + h(s.g.konf) + " · DRAG INDEX = " + durum.di +
        " · " + durum.mesafe + " NM · seçili: " + ruzgarAd + "</p>" +
        "<table><thead><tr><th>Kalem</th><th>Değer (rüzgârsız / " + hw + " kt baş rüzgârı)</th></tr></thead><tbody>" +
        "<tr><td>Gereken yakıt (FUEL REQD)</td><td>" + cift(r[1], r[2]) + " lb</td></tr>" +
        "<tr><td>Tırmanış hızı (CLIMB SPEED)</td><td>" + h(s.blok.climb) + "</td></tr>" +
        "<tr><td>Seyir irtifası / hızı (CRUISE)</td><td>" + sayi(r[3]) + " ft · " + sayi(r[4]) + " KCAS</td></tr>" +
        "<tr><td>Alçalma hızı (DESCEND SPEED)</td><td>" + s.blok.desc + " KCAS</td></tr>" +
        "<tr><td>Alçalma mesafesi (DIST)</td><td>" + cift(r[5], r[6]) + " NM</td></tr>" +
        "<tr><td>Deniz seviyesi seyri: yakıt</td><td>" + cift(r[7], r[8]) + " lb</td></tr>" +
        "<tr><td>Deniz seviyesi seyri: hız</td><td>" + sayi(r[9]) + (r[9] === null ? "" : " KCAS") + "</td></tr>" +
        "</tbody></table>";
    }

    function guncelle() {
      sec("data-eb-konf", durum.konf);
      sec("data-eb-di", durum.di);
      sec("data-eb-ruzgar", durum.ruzgar);
      var s = satirBul();
      ruzgarBtn.textContent = s.g.hw + " kt baş rüzgârı";
      mesafeEt.textContent = durum.mesafe + " NM";
      ciz(s);
      yaz(s);
    }

    kap.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b || !kap.contains(b)) return;
      if (b.hasAttribute("data-eb-konf")) durum.konf = b.getAttribute("data-eb-konf");
      else if (b.hasAttribute("data-eb-di")) durum.di = Number(b.getAttribute("data-eb-di"));
      else if (b.hasAttribute("data-eb-ruzgar")) durum.ruzgar = Number(b.getAttribute("data-eb-ruzgar"));
      else return;
      guncelle();
    });
    aralik.addEventListener("input", function () {
      durum.mesafe = Number(aralik.value);
      guncelle();
    });
    guncelle();
  });
})();
