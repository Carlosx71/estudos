'''#-*-coding:utf8;-*-
#qpy:3
#qpy:console
#200km 0.50 0.45'''
from time import sleep

print('-=-'*14)
km = input('Ola! Por favor, digite a quilometragem: ')

if km.isnumeric() == True:
    km = int(km)
    if km <= 200:
        val = km * 0.50
        print('O valor a pagar e...')
        sleep(3)
        print(f'R$: {val}')
    else:
        val = km * 0.45
        print('Valor a pagar em promoção: ')
        sleep(2)
        print (f'R$: {val}')
else:
    print('Por favor, digite um numero valido')

val = km * 0.50 if km <= 200 else km * 0.45
print(f'Segunda maneira {val}')