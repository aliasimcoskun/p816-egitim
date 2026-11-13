"""Ders içeriğini, soruları ve kartları derleyip eğitim paketini üretir; kapsamı denetler.

Kullanım:
  python araclar/derle.py bolum2                      # bölümü derle
  python araclar/derle.py bolum2 --parca b --sayfa 2-11..2-19.07 --kuru
        # yalnızca icerik/bolum2_b* dosyalarını yükle, yalnızca verilen aralıktaki
        # kaynak birimlerini denetle, dosya yazma (parça yazarken kontrol için)

Bölüm dosyaları:
  kaynak/<bolum>_birimler.json, kaynak/<bolum>_sekil_birimleri*.json
  icerik/<bolum>.md (başlık + @aralik), icerik/<bolum>_<parça>.md
  icerik/<bolum>[_<parça>]_sorular.txt, icerik/<bolum>[_<parça>]_kartlar.txt
  sablon/bilesenler*.html, sablon/stil*.css, sablon/uygulama*.js

Üretilenler: site/<bolum>.html, site/kapsam_<bolum>.html, site/index.html (bölüm listesi),
             cikti/kapsam_<bolum>.csv, cikti/P-816_<bolum>.apkg (genanki kuruluysa)
Çıkış kodu 1: derste karşılığı olmayan kaynak birimi ya da biçim hatası var.
"""
import argparse
import csv
import glob
import hashlib
import html
import json
import os
import re
import shutil
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import anlatim  # noqa: E402  (seslendirme metni)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(ROOT, *a)
CONTENT_KINDS = {"metin", "sekil", "sekil-icerik"}

ap = argparse.ArgumentParser()
ap.add_argument("bolum", nargs="?", default="bolum1")
ap.add_argument("--parca", help="yalnızca bu parçanın içerik dosyalarını yükle (ör. b)")
ap.add_argument("--sayfa", help="denetimi bu aralıkla sınırla: 2-11..2-19 ya da 2-11.01..2-19.07")
ap.add_argument("--kuru", action="store_true", help="dosya yazma, yalnızca denetle")
ARGS = ap.parse_args()
BOLUM = ARGS.bolum
ERRORS = []


# ---------------------------------------------------------------- dosya bulma
def part_files(suffix):
    """icerik/<bolum><suffix> ve icerik/<bolum>_<parça><suffix> dosyaları (sıralı)."""
    base = P("icerik", f"{BOLUM}{suffix}")
    parts = sorted(glob.glob(P("icerik", f"{BOLUM}_?{suffix}")))
    if ARGS.parca:
        parts = [p for p in parts if os.path.basename(p) == f"{BOLUM}_{ARGS.parca}{suffix}"]
    return ([base] if os.path.exists(base) else []) + parts


def load_units():
    units = []
    files = [P("kaynak", f"{BOLUM}_birimler.json")] + sorted(glob.glob(P("kaynak", f"{BOLUM}_sekil_birimleri*.json")))
    for path in files:
        if os.path.exists(path):
            with open(path, encoding="utf-8") as f:
                units += json.load(f)
    return units


UNITS = load_units()
ORDER = {u["id"]: i for i, u in enumerate(UNITS)}
BYID = {u["id"]: u for u in UNITS}


def resolve(spec, where):
    ids = []
    for part in [p.strip() for p in spec.split(",") if p.strip()]:
        if ".." in part:
            a, b = [x.strip() for x in part.split("..")]
            if a not in ORDER or b not in ORDER or ORDER[a] > ORDER[b]:
                ERRORS.append(f"{where}: geçersiz aralık '{part}'")
                continue
            ids += [UNITS[i]["id"] for i in range(ORDER[a], ORDER[b] + 1)]
        elif part in ORDER:
            ids.append(part)
        else:
            ERRORS.append(f"{where}: bilinmeyen kimlik '{part}'")
    return ids


def scope_filter(units):
    """--sayfa ile verilen aralıktaki metin birimleri (+ o sayfalardaki şekil birimleri)."""
    if not ARGS.sayfa:
        return units
    a, b = [x.strip() for x in ARGS.sayfa.split("..")]
    text_units = [u for u in UNITS if u["kind"] != "sekil-icerik"]
    def bound(tok, first):
        if tok in ORDER:
            return ORDER[tok]
        idx = [ORDER[u["id"]] for u in text_units if u["page"] == tok]
        if not idx:
            sys.exit(f"--sayfa: '{tok}' bulunamadı")
        return idx[0] if first else idx[-1]
    lo, hi = bound(a, True), bound(b, False)
    pages = {UNITS[i]["page"] for i in range(lo, hi + 1)}
    return [u for u in units if (u["kind"] != "sekil-icerik" and lo <= ORDER[u["id"]] <= hi)
            or (u["kind"] == "sekil-icerik" and u["page"] in pages)]


# ---------------------------------------------------------------- satır içi biçim
def inline(text):
    t = html.escape(text, quote=False)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\*\w])\*(?!\s)(.+?)(?<!\s)\*(?![\*\w])", r"<em>\1</em>", t)
    return t


def render_table(rows):
    cells = [[c.strip() for c in r.strip().strip("|").split("|")] for r in rows]
    cells = [r for r in cells if not all(re.fullmatch(r":?-{2,}:?", c) for c in r)]
    head, body = cells[0], cells[1:]
    out = ['<div class="tablo"><table><thead><tr>']
    out += [f"<th>{inline(c)}</th>" for c in head]
    out.append("</tr></thead><tbody>")
    for r in body:
        out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
    out.append("</tbody></table></div>")
    return "".join(out)


def render_lines(lines, widgets):
    out, i = [], 0
    lines = list(lines)
    while i < len(lines):
        s = lines[i].rstrip()
        if not s.strip():
            i += 1
            continue
        if s.startswith("@w "):
            name = s[3:].strip()
            if name not in widgets:
                ERRORS.append(f"bilinmeyen bileşen '{name}'")
            out.append(widgets.get(name, ""))
            i += 1
        elif s.startswith("|"):
            j = i
            while j < len(lines) and lines[j].startswith("|"):
                j += 1
            out.append(render_table(lines[i:j]))
            i = j
        elif re.match(r"^- ", s):
            items = []
            while i < len(lines) and lines[i].startswith("- "):
                items.append(f"<li>{inline(lines[i][2:])}</li>")
                i += 1
            out.append("<ul>" + "".join(items) + "</ul>")
        elif re.match(r"^\d+\. ", s):
            items = []
            while i < len(lines) and re.match(r"^\d+\. ", lines[i]):
                items.append(f"<li>{inline(re.sub(r'^\d+\. ', '', lines[i]))}</li>")
                i += 1
            out.append("<ol>" + "".join(items) + "</ol>")
        else:
            para = []
            while i < len(lines) and lines[i].strip() and not re.match(r"^(\||- |\d+\. |@w )", lines[i]):
                para.append(lines[i].strip())
                i += 1
            out.append(f"<p>{inline(' '.join(para))}</p>")
    return "".join(out)


def render_block_body(lines, widgets):
    lines = list(lines)
    while lines and not lines[0].strip():
        lines.pop(0)
    if not lines:
        return "", None
    first = lines[0].strip()
    m = re.match(r"^!(dikkat|not|kaynak|uyari)\s*(.*)$", first)
    if m:
        kind, title = m.group(1), m.group(2)
        label = {"dikkat": "Dikkat", "not": "Not", "kaynak": "Kaynak notu", "uyari": "Uyarı"}[kind]
        body = render_lines(lines[1:], widgets)
        return (f'<div class="kutu kutu-{kind}"><div class="kutu-baslik"><span>{label}</span> '
                f'{inline(title)}</div>{body}</div>'), kind
    m = re.match(r"^@f\s+(\S+)\s*\|\s*(.*)$", first)
    if m:
        src, title = m.group(1), m.group(2)
        if not os.path.exists(P("img", src)):
            ERRORS.append(f"şekil dosyası yok: img/{src}")
        body = render_lines(lines[1:], widgets)
        return (f'<figure class="sekil"><a href="img/{src}" target="_blank" rel="noopener">'
                f'<img src="img/{src}" alt="{html.escape(title)}" loading="lazy"></a>'
                f'<figcaption><strong>{inline(title)}</strong>{body}</figcaption></figure>'), "sekil"
    return render_lines(lines, widgets), None


# ---------------------------------------------------------------- içerik dosyaları
def parse_content(widgets):
    meta = {"title": BOLUM, "aralik": "", "kisa": BOLUM}
    sections, exempt, blocks = [], set(), []
    heads = []  # seslendirmede bir sonraki bloğun başında okunacak başlıklar
    for path in part_files(".md"):
        with open(path, encoding="utf-8") as f:
            text = re.sub(r"<!--.*?-->", "", f.read(), flags=re.S)
        fname = os.path.basename(path)
        pending = []

        def push_block(refs):
            nonlocal pending
            if not any(l.strip() for l in pending):
                pending = []
                return
            if not sections:
                ERRORS.append(f"{fname}: bölüm başlığından (##) önce içerik var")
                pending = []
                return
            n = len(blocks) + 1
            html_body, kind = render_block_body(pending, widgets)
            textual = any(l.strip() and not l.startswith("@w ") for l in pending)
            if not refs and textual:
                ERRORS.append(f"{fname} blok {n}: kaynaksız metin -> {next(l for l in pending if l.strip())[:60]!r}")
            b = {"n": n, "sec": sections[-1]["id"], "html": html_body, "refs": refs, "kind": kind, "anlatim": ""}
            if textual:
                b["anlatim"] = anlatim.blok_metni(pending, heads)
                heads.clear()
            blocks.append(b)
            sections[-1]["items"].append(("blok", b))
            pending = []

        for raw in text.splitlines():
            line = raw.rstrip()
            if line.startswith("# "):
                meta["title"] = line[2:].strip()
            elif line.startswith("@aralik"):
                meta["aralik"] = line[len("@aralik"):].strip()
            elif line.startswith("@kisa"):
                meta["kisa"] = line[len("@kisa"):].strip()
            elif line.startswith("## "):
                push_block([])
                sid, _, stitle = line[3:].partition("|")
                if any(s["id"] == sid.strip() for s in sections):
                    ERRORS.append(f"{fname}: bölüm kimliği tekrar ediyor: {sid.strip()}")
                sections.append({"id": sid.strip(), "title": stitle.strip(), "items": []})
                heads[:] = [stitle.strip()]
            elif line.startswith("### ") or line.startswith("#### "):
                push_block([])
                lvl = 3 if line.startswith("### ") else 4
                if sections:
                    sections[-1]["items"].append((f"h{lvl}", line[lvl + 1:].strip()))
                    heads.append(line[lvl + 1:].strip())
            elif line.startswith("@baglam"):
                exempt.update(resolve(line[len("@baglam"):], f"{fname} @baglam"))
            elif line.startswith("@k"):
                push_block(resolve(line[2:], f"{fname} blok {len(blocks) + 1}"))
            else:
                pending.append(line)
        push_block([])
    return meta, sections, blocks, exempt


def parse_quiz():
    quiz = []
    for path in part_files("_sorular.txt"):
        sec = None
        with open(path, encoding="utf-8") as f:
            chunks = re.split(r"\n\s*\n", f.read())
        for ch in chunks:
            q = {"opts": []}
            for line in ch.splitlines():
                line = line.rstrip()
                if line.startswith("#") and not line.startswith("## "):
                    continue
                if line.startswith("## "):
                    sec = line[3:].strip()
                elif line.startswith("S:"):
                    q["q"] = line[2:].strip()
                elif line.startswith("+ ") or line.startswith("- "):
                    q["opts"].append({"t": line[2:].strip(), "ok": line[0] == "+"})
                elif line.startswith("A:"):
                    q["a"] = line[2:].strip()
                elif line.startswith("K:"):
                    q["refs"] = resolve(line[2:], f"soru '{q.get('q', '')[:40]}'")
            if "q" in q:
                q["sec"] = sec
                q["id"] = f"S{len(quiz) + 1:03d}"
                if sum(o["ok"] for o in q["opts"]) != 1:
                    ERRORS.append(f"{q['id']} ({os.path.basename(path)}): tam bir doğru şık olmalı")
                if not q.get("refs"):
                    ERRORS.append(f"{q['id']} ({os.path.basename(path)}): kaynak (K:) yok")
                q.setdefault("refs", [])
                q.setdefault("a", "")
                quiz.append(q)
    return quiz


def parse_cards():
    cards = []
    for path in part_files("_kartlar.txt"):
        with open(path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                parts = [p.strip() for p in line.split("||")]
                if len(parts) != 4:
                    ERRORS.append(f"kart satırı bozuk ({os.path.basename(path)}): {line[:60]}")
                    continue
                sec, front, back, refs = parts
                img = None
                m = re.match(r"\[img:([^\]]+)\]\s*", front)
                if m:
                    img, front = m.group(1).strip(), front[m.end():]
                    if not os.path.exists(P("img", img)):
                        ERRORS.append(f"kart görseli yok: img/{img}")
                cards.append({"id": f"K{len(cards) + 1:03d}", "sec": sec, "f": front, "b": back, "img": img,
                              "refs": resolve(refs, f"kart '{front[:40]}'")})
    return cards


def read_all(pattern):
    out = []
    for path in sorted(glob.glob(P("sablon", pattern))):
        with open(path, encoding="utf-8") as f:
            out.append(f.read())
    return "\n".join(out)


def load_widgets():
    parts = re.split(r"<!--\s*@@\s*(\w+)\s*-->", read_all("bilesenler*.html"))
    return {parts[i]: parts[i + 1].strip() for i in range(1, len(parts), 2)}


def pages_label(ids):
    pages = []
    for i in ids:
        p = BYID[i]["page"]
        if p not in pages:
            pages.append(p)
    return "s. " + ", ".join(pages)


def orig_list(ids):
    items = []
    for i in ids:
        u = BYID[i]
        cls = ' class="fig"' if u["kind"] == "sekil-icerik" else ""
        items.append(f'<li{cls}><span class="uid">{u["id"]}</span>{html.escape(u["text"])}</li>')
    return "<ol class=\"orijinal-liste\">" + "".join(items) + "</ol>"


def stable_id(text):
    return int(hashlib.sha1(text.encode()).hexdigest()[:8], 16) | (1 << 30)


# ---------------------------------------------------------------- sayfa iskeleti
def header(meta, chapters, current, extra_buttons=""):
    links = "".join(
        f'<a class="bolum-link{" aktif" if c["bolum"] == current else ""}" href="{c["bolum"]}.html">{html.escape(c["kisa"])}</a>'
        for c in chapters)
    return (f'<header class="ust"><button class="menu-btn" aria-label="İçindekiler">☰</button>'
            f'<a class="ust-baslik" href="index.html"><span class="etiket">CNATRA P-816 · CV Procedures (UMFO) T-45C</span>'
            f'<strong>{inline(meta["title"])}</strong></a>'
            f'<nav class="bolum-nav">{links}</nav>'
            f'<div class="ust-araclar">{extra_buttons}<button class="btn" id="tema" aria-label="Tema">◐</button></div></header>')


def doc(title, css, body, js, cls=""):
    return (f'<!doctype html>\n<html lang="tr"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)}</title>'
            f'<style>{css}</style></head><body class="{cls}">{body}<script>{js}</script></body></html>')


# ---------------------------------------------------------------- üret
def main():
    widgets = load_widgets()
    meta, sections, blocks, exempt = parse_content(widgets)
    quiz, cards = parse_quiz(), parse_cards()
    sec_ids = {s["id"] for s in sections}
    for q in quiz:
        if q["sec"] not in sec_ids:
            ERRORS.append(f"{q['id']}: bilinmeyen bölüm '{q['sec']}'")
    for c in cards:
        if c["sec"] not in sec_ids:
            ERRORS.append(f"{c['id']}: bilinmeyen bölüm '{c['sec']}'")

    content_units = scope_filter([u for u in UNITS if u["kind"] in CONTENT_KINDS])
    lesson, assess = {}, {}
    for b in blocks:
        for i in b["refs"]:
            lesson.setdefault(i, []).append(b["n"])
    for q in quiz:
        for i in q["refs"]:
            assess.setdefault(i, []).append(q["id"])
    for c in cards:
        for i in c["refs"]:
            assess.setdefault(i, []).append(c["id"])
    exempt_all = exempt | {u["id"] for u in content_units if u["kind"] == "sekil"}
    missing_lesson = [u for u in content_units if u["id"] not in lesson]
    need_assess = [u for u in content_units if u["id"] not in exempt_all]
    missing_assess = [u for u in need_assess if u["id"] not in assess]
    src_notes = [b for b in blocks if b["kind"] == "kaynak"]

    # ---- seslendirme: ses dosyası yalnızca metni değişmemiş bloklara bağlanır (anahtar = metnin özeti)
    manifest_path = P("site", "ses", BOLUM, "ses.json")
    manifest = {}
    if os.path.exists(manifest_path):
        with open(manifest_path, encoding="utf-8") as f:
            manifest = json.load(f)
    anlatim_list = []
    for b in blocks:
        b["ses"] = None
        pr = anlatim.parcalar(b["anlatim"]) if b["anlatim"] else []
        if pr:
            key = anlatim.ses_anahtari(pr)
            anlatim_list.append({"n": b["n"], "sec": b["sec"], "metin": b["anlatim"], "parcalar": pr, "anahtar": key})
            if key in manifest and os.path.exists(P("site", manifest[key]["dosya"])):
                b["ses"] = manifest[key]

    stats = {
        "birim": len(content_units), "ders": len(content_units) - len(missing_lesson),
        "olcum_gerekli": len(need_assess), "olcum": len(need_assess) - len(missing_assess),
        "soru": len(quiz), "kart": len(cards), "blok": len(blocks), "kaynak_notu": len(src_notes),
        "ses_blok": sum(1 for b in blocks if b["ses"]), "anlatim_blok": len(anlatim_list),
        "ses_dk": round(sum(b["ses"]["sure"] for b in blocks if b["ses"]) / 60),
    }

    def report_and_exit():
        scope = f" ({ARGS.sayfa})" if ARGS.sayfa else ""
        print(f"Ders kapsamı{scope} : {stats['ders']}/{stats['birim']} kaynak birimi")
        print(f"Ölçme kapsamı{scope}: {stats['olcum']}/{stats['olcum_gerekli']} bilgi birimi")
        print(f"Blok {stats['blok']} · soru {stats['soru']} · kart {stats['kart']} · kaynak notu {stats['kaynak_notu']}")
        print(f"Seslendirme: {stats['ses_blok']}/{stats['anlatim_blok']} blok, ~{stats['ses_dk']} dk")
        if missing_assess:
            print("Ölçülmeyen bilgi birimleri: " + ", ".join(u["id"] for u in missing_assess))
        for e in ERRORS:
            print("HATA:", e)
        if missing_lesson:
            print("EKSİK — derste karşılığı olmayan birimler:")
            for u in missing_lesson:
                print(f"  {u['id']}: {u['text'][:90]}")
        sys.exit(1 if (missing_lesson or ERRORS) else 0)

    if ARGS.kuru:
        report_and_exit()

    css = read_all("stil*.css")
    js = read_all("uygulama*.js")
    os.makedirs(P("site", "img"), exist_ok=True)
    os.makedirs(P("cikti"), exist_ok=True)
    for f in os.listdir(P("img")):
        shutil.copy2(P("img", f), P("site", "img", f))
    with open(P("cikti", f"anlatim_{BOLUM}.json"), "w", encoding="utf-8") as f:
        json.dump(anlatim_list, f, ensure_ascii=False, indent=1)

    # bölüm listesi (index ve üst menü için)
    reg_path = P("site", "_bolumler.json")
    reg = {}
    if os.path.exists(reg_path):
        with open(reg_path, encoding="utf-8") as f:
            reg = json.load(f)
    reg[BOLUM] = {"bolum": BOLUM, "title": meta["title"], "kisa": meta["kisa"], "aralik": meta["aralik"], **stats}
    with open(reg_path, "w", encoding="utf-8") as f:
        json.dump(reg, f, ensure_ascii=False, indent=1)
    chapters = [reg[k] for k in sorted(reg)]

    # ---- ders sayfası
    nav, main_parts = [], []
    for s in sections:
        sq = [q for q in quiz if q["sec"] == s["id"]]
        nav.append(f'<li><a href="#s-{s["id"]}"><span class="no">{s["id"]}</span>{inline(s["title"])}'
                   f'<span class="rozet" data-rozet="{s["id"]}">{len(sq)} soru</span></a></li>')
        parts = [f'<section class="bolum" id="s-{s["id"]}"><h2><span class="no">{s["id"]}</span>'
                 f'{inline(s["title"])}</h2>']
        for kind, item in s["items"]:
            if kind in ("h3", "h4"):
                parts.append(f"<{kind}>{inline(item)}</{kind}>")
                continue
            b = item
            src, dinle, ses_attr = "", "", ""
            if b["ses"]:
                dinle = '<button class="dinle-btn" aria-label="Bu paragraftan itibaren dinle">▶ Dinle</button>'
                ses_attr = f' data-ses="{b["ses"]["dosya"]}" data-sure="{b["ses"]["sure"]}"'
            if b["refs"]:
                src = (f'<div class="kaynak-bar">{dinle}<button class="kaynak-btn" aria-expanded="false">'
                       f'<span class="kb-ikon">EN</span>{pages_label(b["refs"])} · {len(b["refs"])} kaynak birimi'
                       f'</button></div><div class="orijinal" hidden>{orig_list(b["refs"])}</div>')
            elif dinle:
                src = f'<div class="kaynak-bar">{dinle}</div>'
            parts.append(f'<div class="blok blok-{b["kind"] or "metin"}" id="b-{b["n"]}"{ses_attr}>{b["html"]}{src}</div>')
        if sq:
            qs = []
            for q in sq:
                opts = "".join(f'<button class="sik" data-ok="{1 if o["ok"] else 0}">{inline(o["t"])}</button>'
                               for o in q["opts"])
                qs.append(f'<div class="soru" id="{q["id"]}"><p class="soru-metin">{inline(q["q"])}</p>'
                          f'<div class="siklar">{opts}</div><div class="aciklama" hidden>'
                          f'<p>{inline(q["a"])}</p><p class="soru-kaynak">Kaynak: {pages_label(q["refs"])} '
                          f'({", ".join(q["refs"])})</p></div></div>')
            parts.append(f'<div class="quiz" data-sec="{s["id"]}"><div class="quiz-bas"><h3>Bölüm soruları</h3>'
                         f'<span class="skor" data-skor="{s["id"]}">0 / {len(sq)}</span></div>{"".join(qs)}</div>')
        parts.append("</section>")
        main_parts.append("".join(parts))

    cards_json = json.dumps([{"sec": c["sec"], "f": c["f"], "b": c["b"], "img": c["img"],
                              "src": pages_label(c["refs"])} for c in cards], ensure_ascii=False)
    sec_opts = "".join(f'<option value="{s["id"]}">{s["id"]} · {html.escape(s["title"])}</option>' for s in sections)
    buttons = ((f'<button class="btn" id="ses-baslat" title="Görünen paragraftan itibaren sesli dinle">🔊 Dinle</button>'
                if stats["ses_blok"] else "") +
               f'<button class="btn" id="tum-kaynak">Tüm kaynakları aç</button>'
               f'<a class="btn" href="kapsam_{BOLUM}.html">Kapsam raporu</a>')
    oynatici = "" if not stats["ses_blok"] else """
<div class="oynatici-bar" id="oynatici" hidden role="region" aria-label="Seslendirme oynatıcısı">
<button class="btn ob-oynat" aria-label="Oynat / duraklat">▶</button>
<button class="btn ob-geri" aria-label="Önceki paragraf">⏮</button><button class="btn ob-ileri" aria-label="Sonraki paragraf">⏭</button>
<div class="ob-orta"><div class="ob-baslik"></div><div class="ob-satir"><input type="range" class="ob-ilerleme" min="0" max="1000" value="0" aria-label="Paragraf içindeki konum"><span class="ob-zaman">0:00 / 0:00</span></div></div>
<div class="ob-hiz"><span class="ob-hiz-btn"></span><input type="range" class="ob-hiz-kaydir" min="0.5" max="2" step="0.05" value="1" aria-label="Okuma hızı"><b class="ob-hiz-deger">1,00×</b></div>
<label class="ob-devam"><input type="checkbox" checked> Sonrakine geç</label>
<button class="btn ob-kapat" aria-label="Oynatıcıyı kapat">✕</button>
</div>"""
    body = f"""{header(meta, chapters, BOLUM, buttons)}
<div class="duzen">
<nav class="yan"><div class="yan-ozet"><div><b>{stats['ders']}/{stats['birim']}</b><span>kaynak birimi derste</span></div>
<div><b>{stats['olcum']}/{stats['olcum_gerekli']}</b><span>ölçülen bilgi</span></div></div>
<ol>{''.join(nav)}<li><a href="#kartlar"><span class="no">✦</span>Bilgi kartları<span class="rozet">{len(cards)} kart</span></a></li></ol>
<p class="yan-not">Her paragrafın altındaki <span class="kb-ikon">EN</span> düğmesi, o paragrafın dayandığı orijinal İngilizce cümleleri gösterir.</p></nav>
<main>
<div class="giris"><p>Bu sayfa P-816'nın <b>{html.escape(meta['kisa'])}</b> kısmının ({html.escape(meta['aralik'])}) Türkçe eğitim uyarlamasıdır. Terimler orijinal İngilizce hâliyle korunmuştur. <b>Esas metin İngilizce orijinaldir</b>; çelişki hâlinde orijinal geçerlidir. Belgedeki tutarsızlıklar <span class="kutu-ornek">Kaynak notu</span> kutularıyla işaretlenmiştir ({stats['kaynak_notu']} adet).</p></div>
{''.join(main_parts)}
<section class="bolum" id="kartlar"><h2><span class="no">✦</span>Bilgi kartları</h2>
<p>Kartı çevirmek için tıklayın ya da boşluk tuşuna basın; ← → ile geçin. Aralıklı tekrar için aynı kartlar Anki destesi olarak da verilmiştir.</p>
<div class="deste-arac"><select id="deste-filtre"><option value="">Tüm bölümler</option>{sec_opts}</select>
<button class="btn" id="deste-karistir">Karıştır</button><span id="deste-sayac"></span></div>
<div class="kart" id="kart" tabindex="0" role="button" aria-label="Kartı çevir"><div class="kart-ic"><div class="kart-on"></div><div class="kart-arka"></div></div></div>
<div class="deste-nav"><button class="btn" id="kart-geri">← Önceki</button><button class="btn" id="kart-ileri">Sonraki →</button></div>
</section>
<footer>Kaynak: CNATRA P-816 (01-14), Revision 1 (28 Jan 14), Change 1 (09 Feb 18). Bu sayfa <code>araclar/derle.py</code> ile üretilmiştir; içerik <code>icerik/</code> klasöründen düzenlenir.</footer>
</main></div>{oynatici}
<script type="application/json" id="kart-veri">{cards_json}</script>"""
    with open(P("site", f"{BOLUM}.html"), "w", encoding="utf-8") as f:
        f.write(doc(f"P-816 {meta['kisa']}", css, body, js))

    # ---- kapsam raporu
    rows, csv_rows = [], []
    for u in content_units:
        uid = u["id"]
        les, ass = lesson.get(uid, []), assess.get(uid, [])
        if not les:
            durum, cls = "Derste yok", "eksik"
        elif uid in exempt_all:
            durum, cls = "Derste · bağlam", "muaf"
        elif not ass:
            durum, cls = "Derste · ölçülmüyor", "kismi"
        else:
            durum, cls = "Tam", "tam"
        les_links = " ".join(f'<a href="{BOLUM}.html#b-{n}">#{n}</a>' for n in les)
        rows.append(f'<tr class="{cls}"><td class="uid">{uid}</td><td>{u["page"]}</td>'
                    f'<td>{html.escape(u["text"])}</td><td>{les_links}</td><td>{" ".join(ass)}</td>'
                    f'<td><span class="durum {cls}">{durum}</span></td></tr>')
        csv_rows.append([uid, u["page"], u["kind"], u["text"], " ".join(f"#{n}" for n in les), " ".join(ass), durum])
    notes_html = "".join(
        f'<li><a href="{BOLUM}.html#b-{b["n"]}">Blok #{b["n"]}</a> — {pages_label(b["refs"])}: '
        f'{re.sub("<[^>]+>", " ", b["html"]).replace("Kaynak notu", "", 1).strip()[:280]}</li>' for b in src_notes)
    pct = lambda a, b: f"{(100 * a / b):.0f}" if b else "100"
    body = f"""{header(meta, chapters, BOLUM, f'<a class="btn" href="{BOLUM}.html">← Derse dön</a>')}
<main class="rapor-main"><h1 class="rapor-baslik">Kapsam raporu · {html.escape(meta['kisa'])}</h1>
<div class="metrikler">
<div class="metrik"><b>{pct(stats['ders'], stats['birim'])}%</b><span>Ders kapsamı</span><small>{stats['ders']} / {stats['birim']} kaynak birimi en az bir ders paragrafında</small></div>
<div class="metrik"><b>{pct(stats['olcum'], stats['olcum_gerekli'])}%</b><span>Ölçme kapsamı</span><small>{stats['olcum']} / {stats['olcum_gerekli']} bilgi birimi en az bir soru veya kartta</small></div>
<div class="metrik"><b>{stats['soru']} + {stats['kart']}</b><span>Soru + kart</span><small>{stats['blok']} ders bloğu</small></div>
<div class="metrik"><b>{stats['kaynak_notu']}</b><span>Kaynak notu</span><small>belgede tespit edilen tutarsızlık</small></div>
</div>
<p class="aciklama-metin"><b>Kaynak birimi</b>: PDF metninden otomatik çıkarılan her cümle / liste maddesi ve şekillerden elle aktarılan her bilgi. Kimlik = belge sayfası + sıra (ör. 1-7.04). <b>Bağlam</b>: giriş ve geçiş cümleleri, şekil başlıkları; derste işlenir ama sınavla ölçülmez.</p>
<h2>Belgede tespit edilen tutarsızlıklar</h2><ul class="notlar">{notes_html or '<li>Yok</li>'}</ul>
<h2>Birim birim eşleme</h2>
<div class="filtre"><button class="btn aktif" data-f="">Tümü ({len(content_units)})</button>
<button class="btn" data-f="eksik">Derste yok ({len(missing_lesson)})</button>
<button class="btn" data-f="kismi">Ölçülmüyor ({len(missing_assess)})</button>
<button class="btn" data-f="muaf">Bağlam</button></div>
<div class="tablo"><table class="kapsam"><thead><tr><th>Kimlik</th><th>Sayfa</th><th>Orijinal metin</th><th>Ders bloğu</th><th>Soru / kart</th><th>Durum</th></tr></thead>
<tbody>{''.join(rows)}</tbody></table></div></main>"""
    with open(P("site", f"kapsam_{BOLUM}.html"), "w", encoding="utf-8") as f:
        f.write(doc(f"P-816 {meta['kisa']} kapsam", css, body, js, "rapor"))
    with open(P("cikti", f"kapsam_{BOLUM}.csv"), "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["kimlik", "sayfa", "tur", "orijinal_metin", "ders_bloklari", "soru_kart", "durum"])
        w.writerows(csv_rows)

    # ---- Anki
    apkg = None
    try:
        import genanki
        model = genanki.Model(
            1607392319, "P-816 Kart",
            fields=[{"name": "On"}, {"name": "Arka"}, {"name": "Kaynak"}],
            templates=[{"name": "Kart", "qfmt": '<div class="on">{{On}}</div>',
                        "afmt": '{{FrontSide}}<hr id="answer"><div class="arka">{{Arka}}</div>'
                                '<div class="kaynak">{{Kaynak}}</div>'}],
            css=".card{font-family:system-ui,sans-serif;font-size:19px;text-align:left;max-width:640px;margin:auto;line-height:1.45}"
                ".on{font-weight:600}.kaynak{margin-top:14px;font-size:13px;color:#888}")
        deck_id = 2059400110 if BOLUM == "bolum1" else stable_id("deck-" + BOLUM)
        deck = genanki.Deck(deck_id, f"P-816::{meta['title']}")
        media = []
        for c in cards:
            front = html.escape(c["f"])
            if c["img"]:
                front = f'<img src="{c["img"]}" style="max-height:260px;background:#fff"><br>' + front
                media.append(P("img", c["img"]))
            deck.add_note(genanki.Note(model=model, fields=[front, html.escape(c["b"]),
                                                            f'P-816 {pages_label(c["refs"])}'],
                                       guid=(genanki.guid_for("kart", c["img"], c["f"]) if c["img"]
                                             else genanki.guid_for("kart", c["f"])), tags=[f"P816::{c['sec']}"]))
        for q in quiz:
            right = next(o["t"] for o in q["opts"] if o["ok"])
            deck.add_note(genanki.Note(model=model, fields=[html.escape(q["q"]),
                                                            f"<b>{html.escape(right)}</b><br>{html.escape(q['a'])}",
                                                            f'P-816 {pages_label(q["refs"])}'],
                                       guid=genanki.guid_for("soru", q["q"]), tags=[f"P816::{q['sec']}", "soru"]))
        apkg = P("cikti", f"P-816_{BOLUM}.apkg")
        genanki.Package(deck, media_files=sorted(set(media))).write_to_file(apkg)
    except ImportError:
        print("UYARI: genanki kurulu değil, Anki destesi atlandı (pip install genanki)")

    # ---- bölüm listesi (index.html)
    cards_html = "".join(f"""<article class="bolum-kart"><div class="bk-ust"><span class="no">{html.escape(c['kisa'])}</span><small>{html.escape(c['aralik'])}</small></div>
<h2>{inline(c['title'])}</h2>
<div class="bk-sayilar"><span><b>{c['ders']}/{c['birim']}</b> kaynak birimi derste</span><span><b>{c['olcum']}/{c['olcum_gerekli']}</b> bilgi ölçülüyor</span>
<span><b>{c['soru']}</b> soru · <b>{c['kart']}</b> kart</span><span><b>{c['kaynak_notu']}</b> kaynak notu</span>{f"<span>🔊 <b>{c['ses_dk']} dk</b> seslendirme</span>" if c.get('ses_blok') else ""}</div>
<div class="bk-linkler"><a class="btn aktif" href="{c['bolum']}.html">Derse başla</a><a class="btn" href="kapsam_{c['bolum']}.html">Kapsam raporu</a></div></article>"""
                         for c in chapters)
    index_meta = {"title": "Eğitim paketi"}
    body = f"""{header(index_meta, chapters, None)}
<main class="rapor-main"><div class="giris"><p>CNATRA P-816 <i>CV Procedures (UMFO) T-45C</i> belgesinin Türkçe eğitim paketi. Her bölümde etkileşimli ders, bölüm sonu soruları ve bilgi kartları vardır. Kapsam raporu, belgedeki her cümlenin derste nerede işlendiğini gösterir. Anki desteleri <code>cikti/</code> klasöründedir.</p></div>
<div class="bolum-izgara">{cards_html}</div></main>"""
    with open(P("site", "index.html"), "w", encoding="utf-8") as f:
        f.write(doc("P-816 Eğitim Paketi", css, body, js, "rapor"))

    if apkg:
        print(f"Anki: {os.path.relpath(apkg, ROOT)} ({len(cards) + len(quiz)} not)")
    report_and_exit()


if __name__ == "__main__":
    main()
