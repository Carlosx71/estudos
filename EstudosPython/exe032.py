#-*-coding:utf8;-*-
#qpy:3
#qpy:console
from datetime import date

ano = input('Digite o ano: ')

ano = int(ano)

if ano == 0:
    ano = date.today().year

if ano % 4 == 0 and ano % 100 != 0 or ano % 400 == 0:
    print(f'O ano {ano} e bissexto!')
else:
    print(f'O ano {ano} não é bissexto!')

print(f'Curiosidade {date.today()}')