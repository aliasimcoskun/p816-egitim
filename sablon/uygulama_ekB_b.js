/* Ek B, parça b: ekBb_tanima (s. B-7 – B-11 işaret tanıma alıştırması) */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; };
  var karistir = function (a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  var lbs = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " lbs"; };

  $$(".w-ekBb-tanima").forEach(function (w) {
    var veriEl = $(".ekBb-veri", w);
    if (!veriEl) return;
    var veri = JSON.parse(veriEl.textContent);
    var img = $(".ekBb-img", w), soru = $(".ekBb-soru", w), siklar = $(".ekBb-siklar", w);
    var geri = $(".ekBb-geri", w), skorEl = $(".ekBb-skor", w), sonraki = $('[data-ekbb="sonraki"]', w);
    var mod = "isaret", dogru = 0, toplam = 0, cevaplandi = false, son = null;
    var torba = { isaret: [], yakit: [] };

    /* aynı öğe art arda gelmesin; tüm öğeler bitmeden tekrar etmesin */
    var sec = function (liste, ad) {
      if (!torba[ad].length) torba[ad] = karistir(liste.slice());
      var o = torba[ad].pop();
      if (o === son && torba[ad].length) { torba[ad].unshift(o); o = torba[ad].pop(); }
      son = o;
      return o;
    };

    var skor = function () { skorEl.textContent = "Skor " + dogru + " / " + toplam; };

    var sikKur = function (secenekler, dogruMetin, ayrinti) {
      siklar.innerHTML = "";
      geri.innerHTML = "";
      cevaplandi = false;
      secenekler.forEach(function (m) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "btn";
        b.textContent = m;
        b.addEventListener("click", function () {
          if (cevaplandi) return;
          cevaplandi = true;
          toplam++;
          var ok = m === dogruMetin;
          if (ok) dogru++;
          $$(".btn", siklar).forEach(function (x) {
            x.disabled = true;
            if (x.textContent === dogruMetin) x.classList.add("ekBb-dogru");
          });
          if (!ok) b.classList.add("ekBb-yanlis");
          geri.innerHTML = '<p class="ekBb-sonuc ' + (ok ? "ekBb-ok" : "ekBb-hata") + '">' +
            (ok ? "✓ Doğru: " : "✗ Doğrusu: ") + "<b>" + esc(dogruMetin) + "</b></p>" + ayrinti;
          skor();
          sonraki.focus();
        });
        siklar.appendChild(b);
      });
    };

    var isaretSoru = function () {
      var d = sec(veri.isaret, "isaret");
      img.src = "img/" + d.img;
      img.alt = "Tanınacak işaret çizimi (s. " + d.s + ")";
      soru.textContent = "Bu hangi işaret?";
      var digerleri = karistir(veri.isaret.filter(function (x) { return x !== d; }));
      /* çeldiricilerin en az biri aynı türden (güverte / ikmal) olsun */
      var ayniTur = digerleri.filter(function (x) { return (x.s === "B-11") === (d.s === "B-11"); });
      var secilen = ayniTur.slice(0, 2);
      digerleri.forEach(function (x) { if (secilen.length < 3 && secilen.indexOf(x) < 0) secilen.push(x); });
      var adlar = karistir([d].concat(secilen)).map(function (x) { return x.ad; });
      var ayrinti = '<dl class="ekBb-ayrinti">' +
        (d.kim ? "<dt>Veren → alan</dt><dd>" + esc(d.kim) + "</dd>" : "") +
        "<dt>" + (d.s === "B-11" ? "Hareket" : (d.gece ? "Gündüz" : "Uygulama")) + "</dt><dd>" + esc(d.gun) + "</dd>" +
        (d.gece ? "<dt>Gece</dt><dd>" + esc(d.gece) + "</dd>" : "") +
        "<dt>Kaynak</dt><dd>s. " + esc(d.s) + "</dd></dl>";
      sikKur(adlar, d.ad, ayrinti);
    };

    var yakitSoru = function () {
      var d = sec(veri.yakit, "yakit");
      var yuz = Math.random() < 0.5;
      var carpan = yuz ? 100 : 1000;
      img.src = "img/" + d.img;
      img.alt = "Yakıt miktarı el işareti";
      soru.innerHTML = yuz
        ? "Önce <b>yumruk</b> (clenched fist), ardından bu el şekli verildi. Kaç lbs?"
        : "Bu el şekli <b>tek başına</b> verildi (tam binler). Kaç lbs?";
      var sayilar = karistir([1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function (n) { return n !== d.n; })).slice(0, 2);
      var secenekler = [d.n * carpan, d.n * (yuz ? 1000 : 100), sayilar[0] * carpan, sayilar[1] * carpan];
      var metinler = karistir(secenekler).map(lbs);
      var ayrinti = '<dl class="ekBb-ayrinti"><dt>El şekli</dt><dd>' + esc(d.el) + "</dd>" +
        "<dt>Tek başına</dt><dd>" + lbs(d.n * 1000) + "</dd><dt>Yumruktan sonra</dt><dd>" + lbs(d.n * 100) + "</dd>" +
        "<dt>Kaynak</dt><dd>s. B-11</dd></dl>";
      sikKur(metinler, lbs(d.n * carpan), ayrinti);
    };

    var yeni = function () { if (mod === "yakit") yakitSoru(); else isaretSoru(); };

    $$("[data-ekbb-sec]", w).forEach(function (b) {
      b.addEventListener("click", function () {
        mod = b.getAttribute("data-ekbb-sec");
        w.setAttribute("data-ekbb-mod", mod);
        $$("[data-ekbb-sec]", w).forEach(function (x) {
          var on = x === b;
          x.classList.toggle("aktif", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        son = null;
        yeni();
      });
    });
    sonraki.addEventListener("click", yeni);
    skor();
    yeni();
  });
})();
