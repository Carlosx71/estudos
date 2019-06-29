import random
import time

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

print(f'{colorBold["yellow"]}|{"=-"*40}|{color["clear"]}')
while cont <= 8:

    listPart.append(str(input(f'{colorBold["blue"]}{cont}º participante: {color["clear"]}')))
    cont = cont + 1
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')    

random.shuffle(listPart)

contVs = 0
contVs2 = 0

print('Jogadores Selecionados')
while contVs < 8:
    contVs = contVs + 1    
    while contVs > contVs2:
        print(f'{color["yellow"]}Jogador {colorBold["grey"]}{listPart[contVs]}{color["clear"]} {color["lightBlue"]}vs{color["clear"]} {color["yellow"]}Jogador {colorBold["grey"]}{listPart[contVs2]}{color["clear"]}') 
        contVs2 = contVs2 + 2    

escolhido1 = random.choice(listPart)
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')  
input(f'{colorBold["pink"]}Vai la! Joguem a proxima rodada...{color["clear"]}')
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')
input(f'Estou torcendo por voce {escolhido1}')  
print('Quem foram os vencedores?')

del(listPart[0:])

contSemi = 0
while contSemi < 4:
    contSemi = contSemi + 1
    listPart.append(str(input(f'{colorBold["grey"]}{contSemi}º Semifinalista: {color["clear"]}')))


random.shuffle(listPart)

contVs3 = 0
contVs4 = 0
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')
print('Proxima Rodada')
while contVs3 < 4:
    contVs3 = contVs3 + 1
    while contVs3 > contVs4:
        print(f'{color["yellow"]}Jogador {colorBold["grey"]}{listPart[contVs3]}{color["clear"]} {color["lightBlue"]}vs{color["clear"]} {color["yellow"]}Jogador {colorBold["grey"]}{listPart[contVs4]}{color["clear"]}')
        contVs4 = contVs4 + 2

listFinal = []
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')
print('Quem foram os vencedores das semifinais?')

listFinal.append(str(input(f'{colorBold["blue"]}1º participante: {color["clear"]}')))
listFinal.append(str(input(f'{colorBold["blue"]}2º participante: {color["clear"]}')))
print(f'Boa sorte {listFinal[0]} e {listFinal[1]}!')
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')

escolhido = random.choice(listFinal)
input(f'{colorBold["green"]} Eu pessoalmente estou torcendo por voce {escolhido}')
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')
vencedor = input(f'{colorBold["blue"]} E ai? Quem ganhou? {color["clear"]}')

print(f' Parabens {color["lightBlue"]}{vencedor}!{color["clear"]} voce e incrivel!!!')
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')
vencNum = input(' Se quer ganhar um premio, digite 1, se nao digite 0: ')

if vencNum.isnumeric():
    vencNum = int(vencNum)
    if vencNum == 1:
        print(' Parabens! Pedi o "organizador" para buscar seu CHOCOLATE')
    elif vencNum == 0:
        print(' Que pena, pedeu o chocolate =/')
else:
    print(' Nao tente me enganar! Por isso, nao vai ganhar um chocolate')

print('Voces sao incriveis! Obrigado por jogar!!!')
print(f'|{colorBold["yellow"]}{"=-"*40}|{color["clear"]}')