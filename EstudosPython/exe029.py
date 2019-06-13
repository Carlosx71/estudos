from time import sleep

vel = input('Velocidade: ')

if vel.isnumeric() == True:
    vel = int(vel)
    if vel > 80:
        print('Voce foi multado!')
        print('Agora se fudeu e vai ter que pagar...')
        sleep(1)
        print('Verificando quanto voce deve, seu fudido...')
        sleep(3)
        print('Ta bom nao, viu?')
        sleep(3)
        if vel >= 81 and vel <= 85:
            print('Se fudeu por causa de tao pouquinho kkkkkkkk')
            sleep(3)
            print('Aqui e o governo! A gente ta pra te ferrar kkkkkk')
            sleep(3)
        print(f'Voce deve isso ai, trouxa: R$:{vel * 7.00}')
    else:
        print('Deu sorte! Ta devendo nada nao')

else:
    print('Quilometragem incorreta!')