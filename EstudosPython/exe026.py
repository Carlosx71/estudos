#-*-coding:utf8;-*-
#qpy:3
#qpy:console

frase = str(input('Digite uma frase: ')).upper().strip()

print(f'Quantidade de "A"(s): {frase.count("A")}')
print(f'"A" aparece na posição: {frase.find("A")}')
print(f'A ultima posição em que "A" aparece: {frase.rfind("A")}')