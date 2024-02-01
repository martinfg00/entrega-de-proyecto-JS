// ---------------------------------------------------------------


const cantidadDivisa = document.querySelector("#valor");
const cotizar = document.querySelector("#cotizar");
const divisaConvertida = document.getElementById("resultado");
const historial1 = document.getElementById("historial1");
const clearHistorial = document.querySelector("#clearHistorial");
const invercambioDeMoneda = document.querySelector("#invercambioDeMoneda");
const cambio = document.querySelector("#cambio");
const cambioDos = document.querySelector("#cambioDos");
const actualizacionDeDivisas = document.querySelector("#actualizacionDeDivisas")

const imagenesDivisas = {
    usd: 'assets/img/paises/usa.png',
    eur: 'assets/img/paises/eur.png',
    ars: 'assets/img/paises/ars.png',
    mxn: 'assets/img/paises/mxn.png',
    jpy: 'assets/img/paises/jpy.png',
    brl: 'assets/img/paises/brl.png',
    clp: 'assets/img/paises/clp.png',
    uyu: 'assets/img/paises/uyu.png',
};


// ---------------------------------------------------------------


invercambioDeMoneda.addEventListener("click", () => {
    const valorActualCambio = cambio.value;
    cambio.value = cambioDos.value;
    cambioDos.value = valorActualCambio;
});

cotizar.addEventListener("click", () => {
    const cantidad = parseFloat(cantidadDivisa.value) || 0;
    localStorage.setItem("cantidad", cantidad);

    const selectorDivisas = document.getElementById("cambio");
    const selectorDivisasDos = document.getElementById("cambioDos");
    const divisaElegida = selectorDivisas.value;
    const divisaElegidaDos = selectorDivisasDos.value;
    conversor(cantidad, divisaElegida, divisaElegidaDos);
});



// ---------------------------------------------------------------


function denegarSimbolos() {
    let valor = cantidadDivisa.value;
    valor = valor.replace(/[^0-9]/g, '');
    cantidadDivisa.value = valor;
}
cantidadDivisa.addEventListener('input', denegarSimbolos);
cantidadDivisa.addEventListener('paste', denegarSimbolos);


// ---------------------------------------------------------------


function conversor(cantidadDivisa, divisaElegida, divisaElegidaDos) {
    let resultado;
    if (!isNaN(cantidadDivisa)) {
        switch (divisaElegida) {
            case "usd":
                resultado = cantidadDivisa * 806;
                break;
            case "eur":
                resultado = cantidadDivisa * 898;
                break;
            case "ars":
                resultado = cantidadDivisa * 0.001211754;
                break;
            case "mxn":
                resultado = cantidadDivisa * 17.09;
                break;
            case "jpy":
                resultado = cantidadDivisa * 146.37;
                break;
            case "brl":
                resultado = cantidadDivisa * 4.91;
                break;
            case "clp":
                resultado = cantidadDivisa * 88.58;
                break;
            case "uyu":
                resultado = cantidadDivisa * 39.11;
                break;
            default:
                divisaConvertida.innerHTML = `<span class="input-group-text btn btn-danger">Moneda no válida.</span>`;
                return;
        }
        const imagenDivisaElegida = imagenesDivisas[divisaElegida];
        const imagenDivisaElegidaDos = imagenesDivisas[divisaElegidaDos];
        const imgDivisaElegida = `<img src="${imagenDivisaElegida}" alt="${divisaElegida}" width="50">`;
        const imgDivisaElegidaDos = `<img src="${imagenDivisaElegidaDos}" alt="${divisaElegidaDos}" width="50">`;
        divisaConvertida.innerHTML = `<span class="input-group-text btn btn-success">Convertidos: $${cantidadDivisa} ${divisaElegida} ${imgDivisaElegida} a $${resultado.toFixed(2)} ${divisaElegidaDos} ${imgDivisaElegidaDos}</span>`;
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} Hora: ${today.getHours()}:${today.getMinutes()}`;
        const nuevoHistorial = document.createElement('div');
        nuevoHistorial.innerHTML = `<li class="list-group-item h4">La divisa fue de: $${cantidadDivisa} en la moneda ${divisaElegida} ${imgDivisaElegida}  Resultado: $${resultado.toFixed(2)} ${divisaElegidaDos} ${imgDivisaElegidaDos} <span class="btn btn-info"> Fecha de conversión: ${formattedDate}</span></li>`;
        if (historial1.children.length >= 5) {
            historial1.removeChild(historial1.children[0]);
        }
        historial1.appendChild(nuevoHistorial);
    }
}



// ---------------------------------------------------------------



clearHistorial.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro que quieres eliminar el historial?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Sí",
        denyButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            historial1.innerHTML = "";
            localStorage.removeItem("cantidad");
            Swal.fire("El historial se borró correctamente", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Decidiste mantener el historial", "", "info");
        }
    });
});



// ---------------------------------------------------------------


fetch("https://dolarapi.com/v1/cotizaciones/")
    .then(response => response.json())
    .then(data => {
        const divisasActualizadas = {
            usd: data["0"],
            eur: data["1"],
            brl: data["2"],
            clp: data["3"],
            uyu: data["4"],
        }
        actualizacionDeDivisas.innerHTML = `<li class="h1 d-flex justify-content-center p-3 btn btn-warning">Compra y venta</li>
                                            <table class="table">
                                                <tbody class="p-3">
                                                    <tr>
                                                        <th class="p-3 mb-2 bg-secondary text-white" scope="row">Dolar</th>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Compra: ${divisasActualizadas.usd.compra}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Venta: ${divisasActualizadas.usd.venta}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Ultima actualizacion: ${divisasActualizadas.usd.fechaActualizacion}</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="p-3 mb-2 bg-secondary text-white" scope="row">Euro</th>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Compra: ${divisasActualizadas.eur.compra}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Venta: ${divisasActualizadas.eur.venta}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Ultima actualizacion: ${divisasActualizadas.eur.fechaActualizacion}</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="p-3 mb-2 bg-secondary text-white" scope="row">Real Brasileño</th>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Compra: ${divisasActualizadas.brl.compra}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Venta: ${divisasActualizadas.brl.venta}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Ultima actualizacion: ${divisasActualizadas.brl.fechaActualizacion}</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="p-3 mb-2 bg-secondary text-white" scope="row">Peso Chileno</th>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Compra: ${divisasActualizadas.clp.compra}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Venta: ${divisasActualizadas.clp.venta}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Ultima actualizacion: ${divisasActualizadas.clp.fechaActualizacion}</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="p-3 mb-2 bg-secondary text-white" scope="row">Peso Uruguayo</th>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Compra: ${divisasActualizadas.uyu.compra}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Venta: ${divisasActualizadas.uyu.venta}</td>
                                                        <td class="p-3 mb-2 bg-secondary text-white">Ultima actualizacion: ${divisasActualizadas.uyu.fechaActualizacion}</td>
                                                    </tr>
                                                </tbody>
                                            </table>`
    })
    .catch(error => {
        console.error('Error al obtener la tasa de cambio:', error);
    });

