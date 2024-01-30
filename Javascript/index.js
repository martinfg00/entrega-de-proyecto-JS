// ---------------------------------------------------------------


const cantidadDivisa = document.querySelector("#valor");
const cotizar = document.querySelector("#cotizar");
const divisaConvertida = document.getElementById("resultado");
const historial1 = document.getElementById("historial1");
const clearHistorial = document.querySelector("#clearHistorial");
const invercambioDeMoneda = document.querySelector("#invercambioDeMoneda");
const cambio = document.querySelector("#cambio");
const cambioDos = document.querySelector("#cambioDos");

const imagenesDivisas = {
    usd: 'assets/img/paises/usa.png',
    eur: 'assets/img/paises/eur.png',
    ars: 'assets/img/paises/ars.png',
    mxn: 'assets/img/paises/mxn.png',
    jpy: 'assets/img/paises/jpy.png',
    brl: 'assets/img/paises/brl.png',
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
                resultado = cantidadDivisa * 819;
                break;
            case "eur":
                resultado = cantidadDivisa * 890;
                break;
            case "ars":
                resultado = cantidadDivisa * 0.001211754;
                break;
            case "mxn":
                resultado = cantidadDivisa * 0.058182204;
                break;
            case "jpy":
                resultado = cantidadDivisa * 0.0067670228;
                break;
            case "brl":
                resultado = cantidadDivisa * 0.20219706;
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
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
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


const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Dolar', 'Euro', 'Ars', 'Mxn', 'Jpy', 'Brl'],
        datasets: [{
            label: 'Ocultar - Mostrar Historial de divisas',
            data: [819, 890, 0.001211754, 0.058182204, 0.0067670228, 0.20219706],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



// ---------------------------------------------------------------