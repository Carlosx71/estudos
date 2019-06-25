import random

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

cont = 1

listPart = []

while cont <= 8:

    listPart.append(str(input(f'{colorBold["blue"]}{cont}º participante: {color["clear"]}')))
    cont = cont + 1

print("\n")
random.shuffle(listPart)

contVs = 0
contVs2 = 0
contT = 0

while contVs < 4:
    if contVs % 2:
        print(f'{color["yellow"]}Jogador {listPart[contVs]} {contVs} vs Jogador {listPart[contVs2]} {contVs2}{color["clear"] }a')
        contVs = contVs + 1
        contVs2 = contVs2 + 2
    else:
        print(f'{color["green"]}Jogador {listPart[contVs2]} {contVs} vs Jogador {listPart[contVs]} {contVs2}{color["clear"]}v')
        contVs = contVs + 1
        contVs2 = contVs2 + 2
    contT = contT + 1
    print(contT)

print(listPart)

#198.153.194.1