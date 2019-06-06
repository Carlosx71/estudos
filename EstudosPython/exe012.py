#-*-coding:utf8;-*-
#qpy:3
#qpy:console

valor = input('Valor do produto: ')

if valor.isnumeric() == True:
    desc = (float(valor) * 5) / 100
    result = float(valor) - desc
    print(f'Valor com desconto de 5% {result}')
else:
    print('Nao e um numero')