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

vlCasa = input(f'{colorBold["withe"]}Insira o valor da casa R$: {color["clear"]}')
salario = input(f'{colorBold["green"]}Insira o valor do salario R$: {color["clear"]}')
qtAnos = input(f'{colorBold["blue"]}Insira a sua quantidade de anos R$: {color["clear"]}')

if vlCasa.isnumeric() == True and salario.isnumeric() == True and qtAnos.isnumeric():
    print(f'{color["lightBlue"]}Beleza, so tem numeros{color["clear"]}')
    porSal = float(salario) * 30 / 100
    parcela = float(vlCasa) / (float(qtAnos) * 12)
    if parcela <= porSal:
        print(f'{color["blue"]}Aprovado! O valor da parcela e de {color["yellow"]}{parcela:.2f}{color["blue"]} e os 30% do seu salario e {colorBold["pink"]}{porSal:.2f}{color["clear"]}')
    else:
        print(f'{color["red"]}Cara nao vai rolar, 30% do seu salario e de {color["pink"]}{porSal:.2f}{color["red"]} as parcelas sao do valor de {color["yellow"]}{parcela:.2f}{color["clear"]}')
else:
    print(f'{color["red"]}Somente numeros sao aceitos, por favor, revise{color["clear"]}')
