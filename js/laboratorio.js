// === Menú hamburguesa ===
const btnHamb = document.querySelector(".btn-hamburguesa");
const panelFuentes = document.querySelector(".panel-fuentes");



// === Ejecución simulada de celdas de código ===
document.addEventListener("click", function(e) {

    if (e.target.classList.contains("btn-play")) {
        const celda = e.target.closest(".celda-codigo");
        const resultado = celda.querySelector(".resultado");

        // Simulación: solo muestra/oculta el resultado
        resultado.style.display = resultado.style.display === "none" ? "block" : "none";
    }

});



btnHamb.addEventListener("click", () => {
    panelFuentes.classList.toggle("abierto");
});


// --- Agregar texto ---
document.getElementById("btnAgregarTexto").addEventListener("click", () => {
    const celda = document.createElement("div");
    celda.className = "celda";
    celda.innerHTML = `
        <textarea class="textarea-texto" placeholder="Ingresa texto aquí"></textarea>
    `;
    document.querySelector(".notebook-celdas").appendChild(celda);
});


// --- Agregar código ---
document.getElementById("btnAgregarCodigo").addEventListener("click", () => {

    const celda = document.createElement("div");
    celda.className = "celda";

    // Agregamos primero TODO el HTML
    celda.innerHTML = `
        <div class="codigo" contenteditable="true">print("Hola mundo")</div>
        <button class="btn btn-play">▶ Ejecutar</button>
        <div class="resultado" style="display:none;"></div>
    `;

    // Solo después de agregar el HTML, ahora sí podemos seleccionarlo
    const btnPlay = celda.querySelector(".btn-play");
    const resultado = celda.querySelector(".resultado");
    const codigoDiv = celda.querySelector(".codigo");

    // Evento ejecutar
    btnPlay.addEventListener("click", () => {
        let codigo = codigoDiv.innerText;

        // Simulación de ejecución
        resultado.style.display = "block";
        resultado.textContent = "Resultado simulado:\n> " +
            codigo.replace("print(", "").replace(")", "");
    });

    // Insertar celda al notebook
    document.querySelector(".notebook-celdas").appendChild(celda);
});


