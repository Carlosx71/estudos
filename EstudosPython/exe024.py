#-*-coding:utf8;-*-
#qpy:3
#qpy:console

cidade = str(input('Digite a cidade: ')).strip()

#print('Tem S na sua cidade?')
#print('s' in cidade)

cidadeList = cidade.split(' ')
cidadeList[0] = cidadeList[0].upper()

print(cidadeList)
print('SANTOS' in cidadeList[0])