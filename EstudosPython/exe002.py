#-*-coding:utf8;-*-
#qpy:3
#qpy:console

num = input("Digite um numero: ")
if num.isnumeric() == True:
    int_num = int(num)
    numNe = int_num - 1
    numPo = int_num + 1
    print('Antecessor: {}, atual: {}, sucessor: {}' .format(numNe,num,numPo))
else:
    print('Nao e um numero')
