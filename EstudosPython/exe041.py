import datetime

year = datetime.datetime.now().year

anoNas = input('Ano de nascimento: ')

cont = True
cont1 = 0
while cont == True:
    anoNas = int(anoNas)
    if anoNas.isnumeric() == True:

        if anoNas < 1920:
            cal = year - anoNas
            if cal <= 9:
                print('Categoria Mirim')
                cont = False
            elif cal >= 10 and cal <= 14:
                print('Categoria Infantil')
                cont = False
            elif cal >= 15 and cal <= 19:
                print('Categoria Junior')
                cont = False
            elif cal == 20:
                print('Categoria Sênior')
                cont = False
            else:
                print('Categoria Master')
                cont = False
        else:
            print(f'{anoNas - 1}')
            print('Data Invalida1')
    else:
        print('Data invalida2')