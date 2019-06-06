from math import radians, sin, cos, tan

angulo = float(input('Digite o angulo: '))
sen = sin(radians(angulo))
cos = cos(radians(angulo))
tan = tan(radians(angulo))

print(f'O angulo de {angulo} tem o SENO de {sen:.2f}')
print(f'O angulo de {angulo} tem o COSSENO de {cos:.2f}')
print(f'O angulo de {angulo} tem o TANGENTE de {tan:.2f}')
gg