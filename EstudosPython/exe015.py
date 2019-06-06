import math

cont = 0
while cont < 3:
    km = input('kilômetros: ')
    dias = input('Dias: ')

    if km.isnumeric() == True and dias.isnumeric() == True:
        result = ceil((float(km) * 60) + (float(dias) * 0.15))
        print(f'O total a pagar e: {result}' )
        cont = 3
    else:
        cont = cont + 1
        print(f'Nao e um numero seu burro, tenta de novo {cont}') 
