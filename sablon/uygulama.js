(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var SVGNS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs, parent) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- tema ---------- */
  var saved = store("p816-tema");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  var temaBtn = $("#tema");
  if (temaBtn) temaBtn.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store("p816-tema", next);
  });

  /* ---------- menü (mobil) ---------- */
  var menu = $(".menu-btn"), yan = $(".yan");
  if (menu && yan) {
    menu.addEventListener("click", function () { yan.classList.toggle("acik"); });
    $$(".yan a").forEach(function (a) { a.addEventListener("click", function () { yan.classList.remove("acik"); }); });
  }

  /* ---------- kaynak (orijinal metin) ---------- */
  function setKaynak(btn, open) {
    var box = btn.parentNode.nextElementSibling;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    box.hidden = !open;
  }
  $$(".kaynak-btn").forEach(function (b) {
    b.addEventListener("click", function () { setKaynak(b, b.getAttribute("aria-expanded") !== "true"); });
  });
  var tum = $("#tum-kaynak");
  if (tum) tum.addEventListener("click", function () {
    var open = tum.getAttribute("data-acik") !== "1";
    $$(".kaynak-btn").forEach(function (b) { setKaynak(b, open); });
    tum.setAttribute("data-acik", open ? "1" : "0");
    tum.textContent = open ? "Tüm kaynakları kapat" : "Tüm kaynakları aç";
  });

  /* ---------- sorular ---------- */
  $$(".quiz").forEach(function (quiz) {
    var sec = quiz.getAttribute("data-sec");
    var sorular = $$(".soru", quiz), dogru = 0, cevap = 0;
    var skor = $('[data-skor="' + sec + '"]'), rozet = $('[data-rozet="' + sec + '"]');
    sorular.forEach(function (s) {
      var kap = $(".siklar", s);
      shuffle($$(".sik", kap)).forEach(function (b) { kap.appendChild(b); });
      $$(".sik", kap).forEach(function (b) {
        b.addEventListener("click", function () {
          var ok = b.getAttribute("data-ok") === "1";
          $$(".sik", kap).forEach(function (x) {
            x.disabled = true;
            if (x.getAttribute("data-ok") === "1") x.classList.add("dogru");
          });
          if (!ok) b.classList.add("yanlis");
          $(".aciklama", s).hidden = false;
          cevap++; if (ok) dogru++;
          if (skor) skor.textContent = dogru + " / " + sorular.length;
          if (rozet) {
            rozet.textContent = dogru + "/" + sorular.length;
            if (cevap === sorular.length) rozet.classList.add("tamam");
          }
        });
      });
    });
  });

  /* ---------- bilgi kartları ---------- */
  var veri = $("#kart-veri");
  if (veri) {
    var tumKartlar = JSON.parse(veri.textContent), liste = tumKartlar.slice(), idx = 0;
    var kart = $("#kart"), on = $(".kart-on"), arka = $(".kart-arka"), sayac = $("#deste-sayac"), filtre = $("#deste-filtre");
    var esc = function (t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; };
    var goster = function () {
      kart.classList.remove("cevrik");
      if (!liste.length) { on.textContent = "Kart yok"; arka.textContent = ""; sayac.textContent = ""; return; }
      var c = liste[idx];
      kart.classList.toggle("resimli", !!c.img);
      on.innerHTML = (c.img ? '<img class="kart-img" alt="" src="img/' + esc(c.img) + '">' : "") +
        esc(c.f) + "<small>" + esc(c.sec) + " · " + esc(c.src) + "</small>";
      arka.innerHTML = esc(c.b) + "<small>P-816 " + esc(c.src) + "</small>";
      sayac.textContent = (idx + 1) + " / " + liste.length;
    };
    var git = function (d) { if (!liste.length) return; idx = (idx + d + liste.length) % liste.length; goster(); };
    kart.addEventListener("click", function () { kart.classList.toggle("cevrik"); });
    kart.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); kart.classList.toggle("cevrik"); }
      if (e.key === "ArrowRight") git(1);
      if (e.key === "ArrowLeft") git(-1);
    });
    $("#kart-ileri").addEventListener("click", function () { git(1); });
    $("#kart-geri").addEventListener("click", function () { git(-1); });
    $("#deste-karistir").addEventListener("click", function () { shuffle(liste); idx = 0; goster(); });
    filtre.addEventListener("change", function () {
      liste = tumKartlar.filter(function (c) { return !filtre.value || c.sec === filtre.value; });
      idx = 0; goster();
    });
    goster();
  }

  /* ---------- forma renkleri ---------- */
  $$(".w-forma").forEach(function (w) {
    var data = JSON.parse($(".w-veri", w).textContent);
    var izgara = $(".forma-izgara", w), soruEl = $(".forma-soru", w), renkler = $(".forma-renkler", w), sonuc = $(".forma-sonuc", w);
    data.forEach(function (d) {
      var k = document.createElement("div"); k.className = "forma-kart";
      var koyu = ["Sarı", "Beyaz"].indexOf(d.r) >= 0;
      k.innerHTML = '<div class="renk" style="background:' + d.c + ';color:' + (koyu ? "#1d2126" : "#fff") + '">' + d.r + "</div><ul>" +
        d.k.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      izgara.appendChild(k);
      var b = document.createElement("button");
      b.style.background = d.c; b.title = d.r; b.setAttribute("aria-label", d.r); b.setAttribute("data-r", d.r);
      renkler.appendChild(b);
    });
    var havuz = [], dogru = 0, toplam = 0, aktif = null, kilit = false;
    data.forEach(function (d) { d.k.forEach(function (k) { havuz.push({ rol: k, r: d.r }); }); });
    var yeni = function () { aktif = havuz[Math.floor(Math.random() * havuz.length)]; soruEl.textContent = aktif.rol; kilit = false; };
    $$("button", renkler).forEach(function (b) {
      b.addEventListener("click", function () {
        if (kilit) return; kilit = true; toplam++;
        var ok = b.getAttribute("data-r") === aktif.r; if (ok) dogru++;
        sonuc.innerHTML = (ok ? "✓ Doğru: " : "✗ Hayır, doğrusu ") + "<b>" + aktif.r + "</b> · skor " + dogru + "/" + toplam;
        setTimeout(yeni, 1300);
      });
    });
    yeni();
  });

  /* ---------- IFLOLS ---------- */
  $$(".w-iflols").forEach(function (w) {
    var R = { amber: "#ffb020", amberS: "#4a3812", kir: "#ff3b30", kirS: "#3f1512", yes: "#2fdc68", yesS: "#163f24" };
    var hucreG = $(".if-hucreler", w), datumG = $(".if-datum", w), cutG = $(".if-cut", w), woG = $(".if-waveoff", w);
    var hucreler = [], cuts = [], wos = [];
    for (var i = 0; i < 12; i++) hucreler.push(svgEl("circle", { cx: 280, cy: 50 + i * 20, r: 8, "class": "isik" }, hucreG));
    for (var k = 0; k < 10; k++) {
      svgEl("circle", { cx: 34 + k * 20, cy: 150, r: 7, fill: R.yes }, datumG);
      svgEl("circle", { cx: 346 + k * 20, cy: 150, r: 7, fill: R.yes }, datumG);
    }
    [232, 250, 310, 328].forEach(function (x) { cuts.push(svgEl("circle", { cx: x, cy: 96, r: 7, "class": "isik" }, cutG)); });
    [[250, 120], [250, 150], [250, 180], [250, 210], [232, 120], [232, 180], [232, 210],
     [310, 120], [310, 150], [310, 180], [310, 210], [328, 120], [328, 180], [328, 210]].forEach(function (p) {
      wos.push(svgEl("circle", { cx: p[0], cy: p[1], r: 7, "class": "isik" }, woG));
    });
    var konum = $("#if-konum", w) || $("input", w), durum = $(".if-durum", w), mesaj = $(".if-mesaj", w);
    var cutOn = false, woOn = false, zam = [];
    var ciz = function () {
      var top = 11 - Number(konum.value);
      hucreler.forEach(function (c, j) {
        var red = j >= 10;
        c.setAttribute("fill", j === top ? (red ? R.kir : R.amber) : (red ? R.kirS : R.amberS));
      });
      cuts.forEach(function (c) { c.setAttribute("fill", cutOn ? R.yes : R.yesS); });
      wos.forEach(function (c) { c.setAttribute("fill", woOn ? R.kir : R.kirS); });
      var t, cls;
      if (top < 5) { t = "Yüksek (high ball): top datumların üstünde, uçak glideslope'un üstünde."; cls = "yuksek"; }
      else if (top === 5) { t = "Glideslope üzerinde: top datumlarla yatayda hizalı."; cls = "dogru"; }
      else if (top < 10) { t = "Alçak (low ball): top datumların altında, uçak glideslope'un altında."; cls = "alcak"; }
      else { t = "KIRMIZI hücre: uçak tehlikeli derecede alçak!"; cls = "tehlike"; }
      durum.textContent = t; durum.className = "if-durum " + cls;
    };
    var temizle = function () { zam.forEach(clearTimeout); zam = []; cutOn = woOn = false; ciz(); };
    var sonra = function (ms, fn) { zam.push(setTimeout(function () { fn(); ciz(); }, ms)); };
    var senaryo = {
      roger: function () {
        cutOn = true; sonra(700, function () { cutOn = false; });
        return "Cut ışıkları kısa süre yandı: LSO \"Roger ball\" diyor (Zip Lip / EMCON operasyonlarında telsiz yerine).";
      },
      power: function () {
        cutOn = true; sonra(450, function () { cutOn = false; }); sonra(800, function () { cutOn = true; }); sonra(1250, function () { cutOn = false; });
        return "Cut ışıkları yeniden yandı: \"add power\" (güç ekle) çağrısı.";
      },
      waveoff: function () {
        woOn = true; sonra(3000, function () { woOn = false; });
        return "Kırmızı waveoff ışıkları yandı: derhal waveoff! (Güverte foul veya yaklaşma emniyetli parametrelerin dışında.)";
      },
      bingo: function () {
        for (var n = 0; n < 10; n++) (function (n) { sonra(n * 400, function () { woOn = n % 2 === 0; cutOn = n % 2 === 1; }); })(n);
        sonra(4000, function () { woOn = cutOn = false; });
        return "Waveoff ve cut ışıkları dönüşümlü yanıyor: \"Bingo\".";
      }
    };
    $$("[data-if]", w).forEach(function (b) {
      b.addEventListener("click", function () { temizle(); mesaj.textContent = senaryo[b.getAttribute("data-if")](); ciz(); });
    });
    konum.addEventListener("input", ciz);
    ciz();
  });

  /* ---------- MOVLAS ---------- */
  $$(".w-movlas").forEach(function (w) {
    var data = JSON.parse($(".w-veri", w).textContent), bilgi = $(".mv-bilgi", w);
    $$(".mv-ist", w).forEach(function (g) {
      g.setAttribute("tabindex", "0"); g.setAttribute("role", "button");
      var sec = function () {
        $$(".mv-ist", w).forEach(function (x) { x.classList.remove("secili"); });
        g.classList.add("secili"); bilgi.innerHTML = data[g.getAttribute("data-ist")];
      };
      g.addEventListener("click", sec);
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sec(); } });
    });
  });

  /* ---------- lazer lineup ---------- */
  $$(".w-lazer").forEach(function (w) {
    var g = $(".lz-sektorler", w), bilgi = $(".lz-bilgi", w), Rr = 530, rad = Math.PI / 180;
    var Y = "#f2c230", G = "#25c45a", K = "#e0352b";
    var dilimler = [
      [-3, 3, Y, "", "Sabit sarı · 0,50° — \"On Centerline to Touchdown\": uçak merkez hattında."],
      [-9, -3, G, "", "Sabit yeşil · 0,75° — merkez hattının bir yanındaki ilk sektör."],
      [-16, -9, G, "lz-yavas", "Yavaş yanıp sönen yeşil (Slow Flash) · 4,0°."],
      [-23, -16, G, "lz-hizli", "Hızlı yanıp sönen yeşil (Fast Flash) · 6,0° — en dış sektör."],
      [3, 9, K, "", "Sabit kırmızı · 0,75° — merkez hattının diğer yanındaki ilk sektör."],
      [9, 16, K, "lz-yavas", "Yavaş yanıp sönen kırmızı (Slow Flash) · 4,0°."],
      [16, 23, K, "lz-hizli", "Hızlı yanıp sönen kırmızı (Fast Flash) · 6,0° — en dış sektör."]
    ];
    dilimler.forEach(function (d) {
      var a1 = d[0] * rad, a2 = d[1] * rad;
      var p = svgEl("path", {
        d: "M0,0 L" + (Rr * Math.cos(a1)).toFixed(1) + "," + (Rr * Math.sin(a1)).toFixed(1) +
           " A" + Rr + "," + Rr + " 0 0 1 " + (Rr * Math.cos(a2)).toFixed(1) + "," + (Rr * Math.sin(a2)).toFixed(1) + " Z",
        fill: d[2], "class": "lz-dilim " + d[3], tabindex: "0", role: "button", "aria-label": d[4]
      }, g);
      var sec = function () { bilgi.textContent = d[4]; };
      p.addEventListener("click", sec);
      p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sec(); } });
    });
    var yazi = function (x, y, t, anchor, aci) {
      var e = svgEl("text", { x: x, y: y, fill: "#0d1014", "font-size": 13, "font-weight": 600, "text-anchor": anchor || "end",
        "dominant-baseline": "middle", "pointer-events": "none", transform: "rotate(" + (aci || 0) + " " + x + " " + y + ")" }, g);
      e.textContent = t;
    };
    yazi(240, 0, "On Centerline to Touchdown · Steady 0,50°", "start");
    [[-6, "Steady 0,75°"], [-12.5, "Slow Flash 4,0°"], [-19.5, "Fast Flash 6,0°"], [6, "Steady 0,75°"], [12.5, "Slow Flash 4,0°"], [19.5, "Fast Flash 6,0°"]]
      .forEach(function (l) {
        var x = 515 * Math.cos(l[0] * rad), y = 515 * Math.sin(l[0] * rad);
        yazi(x.toFixed(1), y.toFixed(1), l[1], "end", l[0]);
      });
    svgEl("circle", { cx: 0, cy: 0, r: 6, fill: "#cfd6de" }, g);
  });

  /* ---------- seslendirme oynatıcısı ---------- */
  (function () {
    var bloklar = $$(".blok[data-ses]"), bar = $("#oynatici");
    if (!bloklar.length || !bar) return;
    var a = new Audio(), sira = -1, onbellek = {}, sonUrl = null;
    a.preload = "auto";
    var hiz = parseFloat(store("p816-hiz")) || 1;
    var devamKutu = $(".ob-devam input", bar);
    devamKutu.checked = store("p816-devam") !== "0";
    var fmt = function (t) { t = Math.max(0, t || 0); return Math.floor(t / 60) + ":" + ("0" + Math.floor(t % 60)).slice(-2); };

    // Dosyayı belleğe al: sunucu kısmi yüklemeyi desteklemese de ileri/geri sarılabilsin.
    // Çift tıklayıp açılan sayfada (file://) fetch kullanılamaz; doğrudan oynatılır.
    function getir(u) {
      if (location.protocol === "file:") return Promise.resolve(u);
      if (!onbellek[u]) onbellek[u] = fetch(u).then(function (r) { if (!r.ok) throw 0; return r.blob(); })
        .then(function (b) { return URL.createObjectURL(b); }).catch(function () { return u; });
      return onbellek[u];
    }
    function hizAyarla(h) {
      hiz = Math.min(2, Math.max(0.5, h));
      a.defaultPlaybackRate = hiz; a.playbackRate = hiz; a.preservesPitch = true;
      $(".ob-hiz-kaydir", bar).value = hiz;
      $(".ob-hiz-deger", bar).textContent = hiz.toFixed(2).replace(".", ",") + "×";
      $$(".ob-hiz-btn .btn", bar).forEach(function (b) { b.classList.toggle("aktif", Math.abs(parseFloat(b.dataset.h) - hiz) < 0.001); });
      store("p816-hiz", String(hiz));
    }
    [0.75, 1, 1.25, 1.5, 1.75, 2].forEach(function (h) {
      var b = document.createElement("button");
      b.className = "btn"; b.dataset.h = h; b.textContent = String(h).replace(".", ",") + "×";
      b.addEventListener("click", function () { hizAyarla(h); });
      $(".ob-hiz-btn", bar).appendChild(b);
    });
    $(".ob-hiz-kaydir", bar).addEventListener("input", function () { hizAyarla(parseFloat(this.value)); });

    function baslik(b) {
      var s = b.closest("section"), h = s && s.querySelector("h2");
      return h ? [].map.call(h.childNodes, function (n) { return n.textContent.trim(); }).filter(Boolean).join(" ") : "";
    }
    function dugmeler() {
      $(".ob-oynat", bar).textContent = a.paused ? "▶" : "⏸";
      var bas = $("#ses-baslat");
      if (bas) bas.textContent = a.paused ? "🔊 Dinle" : "⏸ Duraklat";
    }
    function oynat(i) {
      if (i < 0 || i >= bloklar.length) return;
      sira = i;
      var b = bloklar[i];
      bloklar.forEach(function (x) { x.classList.remove("okunuyor"); });
      b.classList.add("okunuyor");
      bar.hidden = false; document.body.classList.add("oynatici-acik");
      $(".ob-baslik", bar).textContent = (i + 1) + " / " + bloklar.length + " · " + baslik(b);
      var r = b.getBoundingClientRect();
      if (r.top < 70 || r.top > innerHeight - 160) b.scrollIntoView({ block: "center", behavior: "smooth" });
      getir(b.dataset.ses).then(function (u) {
        if (sira !== i) return;  // bu arada başka bloğa geçildi
        if (sonUrl !== u) { a.src = u; sonUrl = u; }
        a.currentTime = 0; hizAyarla(hiz);
        var p = a.play(); if (p && p.catch) p.catch(function () {});
        if (bloklar[i + 1]) getir(bloklar[i + 1].dataset.ses);  // sıradakini önceden yükle
      });
    }
    function gorunenBlok() {
      for (var i = 0; i < bloklar.length; i++) if (bloklar[i].getBoundingClientRect().bottom > 90) return i;
      return 0;
    }
    a.addEventListener("ended", function () {
      if (devamKutu.checked && sira < bloklar.length - 1) oynat(sira + 1); else dugmeler();
    });
    a.addEventListener("play", dugmeler); a.addEventListener("pause", dugmeler);
    a.addEventListener("timeupdate", function () {
      $(".ob-zaman", bar).textContent = fmt(a.currentTime) + " / " + fmt(a.duration);
      if (a.duration) $(".ob-ilerleme", bar).value = a.currentTime / a.duration * 1000;
    });
    $(".ob-ilerleme", bar).addEventListener("input", function () { if (a.duration) a.currentTime = this.value / 1000 * a.duration; });
    $(".ob-oynat", bar).addEventListener("click", function () {
      if (sira < 0) oynat(gorunenBlok()); else if (a.paused) a.play(); else a.pause();
    });
    $(".ob-geri", bar).addEventListener("click", function () { if (a.currentTime > 3) a.currentTime = 0; else oynat(Math.max(0, sira - 1)); });
    $(".ob-ileri", bar).addEventListener("click", function () { if (sira < bloklar.length - 1) oynat(sira + 1); });
    devamKutu.addEventListener("change", function () { store("p816-devam", devamKutu.checked ? "1" : "0"); });
    $(".ob-kapat", bar).addEventListener("click", function () {
      a.pause(); bar.hidden = true; document.body.classList.remove("oynatici-acik");
      bloklar.forEach(function (x) { x.classList.remove("okunuyor"); });
    });
    bloklar.forEach(function (b, i) {
      var btn = $(".dinle-btn", b);
      if (btn) btn.addEventListener("click", function () { oynat(i); });
    });
    var bas = $("#ses-baslat");
    if (bas) bas.addEventListener("click", function () {
      if (sira >= 0 && !a.paused) a.pause();
      else if (sira >= 0 && !bar.hidden) a.play();
      else oynat(gorunenBlok());
    });
    hizAyarla(hiz);
  })();

  /* ---------- kapsam raporu filtresi ---------- */
  $$(".filtre .btn").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".filtre .btn").forEach(function (x) { x.classList.remove("aktif"); });
      b.classList.add("aktif");
      var f = b.getAttribute("data-f");
      $$(".kapsam tbody tr").forEach(function (tr) { tr.style.display = !f || tr.classList.contains(f) ? "" : "none"; });
    });
  });
})();
