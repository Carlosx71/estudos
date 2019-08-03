nota1 = input('Nota 1: ')
nota2 = input('Nota 2: ')

if nota1.isnumeric() == True and nota2.isnumeric() == True:
    nota1 = float(nota1)
    nota2 = float(nota2)
    media = (nota1 + nota2) / 2

    if media <= 5:
        print('Sinto muito, você foi reprovado!!!')
    elif media > 5 and media <= 6.9:
        print('Recuperação! Ainda ha esperança')
    else:
        print('Parabéns! Você passou e não se fudeu!') 
else:
    print('Alguama das notas não é um numero')