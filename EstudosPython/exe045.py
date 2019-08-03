from random import choice
from time import sleep

escape = True

while escape:
    op = int(input('''Escolha uma opcao:
[1] Pedra
[2] Papel
[3] Tesoura
[4] Sair
Opcao: '''))
    opMaquina = ['Pedra', 'Papel', 'Tesoura']
    escolhido = choice(opMaquina)
    sleep(0.5)
    print('...')
    print('Maquina: Eu vou acabar com voce!!!')
    sleep(1)
    print('Jo')
    sleep(1)
    print('ken')
    sleep(0.5)
    print('Po!!!')
    sleep(2)
    print('\n')
    
    if op == 1:
        if 'Pedra' == escolhido:
            print(f'{opMaquina[0]} vs {escolhido}')
            print('Empate!!')
        elif 'Tesoura' == escolhido:
            print(f'{opMaquina[0]} vs {escolhido}')
            print('Jogador Venceu!!')
        elif 'Papel' == escolhido:
            print(f'{opMaquina[0]} vs {escolhido}')
            print('Maquina Venceu!!')            
    elif op == 2:
        if 'Papel' == escolhido:
            print(f'{opMaquina[1]} vs {escolhido}')
            print('Empate!!')
        elif 'Pedra' == escolhido:
            print(f'{opMaquina[1]} vs {escolhido}')
            print('Jogador Venceu!!')
        elif 'Tesoura' == escolhido:
            print(f'{opMaquina[1]} vs {escolhido}')
            print('Maquina Venceu!!')
    elif op == 3:
        if 'Tesoura' == escolhido:
            print(f'{opMaquina[2]} vs {escolhido}')
            print('Empate!!')
        elif 'Papel' == escolhido:
            print(f'{opMaquina[2]} vs {escolhido}')
            print('Jogador Venceu!!')
        elif 'Pedra' == escolhido:
            print(f'{opMaquina[2]} vs {escolhido}')
            print('Maquina Venceu!!')
    elif op == 4:
        escape = False
    
    print('\n')
    