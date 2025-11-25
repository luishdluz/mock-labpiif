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


/* ========================
   TABS DE FUENTES
======================== */
document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        // quitar active de tabs
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // mostrar panel correspondiente
        const id = tab.dataset.tab;
        document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        document.getElementById(id).classList.add("active");
    });
});


/* ========================
   BUSCADOR
======================== */
document.querySelectorAll(".buscador").forEach(buscador => {
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        const panel = buscador.closest(".tab-panel");

        panel.querySelectorAll(".fuente-item").forEach(item => {
            const nombre = item.querySelector("span").textContent.toLowerCase();
            item.style.display = nombre.includes(texto) ? "flex" : "none";
        });
    });
});



const userMenuBtn = document.getElementById("userMenuBtn");
const userMenu = document.getElementById("userMenu");

userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    userMenu.style.display = userMenu.style.display === "flex" ? "none" : "flex";
});

// Evita que clicks dentro del menú cierren el menú
document.querySelectorAll("#userMenu button").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});

document.addEventListener("click", (e) => {
    if (!userMenu.contains(e.target) && e.target !== userMenuBtn) {
        userMenu.style.display = "none";
    }
});

function irInicio() {
    console.log("Ir a inicio");
    window.location.href = "index.html";
}

function cerrarSesion() {
    console.log("Cerrar sesión");
    alert("Cerrar sesión accionada");
}
