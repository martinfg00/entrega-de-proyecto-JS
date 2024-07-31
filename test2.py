import matplotlib.pyplot as plt

intervalos = ['[8 ; 9)', '[9 ; 10)', '[10 ; 11)', '[11 ; 12)']
frecuencias = [2, 13, 9, 2]

plt.figure(figsize=(10, 5))
plt.bar(intervalos, frecuencias, color='blue')
plt.xlabel('Intervalos de tn de CO2 / habitante')
plt.ylabel('Frecuencia')
plt.title('Gráfico de Barras: Frecuencia de tn de CO2 por habitante')
plt.grid(True)
plt.show()

plt.figure(figsize=(8, 8))
plt.pie(frecuencias, labels=intervalos, autopct='%1.1f%%', startangle=140, colors=['red', 'green', 'blue', 'orange'])
plt.title('Gráfico Circular: Distribución de tn de CO2 por habitante')
plt.show()
