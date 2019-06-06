import math

catOp = float(input('Digite o cateto oposto: '))
catAd = float(input('Digite o cateto adjacente: '))

result = math.hypot(catOp, catAd)

print(f'Resultado: {result:.2f}')
