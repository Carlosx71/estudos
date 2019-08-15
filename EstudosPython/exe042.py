color = { 
    'clear':'\033[m',
    'withe':'\033[30m',
    'red':'\033[31m',
    'green':'\033[32m',
    'yellow':'\033[33m',
    'blue':'\033[34m ',
    'pink':'\033[35m',
    'lightBlue':'\033[36m',
    'grey': '\033[37m'   

}

colorBold = {
    'withe':'\033[1;30m',
    'red':'\033[1;31m',
    'green':'\033[1;32m',
    'yellow':'\033[1;33m',
    'blue':'\033[1;34m',
    'pink':'\033[1;35m',
    'lightBlue':'\033[1;36m',
    'grey':'\033[1;37m'
}

r1 = float(input(f'{colorBold["blue"]}Primeiro Segmento: {color["clear"]}'))
r2 = float(input(f'{colorBold["blue"]}Segundo Segmento: {color["clear"]}'))
r3 = float(input(f'{colorBold["blue"]}Terceiro Segmento: {color["clear"]}'))

if r1 < r2 + r3 and r2 < r1 + r3 and r3 < r1 + r2:
    if r1 == r2 == r3:
        print(f'{colorBold["green"]}Equilatero{color["clear"]}')
    elif r1 != r2 != r3 != r1:
        print(f'{colorBold["pink"]}Escaleno{color["clear"]}')
    else:
        print(f'{colorBold["lightBlue"]}Isosceles{color["clear"]}')
else:
    print(f'{colorBold["red"]}Os segmentos acima NAO PODEM FORMAR um triangulo{color["clear"]}')