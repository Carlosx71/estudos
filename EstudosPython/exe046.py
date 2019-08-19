from time import sleep

color = { 
    'clear':'\033[m',
    'withe':'\033[30m',
    'red':'\033[31m',
    'green':'\033[32m',
    'yellow':'\033[33m',
    'blue':'\033[34m ',
    'pink':'\033[35m',
    'lightBlue':'\033[36m',
    'grey': '\033[37m'   
 
}
 
colorBold = {
    'withe':'\033[1;30m',
    'red':'\033[1;31m',
    'green':'\033[1;32m',
    'yellow':'\033[1;33m',
    'blue':'\033[1;34m',
    'pink':'\033[1;35m',
    'lightBlue':'\033[1;36m',
    'grey':'\033[1;37m'
}

for x in range(10 , 0 , -1):
    sleep(1)
    if x % 2 == 0:
        print(color["blue"],x,color["clear"])
        #print(x)
    else:
        print(color["yellow"],x,color["clear"])
print('-=' * 11 + ' FELIZ ANO NOVO!!! ' + '-=' * 11)