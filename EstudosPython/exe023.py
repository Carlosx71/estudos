num = int(input('Digite um numero: '))
uni = num // 1 % 10
dez = num // 10 % 10
cen = num // 100 % 10
mil = num // 1000 % 10

#print(f' Unidade: \t{num[3]}\n Dezena: \t{num[2]}\n Centena: \t{num[1]}\n Milhar: \t{num[0]}')
print(f'Unidade: {uni}')
print(f'Unidade: {dez}')
print(f'Unidade: {cen}')
print(f'Unidade: {mil}')
