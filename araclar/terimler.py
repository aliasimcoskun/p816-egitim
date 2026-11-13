import json, re
def terms(root):
    d = json.load(open(root + '/kaynak/ekA_birimler.json', encoding='utf-8'))
    out = []
    for u in d[1:]:
        t = u['text']
        m = re.match(r'^([A-Z][^:]{0,70}):', t)
        if u['id'] == 'A-4.16':
            m = re.match(r'^(Landing Signals Officer \(LSO\))\.', t)
        if m and not t.startswith('(') :
            out.append([m.group(1).strip(), [u['id']]])
        else:
            out[-1][1].append(u['id'])
    return out
if __name__ == '__main__':
    import sys
    for h, ids in terms(sys.argv[1]):
        print(h, '->', ids)
    print(len(terms(sys.argv[1])))
