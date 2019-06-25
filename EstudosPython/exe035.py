color = {
    'limpa':'\x1b[m',
    'red':'\x1b[1;31m',
    'azul':'\x1b[1;34m',
    'amarelo':'\x1b[1;33m'
}
#\x1b[1;31m
ret1 = input(f'\033[1;31m1ª reta: ')
ret2 = input(f'{color["azul"]}2ª reta: ')
ret3 = input(f'{color["amarelo"]}3ª reta: ')

if ret1.isnumeric() == True and ret2.isnumeric() == True and ret3.isnumeric() == True:
    print('Todas sao numeros')
    ret1 = float(ret1)
    ret2 = float(ret2)
    ret3 = float(ret3)

    if (ret2 + ret3) > ret1 and (ret2 + ret1) > ret3 and (ret1 + ret3) > ret2:
        print('Certo! E possivel montar um triangulo com essas retas!')
    else:
        print(f'Nao e possivel montar um triangulo com essas retas{color["limpa"]}')
else:
    print('Alguma reta nao e um numero')

#a 5
#b 4
#c 5
#


#4 - 5 < 5 < 4 + 5
#5 - 5 < 4 < 5 + 5
#5 - 4 < 5 < 5 + 4