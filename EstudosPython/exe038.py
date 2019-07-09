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
 

num1 = input(f'{color["blue"]}1º Número: {color["clear"]}')
num2 = input(f'{color["blue"]}2º Número: {color["clear"]}')

if num1.isnumeric() == True and num2.isnumeric():
    if num1 > num2:
        print(f'{color["grey"]}O primeiro valor {num1} é maior do que o segundo valor {num2}{color["clear"]}')
    elif num1 < num2:
        print(f'{color["pink"]}O segundo valor {num2} é maior do que o primeiro valor {num1}{color["clear"]}')
    else:
        print(f'{color["yellow"]}O primeiro {num1} e o segundo valor {num2} são iguais{color["clear"]}')
else:
    print('Algum dos valores não é um número')