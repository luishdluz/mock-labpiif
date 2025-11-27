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


function agregarCeldaCodigo(contenido = null) {
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
      value: contenido || `# Código por default: Hola Mundo\nprint("Hola mundo")`,
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

// Delegación de eventos para escuchar clics en las opciones "Usar"
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("usar")) {

        // Encontrar el contenedor .fuente-item más cercano
        const fuenteItem = e.target.closest(".fuente-item");

        // Obtener el identificador de la fuente
        const idFuente = fuenteItem.getAttribute("identificador");

        // Código base con sustitución de id_fuente
        const codigo = 
`from repositorioBanxico import consultarFuente

try:
    respuesta = consultarFuente('${idFuente}')

    if not respuesta:
        print("No se obtuvo información.")
    else:
        print("JSON recibido:", respuesta)

except Exception as e:
    print("Ocurrió un error al consultar la fuente:", str(e))`;

        // Insertar la celda de código (usa tu función actual)
        agregarCeldaCodigo(codigo);
    }
});


document.querySelector('.btn-eliminar-global').addEventListener('click', () => {
    const celdaActiva = document.querySelector('.celda.celda-activa');
    if (!celdaActiva) {
        alert("Selecciona una celda para eliminar.");
        return;
    }

    // Si es celda de código y es el editor activo, limpiarlo
    if (celdaActiva.classList.contains('celda-codigo')) {
        if (window.editorActivo) window.editorActivo = null;
        if (window.resultadoActivo) window.resultadoActivo = null;
    }

    celdaActiva.remove();
});


document.addEventListener("click", function(event) {
    // Verifica que el clic sea en un botón con clase .eliminar
    if (event.target.classList.contains("eliminar")) {
        
        // Encuentra el contenedor .fuente-item correspondiente
        const fuente = event.target.closest(".fuente-item");
        
        if (fuente) {
            fuente.remove(); // Elimina el elemento completo
        }
    }
});


document.addEventListener("click", function(event) {
    // Detectar clic en la opción usarArchivo
    if (event.target.classList.contains("usarArchivo")) {

        // Obtener la fuente relacionada
        const fuente = event.target.closest(".fuente-item");

        if (!fuente) return;

        const archivo = fuente.getAttribute("archivo");
        const extension = fuente.getAttribute("extension");

        // Crear el código personalizado
        const codigo = 
`from repositorioLocalBanxico import leerArchivo

df = leerArchivo("${archivo}", "${extension}")
print(df.head())`;

        // Agregar la celda usando tu misma función
        agregarCeldaCodigo(codigo);
    }
});



/*Modal*/

// Fuente de datos (INSTITUCIONALES DE EJEMPLO)
const catalogoFuentes = [
  {
    nombre: "Operaciones de Préstamo",
    descripcion: "Costo promedio ponderado de préstamos concertados"
  },
  {
    nombre: "Operaciones de Reporto",
    descripcion: "Volumen, contrapartes, tasas y plazos"
  },
  {
    nombre: "Derivados cambiarios",
    descripcion: "Volumen operado, tipo de contrato y vencimiento"
  }
];

// Función para generar UUID (simple y rápido)
function generarUUID() {
  return crypto.randomUUID();
}

// Abrir Modal
document.getElementById("agregarFuenteInstitucional").addEventListener("click", () => {
  const cuerpoTabla = document.querySelector("#tablaFuentes tbody");
  cuerpoTabla.innerHTML = "";

  catalogoFuentes.forEach(fuente => {
    const uuid = generarUUID();

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${fuente.nombre}</td>
      <td>${fuente.descripcion}</td>
      <td><button class="usar-fuente-catalogo" data-uuid="${uuid}" data-nombre="${fuente.nombre}" data-descripcion="${fuente.descripcion}">Usar</button></td>
    `;

    cuerpoTabla.appendChild(fila);
  });

  document.getElementById("modalFuentes").style.display = "flex";
});

// Cerrar Modal
document.getElementById("cerrarModalFuentes").addEventListener("click", () => {
  document.getElementById("modalFuentes").style.display = "none";
});


document.addEventListener("click", function(event) {

  if (event.target.classList.contains("usar-fuente-catalogo")) {

    const uuid = event.target.dataset.uuid;
    const nombre = event.target.dataset.nombre;
    const descripcion = event.target.dataset.descripcion;

    // 🔥 Ajustado para usar la clase fuentesInstitucionales
    const contenedor = document.querySelector(".fuentesInstitucionales");

    const div = document.createElement("div");
    div.classList.add("fuente-item");
    div.setAttribute("identificador", uuid);

    div.innerHTML = `
      <img src="img/info.png" class="fuente-icono" alt="icono">
      <span class="fuente-nombre">${nombre}: ${descripcion}</span>

      <div class="fuente-menu">
        <button class="menu-btn">☰</button>
        <div class="menu-opciones">
          <button class="opcion usar">Usar</button>
          <button class="opcion eliminar">Remover</button>
        </div>
      </div>
    `;

    contenedor.appendChild(div);

    // Cerrar modal
    document.getElementById("modalFuentes").style.display = "none";
  }

});



document.getElementById("agregarFuenteLocal").addEventListener("click", () => {
  document.getElementById("modalArchivo").classList.remove("oculto");
});


document.getElementById("btnCancelarArchivo").addEventListener("click", () => {
  document.getElementById("modalArchivo").classList.add("oculto");
});


document.getElementById("btnAgregarArchivo").addEventListener("click", () => {
  const nombreManual = document.getElementById("nombreArchivoManual").value.trim();
  const archivoInput = document.getElementById("archivoLocal");

  if (!archivoInput.files.length) {
    alert("Selecciona un archivo.");
    return;
  }

  const archivo = archivoInput.files[0];
  const nombreReal = archivo.name.split('.').slice(0, -1).join('.');
  const extension = archivo.name.split('.').pop();

  const nombreFinal = nombreManual || nombreReal;

  // Buscar contenedor correcto
  const contenedor = document.querySelector(".fuentesLocales");
  if (!contenedor) {
    console.error("No existe el contenedor .fuentesLocales");
    return;
  }

  // Crear nodo fuente-item
  const div = document.createElement("div");
  div.classList.add("fuente-item");
  div.setAttribute("archivo", nombreReal);
  div.setAttribute("extension", extension);

  div.innerHTML = `
      <img src="img/document.png" class="fuente-icono" alt="icono">
      <span class="fuente-nombre">${nombreFinal}</span>
      <div class="fuente-menu">
          <button class="menu-btn">☰</button>
          <div class="menu-opciones">
              <button class="opcion usarArchivo">Usar</button>
              <button class="opcion eliminar">Remover</button>
          </div>
      </div>
  `;

  contenedor.appendChild(div);

  // Volver a enganchar eventos
  enlazarEventosFuente(div);

  // Cerrar modal
  document.getElementById("modalArchivo").classList.add("oculto");

  // Reset inputs
  document.getElementById("nombreArchivoManual").value = "";
  document.getElementById("archivoLocal").value = "";
});



function enlazarEventosFuente(fuenteItem) {

  const btnEliminar = fuenteItem.querySelector(".opcion.eliminar");
  const btnUsarArchivo = fuenteItem.querySelector(".opcion.usarArchivo");

  if (btnEliminar) {
    btnEliminar.addEventListener("click", () => {
      fuenteItem.remove();
    });
  }

  if (btnUsarArchivo) {
    btnUsarArchivo.addEventListener("click", () => {
      const archivo = fuenteItem.getAttribute("archivo");
      const ext = fuenteItem.getAttribute("extension");

      agregarCeldaCodigoPersonalizado(`
from repositorioLocalBanxico import leerArchivo

df = leerArchivo("${archivo}", "${ext}")
print(df.head())
      `);
    });
  }
}
