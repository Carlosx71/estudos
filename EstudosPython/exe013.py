#-*-coding:utf8;-*-
#qpy:3
#qpy:console

count = 0
while count < 3:
    
    salario = input('Salario: ')
    porct = input('Aumento: ')

    if salario.isnumeric() == True:
        int_salario = float(salario)
        int_porct = float(porct)
        aumento = (int_salario * int_porct)/100
        salarioAumen = int_salario + aumento
        print(f'Salario com aumento: {salarioAumen}')
        count = 3
    else:
        print('Nao e um numero filho da puta')
        count = count + 1