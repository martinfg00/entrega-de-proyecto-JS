import matplotlib.pyplot as plt
import numpy as np

def recta1(x):
    return (1/3)*x - 2

def recta2(x):
    return -3*x + 4

def recta3(x):
    return 2*x + 4

x = np.linspace(-10, 10, 400)

plt.figure(figsize=(10, 6))

plt.plot(x, recta1(x), label='Recta 1: y = 1/3x - 2')
plt.plot(x, recta2(x), label='Recta 2: y = -3x + 4')
plt.plot(x, recta3(x), label='Recta 3: y = 2x + 4')

plt.title('Representación gráfica de las tres rectas')
plt.xlabel('Eje X')
plt.ylabel('Eje Y')
plt.axhline(0, color='black',linewidth=0.5)
plt.axvline(0, color='black',linewidth=0.5)
plt.grid(color = 'gray', linestyle = '--', linewidth = 0.5)
plt.legend()
plt.show()
