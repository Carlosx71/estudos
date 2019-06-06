#-*-coding:utf8;-*-
#qpy:3
#qpy:console


contador = 0
while contador < 3:
    graus = input("informe a temperatura em °C: ")
    
    if graus.isnumeric() == True:
        conver =  (float(graus) * 9/5) + 32
        print (f'{graus}° equivale a {conver}°')
        contador = 3
    else:
        print('Não é numero, filho da puta')
        print (f'Tentativa {contador + 1}')
        if contador == 1:
            print('Voce so pode ta zoando, desgraçado.')
        else: 
            if contador == 2:
                print ('Voce e um arrombado do caralho analfabeto. Vai tentar mais porra nem uma')
    contador = contador + 1