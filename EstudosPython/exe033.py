from time import sleep

print('Oi! Siga as instrucoes a baixo, por favor.')
sleep(1.5)
num1 = input('Digite o primeiro numero: ')
num2 = input('Digite o segundo numero: ')
num3 = input('Digite o terceiro numero: ')
sleep(1.5)
print('Certo! Vamos ver qual deles e o maior e qual deles e o menor')
print('Deixe-me ver...')
sleep(2)
print('Man, isso e mais dificil do que parece pra mim...')

if num1.isnumeric() == True and num2.isnumeric() == True and num3.isnumeric():
    print('Ae! Agora todo mundo sao numeros hehehehe')
    sleep(2)
    print('Ok, aqui esta sua resposta!')
    num1 = float(num1)
    num2 = float(num2)
    num3 = float(num3)
    if num1 > num2 and num1 > num3:
        print('O primeiro numero e o maior de todos!')
    else:
        if num2 > num1 and num2 > num3:
            print('O segundo numero e o maior de todos!')
        else:
            if num3 > num1 and num3 > num2:
                print('O terceiro numero e o maior de todos!')
         
    if num1 < num2 and num1 < num3:
        print('O primeiro numero e o menor de todos!')
    else:
        if num2 < num1 and num2 < num3:
            print('O segundo numero e o menor de todos!')
        else:
            if num3 < num1 and num3 < num2:
                print('O terceiro numero e o menor de todos!')
else:
    print('Cara, da uma olhada que algum desses caras ai, nao e um numero')