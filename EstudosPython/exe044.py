valorProd = float(input('Valor do Produto: '))
condPag = int(input('''Escolha uma condicao para pagamento:
[0] Dinheiro / Cheque
[1] Cartao a vista
[2] Cartao parcelado ate 2 vezes
[3] Cartao parcelado 3 vezes ou mais
Opcao: '''))

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

if condPag == 0:
    desc = valorProd - (valorProd * 10 /100)
    print(f'Pagamento com 10% do desconto | {color["blue"]}Valor R$:{desc:.2f}{color["clear"]}')
elif condPag == 1:
    desc = valorProd - (valorProd * 5 /100)
    print(f'Pagamento com 5% do desconto | Valor {color["blue"]}Valor R$:{desc:.2f}{color["clear"]}')
elif condPag == 2:
    print(f'Pagamento sem desconto | Valor {color["blue"]}Valor R$:{valorProd:.2f}{color["clear"]}')
else:
    desc = valorProd + (valorProd * 20 /100)
    print(f'Pagamento com juros de 20% de juros | Valor: {color["blue"]}Valor R$:{desc:.2f}{color["clear"]}')

