"""Ders bloklarını seslendirilecek metne çevirir (derle.py ve ses_uret.py ortak kullanır).

Akış: blok satırları (markdown) -> düz konuşma metni -> parçalar [(dil, metin)]
  - Tırnak içindeki İngilizce ifadeler ("Roger ball", “Paddles contact.”) İngilizce sesle okunur.
  - Diğer her şey Türkçe sesle okunur; önce birimler okunuşa çevrilir, sonra icerik/telaffuz.tsv uygulanır.
"""
import hashlib
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SES_TR = "tr-TR-AhmetNeural"
SES_EN = "en-US-AndrewMultilingualNeural"
TR_HARF = "çğıöşüÇĞİÖŞÜâîû"

BIRIMLER = [
    (r"(?<=\d)\s*kts\b", " knot"), (r"(?<=\d)\s*KIAS\b", " key ay ey es"), (r"(?<=\d)\s*KCAS\b", " key si ey es"),
    (r"(?<=\d)\s*ft\b", " fit"), (r"(?<=\d)\s*NM\b", " deniz mili"), (r"(?<=\d)\s*lbs?\.?(?=\W|$)", " libre"),
    (r"(?<=\d)\s*LB\b", " libre"), (r"(?<=\d)\s*°", " derece"), (r"(?<=\d)\s*%", " yüzde"),
]
SEMBOLLER = [
    (r"≥\s*", "en az "), (r"≤\s*", "en çok "), (r"\s*→\s*", ", "), (r"\s*←\s*", ", "), (r"\s*↔\s*", " ile "),
    (r"\s+[—–]\s+", ", "), (r"\s*·\s*", ", "), (r"[①-⑳]", lambda m: str(ord(m.group(0)) - 0x245F)),
    (r"(?<=\d)\s*–\s*(?=\d)", " ila "), (r"(?<=\d)-(?=\d)", " tire "), (r"\b3/4\b", "dörtte üç"), (r"\b1/2\b", "yarım"), (r"¾", "dörtte üç"),
    (r"(?<=[A-Za-z" + TR_HARF + r"])\s*/\s*(?=[A-Za-z" + TR_HARF + r"])", ", "), (r"[✓✗◆]", ""),
]


def _lexicon():
    path = os.path.join(ROOT, "icerik", "telaffuz.tsv")
    pairs = []
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            for line in f:
                if line.strip() and not line.startswith("#") and "\t" in line:
                    a, b = line.rstrip("\n").split("\t", 1)
                    pairs.append((a.strip(), b.strip()))
    pairs.sort(key=lambda p: -len(p[0]))
    sinir = r"[\w" + TR_HARF + r"]"
    return [(re.compile(r"(?<!" + sinir + r")" + re.escape(a) + r"(?!" + sinir + r")", re.I), b) for a, b in pairs]


LEXICON = _lexicon()


def _duz(s):
    s = re.sub(r"\s*\(\*[^()]*?\*\)", "", s)                 # (*English gloss*) parantezlerini okuma
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"(?<![\*\w])\*(?!\s)(.+?)(?<!\s)\*(?![\*\w])", r"\1", s)
    s = re.sub(r"\(s\. [^)]*\)", "", s)                        # (s. 1-5) sayfa atıfları
    s = re.sub(r"\((?:\s*[12A-C]-\d+(?:\.[\dF]+)?(?:\.\.[\dA-C.F-]+)?\s*[,;]?)+\)", "", s)  # (2-31.10) birim atıfları
    s = re.sub(r"`", "", s)
    return re.sub(r"\s{2,}", " ", s).strip()


def _cumle(s):
    s = s.strip()
    return s if not s or s[-1] in ".!?:;" else s + "."


def blok_metni(lines, basliklar=()):
    """Bir ders bloğunun markdown satırlarından konuşma metni üretir."""
    out = [_cumle(_duz(re.sub(r"^\d+(\.\d+)*\s*\|\s*", "", h))) for h in basliklar]
    lines = [l.rstrip() for l in lines]
    while lines and not lines[0].strip():
        lines.pop(0)
    if not lines:
        return " ".join(out).strip()
    first = lines[0].strip()
    m = re.match(r"^!(dikkat|not|kaynak|uyari)\s*(.*)$", first)
    if m:
        etiket = {"dikkat": "Dikkat", "not": "Not", "kaynak": "Kaynak notu", "uyari": "Uyarı"}[m.group(1)]
        baslik = _duz(m.group(2))
        if baslik.upper() in ("WARNING", "CAUTION", "NOTE", "NOT", "UYARI", "DİKKAT"):
            baslik = ""
        out.append(_cumle(etiket + (": " + baslik if baslik else "")))
        lines = lines[1:]
    m = re.match(r"^@f\s+\S+\s*\|\s*(.*)$", first)
    if m:
        out.append(_cumle(_duz(re.sub(r"\s*\([A-Za-z ,'/&-]+\)\s*$", "", m.group(1)).replace("—", ":"))))
        lines = lines[1:]
    i = 0
    while i < len(lines):
        s = lines[i].strip()
        if not s or s.startswith("@w ") or s.startswith("@f "):
            i += 1
            continue
        if s.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{2,}:?", c) for c in cells):
                    rows.append([_duz(c) for c in cells])
                i += 1
            if rows:
                head, body = rows[0], rows[1:]
                for r in body:
                    parts = []
                    for j, c in enumerate(r):
                        if not c or c in ("—", "-", "–"):
                            continue
                        h = head[j] if j < len(head) else ""
                        parts.append(c if (j == 0 or not h) else f"{h}: {c}")
                    if parts:
                        out.append(_cumle(parts[0] + (": " + "; ".join(parts[1:]) if len(parts) > 1 else "")))
            continue
        s = re.sub(r"^(- |\d+\. )", "", s)
        out.append(_cumle(_duz(s)))
        i += 1
    return " ".join(x for x in out if x and x != ".").strip()


_TIRNAK = re.compile(r"[\"“]([^\"“”]{1,200})[\"”]")


def _ingilizce_mi(t):
    return (bool(re.search(r"[A-Za-z]{2,}", t)) and not re.search("[" + TR_HARF + "]", t)
            and not re.search(r"\b(ve|ile|bir|bu|için|olarak|veya)\b", t))


def _tr(s):
    for pat, rep in BIRIMLER:
        s = re.sub(pat, rep, s)
    for pat, rep in SEMBOLLER:
        s = re.sub(pat, rep, s)
    for pat, rep in LEXICON:
        s = pat.sub(rep, s)
    # sözlükte olmayan BÜYÜK HARFLİ İngilizce kelimeler: küçük harfe çevir (harf harf okunmasın)
    s = re.sub(r"\b[A-Z]{4,}\b", lambda m: m.group(0).lower(), s)
    return re.sub(r"\s{2,}", " ", s).strip()


def _en(s):
    for pat, rep in [(r"(?<=\d)\s*°", " degrees"), (r"¾", "three quarter"), (r"’", "'")]:
        s = re.sub(pat, rep, s)
    return s.strip()


def parcalar(metin):
    """[(dil, metin), ...] — 'tr' Türkçe anlatım, 'en' tırnak içindeki İngilizce ifade."""
    out, pos = [], 0
    for m in _TIRNAK.finditer(metin):
        if _ingilizce_mi(m.group(1)):
            once = metin[pos:m.start()]
            if once.strip(" ,"):
                out.append(("tr", _tr(once)))
            out.append(("en", _en(m.group(1))))
            pos = m.end()
    kalan = metin[pos:]
    if kalan.strip(" ,.;:"):
        out.append(("tr", _tr(kalan)))
    # art arda aynı dildeki parçaları birleştir; noktalama kırıntılarını at
    birlesik = []
    for dil, t in out:
        t = t.strip()
        if not t or not re.search(r"\w", t):
            continue
        if birlesik and birlesik[-1][0] == dil:
            birlesik[-1] = (dil, birlesik[-1][1] + " " + t)
        else:
            birlesik.append((dil, t))
    return birlesik


def ses_anahtari(parca_listesi):
    h = hashlib.sha1()
    h.update(f"{SES_TR}|{SES_EN}|".encode())
    for dil, t in parca_listesi:
        h.update(f"{dil}:{t}\n".encode())
    return h.hexdigest()[:16]
