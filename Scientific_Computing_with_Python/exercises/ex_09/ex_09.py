fname = input('Enter File: ')
if len(fname) < 1 : fname = 'clown.txt'
hand = open(fname)

dic = dict()
for line in hand:
    line = line.rstrip()
    # print(line)
    wds = line.split()
    # print(wds)
    for w in wds:
        # print('**', w, dic.get(w,-99))
        # another bad way 
        # oldcount = dic.get(w, 0)
        # if the key is not there the count is zero
        # print(w, 'old', oldcount)
        # newcount = oldcount + 1
        # dic[w] = newcount

        # best way to do it
        dic[w] = dic.get(w, 0) + 1
        print(w, 'new', dic[w])


        # better way above
        # if w in dic :
            # dic[w] = dic[w] + 1
        # else :
            # dic[w] = 1
            # print('**NEW**')
        # print(w, dic[w])

print(dic)

# now we want to find the most common word
largest = -1
theword = None
for key,value in dic.items() :
    # print(key, value)
    if value > largest :
        largest = value
        theword = key #capture & remember the word that was the largest

print('Largest value is:', largest, 'for the word:', theword)