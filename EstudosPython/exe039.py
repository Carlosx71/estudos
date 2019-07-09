import datetime

year = datetime.datetime.now().year
anoNas = input('Digite o seu ano de nascimento: ')

if anoNas.isnumeric() == True:
    anoNas = int(anoNas)
    idade = year - anoNas
    if anoNas > 1800 and anoNas < year:
        if idade < 18:
            print(f'Você tem {idade} anos, ainda vai se alistar')
        elif idade == 18:
            print(f'Você tem {idade} anos, necessário se alistar')
        else:
            print(f'Você tem {idade} anos, o tempo de alistamento passou')
    else:
        print(f'Cara, da uma olhada nessa data ai, não é possivel que você nasceu em {idade} e quer se alistar')

else:
    print('O ano esta incorreto')