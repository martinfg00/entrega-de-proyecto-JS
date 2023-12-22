let menu = parseInt(prompt("\n1) Para conversor de divisas\n2) Ver historial\n3) Para salir!"));
const historial = [];
let dolares = 804;
let euros = 887;

class Operacion {
    constructor(operacion, mensaje) {
        this.operacion = operacion;
        this.mensaje = mensaje;
    }
}

function verHistorialFiltrado() {
    let filtroMoneda = prompt("Ingrese el tipo de operación que desea ver (dolares o euros):").toLowerCase();
    let mensaje = "";

    historial.forEach((el) => {
        if (el.operacion.toLowerCase() === filtroMoneda) {
            mensaje = mensaje + el.mensaje + "\n";
        }
    });

    if (mensaje === "") {
        alert(`No hay operaciones registradas para ${filtroMoneda}.`);
    } else {
        alert(mensaje);
    }
}

while (menu != 3) {
    switch (menu) {
        case 1:
            let cantidadDivisa = parseInt(prompt("Ingrese una cantidad: "));
            let elegirMoneda = prompt("Desea convertir dolares o euros?").toLowerCase();

            function conversor(cantidadDivisa, elegirMoneda) {
                let resultado;
                if (elegirMoneda === "dolares") {
                    resultado = cantidadDivisa / dolares;
                    console.log("Tus pesos serian: $" + resultado + " dolares.");
                } else if (elegirMoneda === "euros") {
                    resultado = cantidadDivisa / euros;
                    console.log("Tus pesos serian: $" + resultado + " euros.");
                } else {
                    console.log("Moneda no valida.");
                }
                const historialNew = new Operacion(elegirMoneda, `\n-La divisa fue de: $${cantidadDivisa} en la moneda: ${elegirMoneda} \n- Resultado: $${resultado} ${elegirMoneda}`)
                historial.push(historialNew)
            }
            conversor(cantidadDivisa, elegirMoneda);
            break;

        case 2:
            verHistorialFiltrado();
            break;
    }
    menu = parseInt(prompt("\n1) Para conversor de divisas\n2) Ver historial\n 3) Para salir!"));
}


