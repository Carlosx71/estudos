soma = 0
num = []
for x in range(0 , 500, 3):
    if x % 2 != 0:
        num.append(x)
        soma = soma + x
print('Sao '+ str(len(num)) + ' numeros dando um total de '+ str(soma))        