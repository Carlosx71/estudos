altura = float(input('Altura: '))
peso = float(input('Peso: '))

imc = peso / (altura * altura)

if imc <= 18.5:
    print('Você esta abaixo do peso!!!')
elif imc >= 18.6 and imc <= 25.99:
    print('Você esta com o peso ideal!!!')
elif imc >= 26 and imc <= 30.99:
    print('Você esta com sobrepeso!!!')
elif imc >= 30 and imc <= 40.99:
    print('Você esta com obsidade!!!')
else:
    print('Você esta com obsidade morbida!!!')
print(imc)

