/* Bölüm 2, parça b: b_isaretler (katapult işaret sırası) ve b_kalkis (Case I/II/III kalkış profili) */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; };
  var karistir = function (a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };

  /* ---------- b_isaretler ---------- */
  $$(".w-b-isaretler").forEach(function (w) {
    var veri = $(".b-veri", w);
    if (!veri) return;
    var data = JSON.parse(veri.textContent);
    var adimlar = $(".bis-adimlar", w), kart = $(".bis-kart", w), sira = $(".bis-sira", w), test = $(".bis-test", w);
    var idx = 0;
    var tur = function (d) { return d.kim.indexOf("Director") === 0 ? "bis-dir" : "bis-cat"; };
    var satir = function (etiket, metin, cls) {
      return metin ? '<p class="' + (cls || "") + '"><b>' + etiket + "</b> " + esc(metin) + "</p>" : "";
    };
    var goster = function () {
      var d = data[idx];
      $$(".bis-nokta", adimlar).forEach(function (b, i) {
        b.classList.toggle("aktif", i === idx);
        b.classList.toggle("gecti", i < idx);
        b.setAttribute("aria-current", i === idx ? "step" : "false");
      });
      kart.innerHTML = '<div class="bis-bas"><span class="bis-harf">' + esc(d.h) + "</span><div><strong>" + esc(d.en) +
        "</strong><small>" + esc(d.tr) + " · veren: " + esc(d.kim) + "</small></div></div>" +
        satir("Nasıl:", d.nasil) + satir("Pilot:", d.pilot, "bis-pilot") + satir("İlgili:", d.ilgili, "bis-ilgili");
    };
    data.forEach(function (d, i) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button";
      b.className = "bis-nokta " + tur(d);
      b.textContent = d.h;
      b.title = d.en;
      b.setAttribute("aria-label", d.h + ": " + d.en);
      b.addEventListener("click", function () { idx = i; goster(); });
      li.appendChild(b);
      adimlar.appendChild(li);
    });
    var git = function (n) { idx = Math.max(0, Math.min(data.length - 1, idx + n)); goster(); };
    $('[data-bis="geri"]', w).addEventListener("click", function () { git(-1); });
    $('[data-bis="ileri"]', w).addEventListener("click", function () { git(1); });
    kart.setAttribute("tabindex", "0");
    kart.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") git(1);
      if (e.key === "ArrowLeft") git(-1);
    });

    var soruEl = $(".bis-soru", test), siklar = $(".bis-siklar", test), sonuc = $(".bis-sonuc", test);
    var aktif = null, dogru = 0, toplam = 0, kilit = false;
    var yeniSoru = function () {
      aktif = data[Math.floor(Math.random() * data.length)];
      var diger = karistir(data.filter(function (x) { return x !== aktif; })).slice(0, 3);
      soruEl.innerHTML = "<b>" + esc(aktif.kim) + ":</b> " + esc(aktif.nasil) + "<br><small>Bu hangi işaret?</small>";
      siklar.innerHTML = "";
      karistir([aktif].concat(diger)).forEach(function (s) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "btn";
        b.textContent = "(" + s.h + ") " + s.en;
        b.addEventListener("click", function () {
          if (kilit) return;
          kilit = true; toplam++;
          var ok = s === aktif;
          if (ok) dogru++;
          $$(".btn", siklar).forEach(function (x, k) { x.disabled = true; });
          b.classList.add(ok ? "bis-dogru" : "bis-yanlis");
          if (!ok) $$(".btn", siklar).forEach(function (x) {
            if (x.textContent === "(" + aktif.h + ") " + aktif.en) x.classList.add("bis-dogru");
          });
          sonuc.innerHTML = (ok ? "✓ Doğru" : "✗ Doğrusu: <b>(" + esc(aktif.h) + ") " + esc(aktif.en) + "</b>") +
            " · skor " + dogru + "/" + toplam;
          setTimeout(function () { kilit = false; yeniSoru(); }, 1800);
        });
        siklar.appendChild(b);
      });
    };

    $$("[data-bis-mod]", w).forEach(function (b) {
      b.addEventListener("click", function () {
        var mod = b.getAttribute("data-bis-mod");
        $$("[data-bis-mod]", w).forEach(function (x) {
          var on = x === b;
          x.classList.toggle("aktif", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        sira.hidden = mod !== "sira";
        test.hidden = mod !== "test";
        if (mod === "test" && !aktif) yeniSoru();
      });
    });
    goster();
  });

  /* ---------- b_kalkis ---------- */
  $$(".w-b-kalkis").forEach(function (w) {
    var veri = $(".b-veri", w);
    if (!veri) return;
    var data = JSON.parse(veri.textContent), bilgi = $(".bkl-bilgi", w);
    var sec = function (c) {
      w.setAttribute("data-case", c);
      $$("[data-bk]", w).forEach(function (b) {
        var on = b.getAttribute("data-bk") === c;
        b.classList.toggle("aktif", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      bilgi.innerHTML = data[c];
    };
    $$("[data-bk]", w).forEach(function (b) {
      b.addEventListener("click", function () { sec(b.getAttribute("data-bk")); });
    });
    sec(w.getAttribute("data-case") || "1");
  });
})();
