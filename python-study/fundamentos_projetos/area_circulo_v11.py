#!/usr/bin/python3
from math import pi
import sys


def circulo(raio):
    return pi*float(raio)**2


if __name__ == '__main__':
    if len(sys.argv) < 2:
        # String com múltiplas linhas
        # print("""\
        #     É necessário informar o raio do círculo.
        #     Sintaxe: area_circulo <raio>""")
        print("É necessário informar o raio do círculo.")
        print("Sintaxe: area_circulo <raio>")
    else:
        raio = sys.argv[1]
        area = circulo(raio)
        print('Área do círculo', area)
