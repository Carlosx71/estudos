from time import sleep
print('-=' * 50)
print('Vamos aumentar o seu salario, mas precisamos que digite o valor dele, para calcularmos o aumento')
sleep(2)

sal = input('Digite o seu salario: ')

if sal.isnumeric() == True:
    sal = float(sal)
    if sal > 1250:
        salAum = (sal * 10 /100) + sal
    else:
        salAum = (sal * 15 /100) + sal
else:
    print('Cara, nao e um numero')
print(f'Seu salario com aumento e {salAum}')
