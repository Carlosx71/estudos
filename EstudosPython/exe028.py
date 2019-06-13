import random
from time import sleep

print('-=-' * 20)
print('Vou pensar em um numero entre 0 e 5... Tente advinhar')
print('-=-' * 20)

num = input('Em que numero eu pensei? ')
print(f'Procesando...', end='')
sleep(2)

if num.isnumeric() == True:
    num = int(num)
    numRandom = random.randint(0,5)

    if num >= 0 and num <= 5:
        if num == numRandom:
            print(f'Parabens voce acertou! O numero do computador e: {numRandom}')
        else:
            print(f'HUM... VOCE PERDEU O NUMERO E: {numRandom}')
    else:
        print('O numero nao esta entre 0 e 5')
else:
    print('Nao e um numero')