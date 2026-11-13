/* Ek B, parça a: ekBa_tanima (B-1 – B-6 işaret çizimlerini tanıma alıştırması) */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; };
  var karistir = function (a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };

  $$(".w-ekBa-tanima").forEach(function (w) {
    var veri = $(".ekBa-veri", w);
    if (!veri) return;
    var data;
    try { data = JSON.parse(veri.textContent); } catch (e) { return; }
    if (!data.length) return;

    var img = $(".ekBa-cizim img", w), siklar = $(".ekBa-siklar", w), geri = $(".ekBa-geri", w);
    var ilerleme = $(".ekBa-ilerleme", w), sonraki = $('[data-ekba="sonraki"]', w);
    var sira = [], konum = 0, dogru = 0, cevaplandi = false, bitti = false;

    var yaz = function () {
      ilerleme.textContent = "İşaret " + Math.min(konum + 1, sira.length) + " / " + sira.length + " · doğru " + dogru;
    };

    var ayrinti = function (d) {
      var h = '<p class="ekBa-ad"><strong>' + esc(d.ad) + "</strong> <small>" + esc(d.tr) + " · s. " + esc(d.s) + "</small></p>" +
        '<p class="ekBa-kim"><b>' + esc(d.kim) + "</b> → <b>" + esc(d.kime) + "</b></p>" +
        '<dl class="ekBa-dl"><dt>Gündüz</dt><dd>' + esc(d.gunduz) + "</dd><dt>Gece</dt><dd>" + esc(d.gece) + "</dd></dl>";
      (d.ek || []).forEach(function (t) { h += '<p class="ekBa-ek">' + esc(t) + "</p>"; });
      return h;
    };

    var soruGoster = function () {
      cevaplandi = false;
      var d = sira[konum];
      img.src = "img/" + d.img;
      img.alt = "Ek B, s. " + d.s + " işaret çizimi (işaretin adı gizli)";
      var diger = karistir(data.filter(function (x) { return x.ad !== d.ad; })).slice(0, 3);
      siklar.innerHTML = "";
      karistir([d].concat(diger)).forEach(function (s, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "btn ekBa-sik";
        b.setAttribute("data-ekba-ad", s.ad);
        b.innerHTML = '<span class="ekBa-no">' + (i + 1) + "</span>" + esc(s.ad);
        b.addEventListener("click", function () { cevapla(b, s); });
        siklar.appendChild(b);
      });
      geri.hidden = true;
      geri.innerHTML = "";
      sonraki.hidden = true;
      yaz();
    };

    var cevapla = function (b, s) {
      if (cevaplandi) return;
      cevaplandi = true;
      var d = sira[konum], ok = s === d;
      if (ok) dogru++;
      $$(".ekBa-sik", siklar).forEach(function (x) { x.disabled = true; });
      b.classList.add(ok ? "ekBa-dogru" : "ekBa-yanlis");
      if (!ok) {
        $$(".ekBa-sik", siklar).forEach(function (x) {
          if (x.getAttribute("data-ekba-ad") === d.ad) x.classList.add("ekBa-dogru");
        });
      }
      geri.innerHTML = '<p class="ekBa-sonuc ' + (ok ? "ekBa-iyi" : "ekBa-kotu") + '">' +
        (ok ? "✓ Doğru" : "✗ Yanlış — doğrusu aşağıda") + "</p>" + ayrinti(d);
      geri.hidden = false;
      bitti = konum === sira.length - 1;
      sonraki.textContent = bitti ? "Sonucu göster" : "Sonraki işaret →";
      sonraki.hidden = false;
      yaz();
      sonraki.focus();
    };

    var ozet = function () {
      siklar.innerHTML = "";
      geri.innerHTML = '<p class="ekBa-sonuc">Tur bitti: ' + dogru + " / " + sira.length + " doğru.</p>" +
        "<p>Yeni bir tur için “Baştan başla”ya basın.</p>";
      geri.hidden = false;
      sonraki.hidden = true;
      ilerleme.textContent = "Tamamlandı · doğru " + dogru + " / " + sira.length;
    };

    var basla = function () {
      sira = karistir(data.slice());
      konum = 0; dogru = 0; bitti = false;
      soruGoster();
    };

    sonraki.addEventListener("click", function () {
      if (bitti) { ozet(); return; }
      konum++;
      soruGoster();
    });
    $('[data-ekba="bastan"]', w).addEventListener("click", basla);

    w.setAttribute("tabindex", "-1");
    w.addEventListener("keydown", function (e) {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4 && !cevaplandi) {
        var b = $$(".ekBa-sik", siklar)[n - 1];
        if (b) { e.preventDefault(); b.click(); }
      }
    });

    basla();
  });
})();
