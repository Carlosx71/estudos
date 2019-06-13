num = input('Digite um numero: ')
if num.isnumeric() == True:
    num = int(num)
    restDiv = num % 2
    if restDiv == 1:
        print(f'O numero {num} e impar')
    else:
        print(f'O nuume {num} e par')
else:
    print('Nao e um numero')