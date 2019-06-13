#-*-coding:utf8;-*-
#qpy:3
#qpy:console

nome = str(input('Digite seu nome completo: ')).strip()

nomeList = nome.split()
print(f'Primeiro nome: {nomeList[0]}')
print(f'Ultimo nome: {nomeList[len(nomeList) - 1]}')