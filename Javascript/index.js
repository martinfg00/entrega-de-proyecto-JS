const cantidadDivisa = document.querySelector("#valor");
const historial1 = document.getElementById("1");
const usd = document.querySelector("#uno");
const eur = document.querySelector("#dos");
const cotizar = document.querySelector("#cotizador");
const divisaConvertida = document.getElementById("remplazar");
const historial = [];

cotizar.addEventListener("click", () => {
    const cantidad = parseFloat(localStorage.getItem("cantidad")) || 0; 
    let divisaActual;

    if (usd.checked || eur.checked) {
        divisaActual = usd.checked ? "usd" : "eur";
        conversor(parseFloat(cantidad), usd.checked, eur.checked, divisaActual);
    }
});

function conversor(cantidadDivisa, usd, eur, divisaEleguida) {
    let resultado;
    if (!isNaN(cantidadDivisa)) {
        switch (divisaEleguida) {
            case "usd":
                if (usd) {
                    resultado = cantidadDivisa * 819;
                    divisaConvertida.innerHTML = `<span class="input-group-text btn btn-success">Pesos convertidos: $${resultado} ${divisaEleguida}</span>`;
                }
                break;
            case "eur":
                if (eur) {
                    resultado = cantidadDivisa * 890;
                    divisaConvertida.innerHTML = `<span class="input-group-text btn btn-success">Pesos convertidos: €${resultado} ${divisaEleguida}</span>`;
                }
                break;
            default:
                divisaConvertida.innerText = `Moneda no válida.`;
                break;
        }
        historial.push({ cantidadDivisa, divisaEleguida, resultado });
        historial1.innerText = `La divisa fue de: $${cantidadDivisa} en la moneda: ${divisaEleguida} Resultado: $${resultado} ${divisaEleguida}`;
    } 
}


