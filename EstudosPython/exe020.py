import random

aluno1 = str(input('Digite o nome do primeiro aluno: '))
aluno2 = str(input('Digite o nome do segundo aluno: '))
aluno3 = str(input('Digite o nome do terceiro aluno: '))
aluno4 = str(input('Digite o nome do quarto aluno: '))

listaAlunos = [aluno1, aluno2, aluno3, aluno4]
random.shuffle(listaAlunos)
print(f'Primeiro Aluno: {listaAlunos[0]}')
print(f'Segundo Aluno: {listaAlunos[1]}')
print(f'Terceiro Aluno: {listaAlunos[2]}')
print(f'Quarto Aluno: {listaAlunos[3]}')