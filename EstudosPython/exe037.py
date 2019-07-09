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


num = input(f'{colorBold["blue"]}Digite um número para conversão: {color["clear"]}')
if num.isnumeric() == True:
    num = int(num)
    print(f'''Escolha uma opção!
    {color["yellow"]}[1] Conversão para binário {color["clear"]}
    {color["red"]}[2] Conversão para hexdecimal {color["clear"]}
    {color["lightBlue"]}[3] Conversão para octagonal {color["clear"]}
    ''')
    opcao = int(input('Digite a opção desejada: '))
    if opcao == 1:
        binNum = bin(num)
        print(f'O número {num} equivale a {binNum[2:]} em binário')
    elif opcao == 2:
        decNum = hex(num)
        print(f'O número {num} equivale a {decNum[2:]} em hexadecimal')
    elif opcao == 3:
        octNum = oct(num)
        print(f'O número {num} equivale a {octNum[2:]} em octagonal')
else:
    print('Não é um número!!!')