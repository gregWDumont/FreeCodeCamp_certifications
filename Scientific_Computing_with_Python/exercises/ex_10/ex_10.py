fname = input('Enter File: ')
if len(fname) < 1 : fname = 'clown.txt'
hand = open(fname)

dic = dict()
for line in hand:
    line = line.rstrip()
    wds = line.split()
    for w in wds:
        dic[w] = dic.get(w, 0) + 1

# print(dic)

tmp = list()
for k,v in dic.items():
    # print(k,v)
    newt = (v,k)
    tmp.append(newt)
# print('Flipped:',tmp)

tmp = sorted(tmp, reverse=True)
# print('Sorted top 5:', tmp[:5])

for v,k in tmp[:5]:
    print(k,v)