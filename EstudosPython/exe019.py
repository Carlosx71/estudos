import random

aluno1 = str(input('Aluno 1: '))
aluno2 = str(input('Aluno 2: '))
aluno3 = str(input('Aluno 3: '))
aluno4 = str(input('Aluno 4: '))

lista = [aluno1, aluno2, aluno3, aluno4]
#num = random.randint(1, 15)
escolhido = random.choice(lista)
print(f'O aluno escolhido foi {escolhido}')