#-*-coding:utf8;-*-
#qpy:3
#qpy:console

ano = input('Digite o ano: ')

ano = int(ano)

anoBi = ano % 4

if anoBi == 0:
    print(f'O ano {ano} e bissexto!')
else:
    print(f'O ano {ano} não é bissexto!')
