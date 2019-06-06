#-*-coding:utf8;-*-
#qpy:3
#qpy:console

num1 = input('Digite a primeira nota: ')
num2 = input('Digite a segunda nota: ')
if num1.isnumeric() == True and num2.isnumeric() == True:
    float_num = float(num1)
    float_num2 = float(num2)
    soma = (float_num + float_num2) / 2
    print(f'{soma}')
