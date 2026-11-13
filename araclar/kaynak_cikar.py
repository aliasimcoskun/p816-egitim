"""PDF'ten kaynak cümle envanteri ve şekil görsellerini çıkarır.

Kullanım:
    python araclar/kaynak_cikar.py <pdf> <ilk_pdf_sayfa> <son_pdf_sayfa> <cikti_json> [<gorsel_klasoru>]

Her cümle / liste maddesi bir "birim" olur ve belge sayfa numarasına göre kimlik alır
(ör. 1-7.04 = belge sayfası 1-7'deki 4. birim). Ders içeriği bu kimliklere atıf yapar;
derle.py her birimin derste karşılığı olup olmadığını denetler.
"""
import json
import os
import re
import sys

from pypdf import PdfReader

PAGE_RE = re.compile(r"\b([12A-C]-\d{1,2})\b")
RUNNING_TITLES = {"AIRCRAFT CARRIER OPERATIONS", "FLIGHT PROCEDURES", "GLOSSARY",
                  "FLIGHT DECK SIGNALS", "LSO RADIO CALLS"}
LIST_RE = re.compile(r"^([ivx]{1,5}|[a-z]|\d{1,2})\.\s+")


def is_section(s):
    """'201. AIR PLAN' her zaman başlık; '3. Catapult Procedures' kısa ve noktasızsa başlık,
    '3. Check the HOOK BYP switch to CARRIER.' gibi adımlar ise liste maddesi."""
    if re.match(r"^\d{3}\.\s+[A-Z]", s):
        return True
    m = re.match(r"^\d\.\s+(.*)$", s)
    if not m:
        return False
    rest = m.group(1).strip()
    words = rest.split()
    return (len(words) <= 8 and not rest.endswith(".") and rest[:1].isupper()
            and sum(w[:1].isupper() or w[:1] == "(" for w in words) >= len(words) - 1)
STANDALONE_HEADINGS = {"NOTE", "WARNING", "CAUTION", "Meatball Motherhood",
                       "Manually Operated Visual Landing Aid System (MOVLAS)"}
# Cümle bölmede yanlış kesmeye yol açan kısaltmalar
PROTECT = {"U.S.": "U§S§", "H.W.": "H§W§", "i.e.": "i§e§",
           "e.g.": "e§g§", "R. FORD": "R§ FORD"}


def is_header(line):
    s = line.strip()
    if not s or re.search(r"[a-z]", s):
        return False
    if re.search(r"CHAPTER (ONE|TWO)|APPENDIX [A-C]|CHANGE \d", s):
        return True
    if PAGE_RE.search(s) and any(t in s for t in RUNNING_TITLES):
        return True
    return re.sub(r"\s+", " ", s) in RUNNING_TITLES


def split_sentences(par):
    for k, v in PROTECT.items():
        par = par.replace(k, v)
    parts = re.split(r"(?<=[.!?])[\"”]?\s+(?=[A-Z“\"(])", par)
    out = []
    for p in parts:
        for k, v in PROTECT.items():
            p = p.replace(v, k)
        out.append(p)
    # Paragraf başındaki kısa "run-in" başlığı (ör. "Barricade.") sonraki cümleyle birleştir
    if len(out) > 1 and len(out[0].split()) <= 8 and out[0].endswith("."):
        out = [out[0] + " " + out[1]] + out[2:]
    return out


def main():
    pdf, first, last, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
    img_dir = sys.argv[5] if len(sys.argv) > 5 else None
    reader = PdfReader(pdf)
    units, state = [], {"sec": "", "buf": [], "page": None, "marker": ""}

    def add(page, text, kind):
        text = re.sub(r"\s+", " ", text).strip()
        if text:
            units.append({"page": page, "kind": kind, "sec": state["sec"], "text": text})

    def flush():
        if state["buf"]:
            par = " ".join(state["buf"])
            sents = split_sentences(par)
            if state["marker"]:
                sents[0] = f"({state['marker']}) " + sents[0]
            for s in sents:
                add(state["page"], s, "metin")
        state["buf"], state["page"], state["marker"] = [], None, ""

    for pn in range(first, last + 1):
        page_obj = reader.pages[pn - 1]
        lines = (page_obj.extract_text() or "").splitlines()
        page = None
        for l in lines[:5]:
            m = PAGE_RE.search(l)
            if m and is_header(l):
                page = m.group(1)
                break
        page = page or f"pdf{pn}"
        body_started = False
        skip_table = False
        for i, raw in enumerate(lines):
            s = raw.strip()
            if not body_started:
                if i < 5 and (not s or is_header(s)):
                    continue
                body_started = True
            # Şekil 1-1 forma tablosu metin olarak bozuk geliyor; şekil birimleri elle girilir
            if s.startswith("Y e l l o w"):
                flush()
                skip_table = True
            if skip_table:
                if s.startswith("Figure"):
                    skip_table = False
                    add(page, s, "sekil")
                continue
            if not s:
                flush()
                continue
            if re.match(r"^Figure [\dA-C]-\d+", s):
                flush()
                add(page, s, "sekil")
                continue
            if is_section(s) or s in STANDALONE_HEADINGS or "INTENTIONALLY LEFT BLANK" in s:
                flush()
                state["sec"] = s
                add(page, s, "baslik")
                continue
            m = LIST_RE.match(s)
            if m:
                flush()
                state["marker"] = m.group(1)
                s = s[m.end():]
            if state["page"] is None:
                state["page"] = page
            state["buf"].append(s)
        # paragraf sonraki sayfada devam edebilir: sayfa sonunda flush yok

        if img_dir:
            os.makedirs(img_dir, exist_ok=True)
            for k, im in enumerate(page_obj.images):
                ext = (os.path.splitext(im.name)[1] or ".png").lower()
                if ext in (".jpg", ".jpeg", ".png"):
                    with open(os.path.join(img_dir, f"s{page}_{k}{ext}"), "wb") as f:
                        f.write(im.data)
                else:  # .jp2 vb. tarayıcıda açılmaz: PNG'ye çevir
                    im.image.convert("RGB").save(os.path.join(img_dir, f"s{page}_{k}.png"))
    flush()

    counts = {}
    for u in units:
        counts[u["page"]] = counts.get(u["page"], 0) + 1
        u["id"] = f"{u['page']}.{counts[u['page']]:02d}"
    units = [{"id": u["id"], "page": u["page"], "kind": u["kind"], "sec": u["sec"], "text": u["text"]}
             for u in units]
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(units, f, ensure_ascii=False, indent=1)
    kinds = {}
    for u in units:
        kinds[u["kind"]] = kinds.get(u["kind"], 0) + 1
    print(f"{len(units)} birim yazildi -> {out}  {kinds}")


if __name__ == "__main__":
    main()
