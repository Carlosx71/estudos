frase = 'Curso em Video Python'

#Exibe na posicao do vetor
print(frase[9])

#Exibe da posicao 9 ate a 12
print(frase[9:13])

#Exibe da posicao 9 ate a 20 conta de 2 em 2 posicoes
print(frase[9:21:2])

#Exibe da posicao inicial (0) ate a posicao 5
print(frase[:5])

#Exibe da posicao 15 ate a posicao final do vetor
print(frase[15:])

#Exibe da posicao 9 ate o final do vetor de 3 em 3
print(frase[9::3])

############### Funcoes ###############

#len() conta qual e o tamanho do vetor /retorna numero
print(len(frase))

#count() conta quantos cararecteries tem informado na funcao /retorna numero
#count('o',0,13)Existe a variacao na passagem de parameto em que se pode passar o caracterie o inicio da posicao do vetor e o final a ser pecorrido /retorna numero
print(frase.count('o'))
print(frase.count('o',0,13))

#find() procura no vetor a string especificada, e diz aonde ela iniciar no vetor. Caso nao exista a palavra, ira retornar -1 / retorna numero
print(frase.find('deo'))

#in procura dentro do array se existe a string expecificada.
print('Curso' in frase)

#replace() subistitui a string passada no primeiro parametro pelo segundo.
print(frase.replace('Python','Android'))

#uppper() transforma a string toda em maiuscula
print(frase.upper())

#lower() transforma a string toda em minuscula
print(frase.lower())

#capitalize() somente os caracteries no inicio da palavra irao ficar em minusculo
print(frase.capitalize()) 

#title() somente os caracteries no inicio da palavra irao ficar em maisculo
print(frase.title())

#strip() elimina os espacos no inicio e no fim do vetor
frase1 = '   Curso em Video Python   '
print(frase1.strip())

#rstrip() elimina os espacos no fim do vetor
print(frase1.rstrip())

#lstrip() elimina os espacos no inicio do vetor
print(frase1.lstrip())

#split() faz um vetor com caracteries diante de cada espaco
#split('o') faz um vetor com caracteries dividindo a partir do parametro 'o'
print(frase.split())
print(frase.split('o'))

#'-'.join() junta todos elementos da string com o separador especificado
print('-'.join(frase))