# Definición de la función
def suma_n_primeros_numeros(n):
    suma = 0
    for i in range(1, n+1):
        suma += i
    return suma

# Ejemplo de uso de la función
resultado = suma_n_primeros_numeros(5)
print("La suma de los primeros 5 números naturales es:", resultado)