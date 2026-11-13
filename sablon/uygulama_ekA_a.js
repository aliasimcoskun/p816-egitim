/* Ek A, parça a: ekA_sozluk (aranabilir sözlük) */
(function () {
  "use strict";
  var kaplar = document.querySelectorAll(".w-ekA-sozluk");
  if (!kaplar.length) return;

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  var kacis = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ESC[c]; }); };
  /* **kalın** ve *italik* -> HTML (derle.py'deki satır içi biçimle aynı) */
  var bicim = function (s) {
    return kacis(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*\w])\*([^*\s](?:[^*]*?[^*\s])?)\*(?![*\w])/g, "$1<em>$2</em>");
  };
  var duz = function (s) { return String(s).replace(/\*\*/g, "").replace(/\*/g, ""); };
  /* harf harf katlama: küçük harf, aksan yok, ı -> i; uzunluk korunur (vurgulama için) */
  var katla1 = function (c) {
    var k = c.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    if (k === "ı") k = "i";
    return k.length === 1 ? k : c.toLowerCase().charAt(0);
  };
  var katla = function (s) {
    var o = "";
    for (var i = 0; i < s.length; i++) o += katla1(s.charAt(i));
    return o;
  };
  var vurgula = function (metin, katli, sorgu) {
    if (!sorgu) return kacis(metin);
    var j = katli.indexOf(sorgu);
    if (j < 0) return kacis(metin);
    return kacis(metin.slice(0, j)) + "<mark>" + kacis(metin.slice(j, j + sorgu.length)) + "</mark>" +
      kacis(metin.slice(j + sorgu.length));
  };

  Array.prototype.forEach.call(kaplar, function (w) {
    var veri;
    try { veri = JSON.parse(w.querySelector(".w-veri").textContent); } catch (e) { return; }
    var ara = w.querySelector(".ekA-sz-ara"), sayac = w.querySelector(".ekA-sz-sayac");
    var liste = w.querySelector(".ekA-sz-liste"), detay = w.querySelector(".ekA-sz-detay");
    var cipler = Array.prototype.slice.call(w.querySelectorAll(".ekA-sz-cip"));
    var bolum = "", secili = -1, gorunen = [];
    var adla = {};
    veri.forEach(function (e, i) {
      e.duz = duz(e.d);
      e.kt = katla(e.t);
      e.kd = katla(e.duz);
      adla[e.t] = i;
    });

    var ozet = function (e, sorgu, adda) {
      var m = e.duz, km = e.kd, j = sorgu && !adda ? km.indexOf(sorgu) : -1;
      if (j < 0) return kacis(m.length > 90 ? m.slice(0, 88) + "…" : m);
      var bas = Math.max(0, j - 30), son = Math.min(m.length, j + sorgu.length + 50);
      return (bas > 0 ? "…" : "") + vurgula(m.slice(bas, son), km.slice(bas, son), sorgu) + (son < m.length ? "…" : "");
    };

    var detayCiz = function (i) {
      var e = veri[i];
      var h = '<h4 class="ekA-sz-baslik">' + kacis(e.t) + "</h4>" +
        '<div class="ekA-sz-meta"><a href="#s-' + kacis(e.s) + '">' + kacis(e.s) + " tablosunda göster</a>" +
        '<span class="ekA-sz-uid">' + e.u.map(kacis).join(", ") + "</span></div>" +
        '<p class="ekA-sz-tanim">' + bicim(e.d) + "</p>";
      if (e.n) h += '<div class="ekA-sz-not"><b>Kaynak notu</b> ' + kacis(e.n) + "</div>";
      if (e.i && e.i.length) {
        h += '<div class="ekA-sz-ilgili"><span>İlgili:</span> ' + e.i.map(function (t) {
          return '<button type="button" class="ekA-sz-git" data-t="' + kacis(t) + '">' + kacis(t) + "</button>";
        }).join(" ") + "</div>";
      }
      detay.innerHTML = h;
    };

    var sec = function (i, odakla) {
      secili = i;
      Array.prototype.forEach.call(liste.querySelectorAll(".ekA-sz-oge"), function (b) {
        var on = Number(b.getAttribute("data-i")) === i;
        b.classList.toggle("secili", on);
        if (on) {
          b.setAttribute("aria-current", "true");
          var li = b.parentNode;
          if (li.offsetTop < liste.scrollTop || li.offsetTop + li.offsetHeight > liste.scrollTop + liste.clientHeight) {
            liste.scrollTop = li.offsetTop - 8;
          }
          if (odakla) b.focus();
        } else {
          b.removeAttribute("aria-current");
        }
      });
      if (i >= 0) detayCiz(i);
    };

    var listele = function () {
      var sorgu = katla(ara.value.trim());
      var sonuc = [];
      veri.forEach(function (e, i) {
        if (bolum && e.s !== bolum) return;
        var r;
        if (!sorgu) r = 0;
        else if (e.kt.indexOf(sorgu) === 0) r = 0;
        else if ((" " + e.kt.replace(/[^a-z0-9]+/g, " ")).indexOf(" " + sorgu) >= 0) r = 1;
        else if (e.kt.indexOf(sorgu) >= 0) r = 2;
        else if (e.kd.indexOf(sorgu) >= 0) r = 3;
        else return;
        sonuc.push({ i: i, r: r });
      });
      sonuc.sort(function (a, b) { return a.r - b.r || a.i - b.i; });
      gorunen = sonuc.map(function (x) { return x.i; });
      if (!sonuc.length) {
        liste.innerHTML = '<li class="ekA-sz-yok">Eşleşme yok.</li>';
      } else {
        liste.innerHTML = sonuc.map(function (x) {
          var e = veri[x.i];
          return '<li><button type="button" class="ekA-sz-oge" data-i="' + x.i + '">' +
            '<span class="ekA-sz-t">' + vurgula(e.t, e.kt, sorgu) +
            (e.n ? '<span class="ekA-sz-isaret" title="Kaynak notu var" aria-label="kaynak notu var">◆</span>' : "") +
            '</span><span class="ekA-sz-oz">' + ozet(e, sorgu, x.r < 3) + "</span></button></li>";
        }).join("");
      }
      sayac.textContent = sonuc.length + " / " + veri.length + " terim";
      if (gorunen.indexOf(secili) >= 0) sec(secili, false);
    };

    var cipSec = function (s) {
      bolum = s;
      cipler.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-s") === s ? "true" : "false"); });
    };

    ara.addEventListener("input", listele);
    ara.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" && gorunen.length) { ev.preventDefault(); sec(gorunen[0], false); }
      else if (ev.key === "ArrowDown" && gorunen.length) {
        ev.preventDefault();
        var b = liste.querySelector(".ekA-sz-oge");
        if (b) b.focus();
      } else if (ev.key === "Escape") { ara.value = ""; listele(); }
    });
    cipler.forEach(function (c) {
      c.addEventListener("click", function () { cipSec(c.getAttribute("data-s")); listele(); });
    });
    liste.addEventListener("click", function (ev) {
      var b = ev.target.closest(".ekA-sz-oge");
      if (b) sec(Number(b.getAttribute("data-i")), false);
    });
    liste.addEventListener("keydown", function (ev) {
      var b = ev.target.closest(".ekA-sz-oge");
      if (!b || (ev.key !== "ArrowDown" && ev.key !== "ArrowUp")) return;
      ev.preventDefault();
      var li = ev.key === "ArrowDown" ? b.parentNode.nextElementSibling : b.parentNode.previousElementSibling;
      if (li && li.querySelector(".ekA-sz-oge")) li.querySelector(".ekA-sz-oge").focus();
      else if (ev.key === "ArrowUp") ara.focus();
    });
    detay.addEventListener("click", function (ev) {
      var b = ev.target.closest(".ekA-sz-git");
      if (!b) return;
      var i = adla[b.getAttribute("data-t")];
      if (i === undefined) return;
      if (gorunen.indexOf(i) < 0) { ara.value = ""; cipSec(""); listele(); }
      sec(i, true);
    });

    listele();
  });
})();
