metro = input('Digite a metragem: ')
if metro.isnumeric() == True:
    int_metro = int(metro)
    centimetros = int_metro * 100
    milimetros = int_metro * 1000
    print(f'metros: {int_metro} \tcentimetros: {centimetros} \t milimetros: {milimetros}')
else:
    print('Não é um numero')