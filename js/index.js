const menu = parseInt(prompt("Buen dia a continuacion le presentamos nuestro programa coloque: 1) Para conversor de divisas 2) Para calculadora corriente ... Cualquier otro numero para salir!"))

let continuar = true


switch (menu) {
    case 1:
        let cantidadDivisa = parseInt(prompt("Ingrese una cantidad: "))
        let elegirMoneda = prompt("Desea convertir dolares o euros?").toLowerCase
        let dolares = 360
        let euros = 390
        
        function conversor(cantidadDivisa, elegirMoneda) {
        if (elegirMoneda === dolares){
            return (console.log(cantidadDivisa / dolares));
        } else if (elegirMoneda === euros){
            return (console.log(cantidadDivisa / euros));
        } else {
            return
            }
        }
        conversor()
        break;

    case 2:
        while (continuar) {
        let multiplicar = parseInt(prompt("Ingrese numero a multiplicar del 1 al 10: "))
        for (let numeros = 1; numeros <=10; numeros++){
            let resultado = numeros*multiplicar
            console.log(multiplicar + "x" +numeros+ ": "+ resultado);
        }
        let confirmacion = prompt("Desea hacer otro calculo?").toLocaleLowerCase
        if (confirmacion == "no") {
            continuar = false
            console.log("Gracias por usar nuestra calculadora");
            break
        }
    }
}



