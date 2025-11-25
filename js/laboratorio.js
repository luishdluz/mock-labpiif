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
/*document.getElementById("btnAgregarCodigo").addEventListener("click", () => {

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
});*/


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




function irInicio() {
    console.log("Ir a inicio");
    window.location.href = "index.html";
}

function cerrarSesion() {
    console.log("Cerrar sesión");
    alert("Cerrar sesión accionada");
}


document.addEventListener("click", function (e) {
    const isMenuBtn = e.target.classList.contains("menu-btn");

    // Cerrar todos los menús
    document.querySelectorAll(".menu-opciones").forEach(m => m.style.display = "none");

    if (isMenuBtn) {
        const opciones = e.target.nextElementSibling;
        opciones.style.display = "flex";  // mostrar menú de esa fuente
        e.stopPropagation();
    }
});


let celdaActiva = null;

  // Selección de celda
  document.querySelectorAll('#notebook-scroll .celda').forEach(celda => {
    celda.addEventListener('click', () => {
      if(celdaActiva) celdaActiva.classList.remove('celda-activa');
      celdaActiva = celda;
      celdaActiva.classList.add('celda-activa');
    });
  });

  // Ejecutar celda activa
  document.querySelector('.btn-play-global').addEventListener('click', () => {
    if(!celdaActiva) {
      console.log('Selecciona una celda para ejecutar.');
      return;
    }
    const resultado = celdaActiva.querySelector('.resultado');
    if(resultado) resultado.style.display = 'block';
  });


  function agregarCeldaCodigo() {
  const notebook = document.getElementById('notebook-scroll');
  const totalCeldasCodigo = notebook.querySelectorAll('.celda-codigo').length;
  const nuevaId = totalCeldasCodigo + 1;

  const celda = document.createElement('div');
  celda.classList.add('celda', 'celda-codigo');
  celda.dataset.celda = nuevaId;

  const editorDiv = document.createElement('div');
  editorDiv.classList.add('editor');
  editorDiv.id = `editor-${nuevaId}`;
  editorDiv.style.height = '150px';
  editorDiv.style.border = '1px solid #ccc';
  editorDiv.style.borderRadius = '6px';

  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('resultado');
  resultadoDiv.style.display = 'none';
  resultadoDiv.innerText = 'Resultado aparecerá aquí';

  celda.appendChild(editorDiv);
  celda.appendChild(resultadoDiv);
  notebook.appendChild(celda);

  // Inicializar Monaco
  require(['vs/editor/editor.main'], function () {
    const nuevoEditor = monaco.editor.create(editorDiv, {
      value: `# Código por default: Hola Mundo\nprint("Hola mundo")`,
      language: 'python',
      theme: 'vs-light',
      automaticLayout: true,
      minimap: { enabled: false }
    });

    // Evento para marcar celda activa
    celda.addEventListener('click', () => {
      document.querySelectorAll('.celda').forEach(c => c.classList.remove('celda-activa'));
      celda.classList.add('celda-activa');
      // Guardar referencia del editor activo
      window.editorActivo = nuevoEditor;
      window.resultadoActivo = resultadoDiv;
    });
  });
}

// Botón global ejecutar
document.querySelector('.btn-play-global').addEventListener('click', () => {
  if (window.editorActivo && window.resultadoActivo) {
    const codigo = window.editorActivo.getValue();
    window.resultadoActivo.style.display = 'block';
    window.resultadoActivo.innerText = 'Resultado simulado:\n' + codigo;
  } else {
    console.log('Selecciona una celda para ejecutar');
  }
});

document.getElementById('btnAgregarCodigo').addEventListener('click', agregarCeldaCodigo);



// Función para agregar celda de texto
function agregarCeldaTexto() {
  const notebook = document.getElementById('notebook-scroll');

  const celda = document.createElement('div');
  celda.classList.add('celda', 'celda-texto');
  
  // Contenido editable
  const p = document.createElement('p');
  p.innerText = 'Haz clic aquí para editar esta celda de texto...';
  p.contentEditable = 'true'; // Permite editar
  p.style.minHeight = '50px';
  
  celda.appendChild(p);
  notebook.appendChild(celda);

  // Evento para marcar celda activa
  celda.addEventListener('click', () => {
    document.querySelectorAll('.celda').forEach(c => c.classList.remove('celda-activa'));
    celda.classList.add('celda-activa');

    // Limpiar editor activo si se selecciona celda de texto
    window.editorActivo = null;
    window.resultadoActivo = null;
  });
}

// Inicializar celdas de texto existentes para ser editables
document.querySelectorAll('.celda:not(.celda-codigo)').forEach(celda => {
  const p = celda.querySelector('p');
  if (p) p.contentEditable = 'true';

  celda.addEventListener('click', () => {
    document.querySelectorAll('.celda').forEach(c => c.classList.remove('celda-activa'));
    celda.classList.add('celda-activa');

    // Limpiar editor activo si se selecciona celda de texto
    window.editorActivo = null;
    window.resultadoActivo = null;
  });
});

// Conectar botón de agregar texto
document.getElementById('btnAgregarTexto').addEventListener('click', agregarCeldaTexto);
