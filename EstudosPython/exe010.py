dinheiro = input('Quanto de dinheiro voce tem? ')

while dinheiro.isnumeric() == False:
    print('Nao e um numero, seu corno')
    dinheiro = input('Quanto de dinheiro voce tem? ')


if dinheiro.isnumeric() == True:
    dolar = int(dinheiro) / 4.02
    print(f'Voce tem exatos {dolar: .2} dolar(es)')
else:
    print('Nao e um numero')