#-*-coding:utf8;-*-
#qpy:3
#qpy:console

num = input('Digite um numero: ')
if num.isnumeric() == True:
    contador = 0
    while contador < 11:
        result = float(num) * contador
        print(f'{num} x {contador} = {result}')
        contador = contador + 1
else:
    print('Nao e um numero')