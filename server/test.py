letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
assentos = 40

ass = []

l = 0
a = 0

while a < assentos / 2:
    for i in range(1, 3):
        ass_nome = f'{letras[l]}{i}'
        print(ass_nome)
        ass.append(ass_nome)

    l += 1
    a += 1

print(ass)
print(len(ass))