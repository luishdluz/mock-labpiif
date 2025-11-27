document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    // Activar el botón actual
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');

    // Mostrar contenido
    const tab = btn.dataset.tab;

    document.querySelectorAll('.contenido-tab').forEach(c => c.classList.remove('visible'));
    document.getElementById(tab).classList.add('visible');
  });
});


// ========== TABS ==========
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const id = tab.dataset.tab;
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  });
});


function activarBuscador(inputId, gridId) {
  const input = document.getElementById(inputId);
  const grid = document.getElementById(gridId);

  input.addEventListener("input", () => {
    const texto = input.value.toLowerCase();

    grid.querySelectorAll(".card-proyecto").forEach(card => {
      const nombre = card.dataset.nombre.toLowerCase();
      card.style.display = nombre.includes(texto) ? "block" : "none";
    });
  });
}

activarBuscador("buscar-personales", "grid-personales");
activarBuscador("buscar-compartidos", "grid-compartidos");

document.querySelectorAll(".card-proyecto").forEach(card => {
  card.addEventListener("dblclick", () => {
    window.location.href = "laboratorio.html";
  });
});


function toggleMenu(event) {
  event.stopPropagation();

  // Encuentra SIEMPRE el contenedor del botón
  const contenedor = event.target.closest(".menu-boton-contenedor");

  if (!contenedor) return;

  const menu = contenedor.querySelector(".menu-opciones");

  if (!menu) return;

  // Cierra todos los demás
  document.querySelectorAll(".menu-opciones").forEach(m => {
    if (m !== menu) m.style.display = "none";
  });

  // Alterna el actual
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Cerrar cuando se hace clic fuera
document.addEventListener("click", () => {
  document.querySelectorAll(".menu-opciones").forEach(m => m.style.display = "none");
});

// --------------------------------------------------
// Menú flotante: mover/crear menú en <body> y posicionarlo
// --------------------------------------------------
function toggleMenuFloating(event) {
  event.stopPropagation();
  const btn = event.currentTarget;
  const card = btn.closest('.card-proyecto');

  // Cerrar cualquier menú flotante ya abierto (si no es el mismo)
  const open = document.querySelector('.menu-opciones-floating');
  if (open) {
    // Si ya está abierto para este mismo botón: ciérralo
    if (open._ownerBtn === btn) {
      open.remove();
      return;
    }
    open.remove();
  }

  // Construir menú (puedes personalizar botones aquí)
  const menu = document.createElement('div');
  menu.className = 'menu-opciones menu-opciones-floating';
  menu.innerHTML = `
    <button data-action="editar">Editar</button>
    <button data-action="compartir">Compartir</button>
    <button data-action="eliminar">Eliminar</button>
  `;

  // Marca referencia al botón que lo abrió (para toggling)
  menu._ownerBtn = btn;

  // Añadir handler para las acciones del menú
  menu.addEventListener('click', function(e){
    e.stopPropagation();
    const accion = e.target.getAttribute('data-action');
    if (!accion) return;
    // Obtener info del card si necesitas
    const tarjeta = btn.closest('.card-proyecto');
    const nombre = tarjeta?.dataset?.nombre || null;

    // Ejemplos de acciones (personaliza según tu app)
    if (accion === 'editar') {
      console.log('Editar', nombre);
      // abrir modal / editar...
    } else if (accion === 'compartir') {
      console.log('Compartir', nombre);
      // lógica compartir...
    } else if (accion === 'eliminar') {
      console.log('Eliminar', nombre);
      // lógica eliminar...
    }

    // cerrar menú tras acción
    menu.remove();
  });

  // Append al body (flotante fuera del card)
  document.body.appendChild(menu);

  // Posicionar: usar rects del botón y del menu
  // Inicialmente oculto para medir
  menu.style.visibility = 'hidden';
  menu.style.display = 'block'; // necesita estar en flow para medir

  // Calcular posición
  const btnRect = btn.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();

  // Queremos que el menú aparezca abajo-alineado a la derecha del botón por defecto
  let top = btnRect.bottom + 6; // 6px margen
  let left = btnRect.right - menuRect.width; // alinear la derecha del menu con la del botón

  // Evitar que salga fuera de la pantalla a la izquierda
  if (left < 8) left = 8;
  // Evitar que salga por debajo de la ventana (si no cabe debajo, mostrar arriba)
  if (top + menuRect.height > window.innerHeight - 8) {
    top = btnRect.top - menuRect.height - 6;
  }

  menu.style.position = 'fixed';
  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
  menu.style.visibility = 'visible';

  // Cerrar al hacer clic fuera
  function onDocClick() {
    menu.remove();
    document.removeEventListener('click', onDocClick);
    window.removeEventListener('resize', onWindowChange);
    window.removeEventListener('scroll', onWindowChange, true);
  }
  document.addEventListener('click', onDocClick);

  // Reposicionar o cerrar si se hace scroll/resize
  function onWindowChange() {
    // Si el botón ya no está en el DOM, cerrar
    if (!document.body.contains(btn)) {
      menu.remove();
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('resize', onWindowChange);
      window.removeEventListener('scroll', onWindowChange, true);
      return;
    }
    // Recalcular posición (si quieres)
    const br = btn.getBoundingClientRect();
    const mr = menu.getBoundingClientRect();
    let ntop = br.bottom + 6;
    let nleft = br.right - mr.width;
    if (nleft < 8) nleft = 8;
    if (ntop + mr.height > window.innerHeight - 8) {
      ntop = br.top - mr.height - 6;
    }
    menu.style.top = `${ntop}px`;
    menu.style.left = `${nleft}px`;
  }
  window.addEventListener('resize', onWindowChange);
  window.addEventListener('scroll', onWindowChange, true);
}

// enganchar botones (delegación si se crean dinámicamente)
document.addEventListener('click', function(e){
  const btn = e.target.closest('.btn-menu');
  if (btn) {
    toggleMenuFloating.call(btn, e);
  }
});


const menu = document.getElementById("menu-flotante");

document.addEventListener("click", (e) => {
  // Si clic en un botón hamburguesa
  if (e.target.classList.contains("btn-menu-card")) {

    const rect = e.target.getBoundingClientRect();

    // Posicionarlo a la derecha del botón
    menu.style.top = rect.top + "px";
    menu.style.left = rect.right - 180 + "px";

    // Mostrar menú
    menu.style.display = "block";

    return;
  }

  // Si clic fuera del menú → cerrar
  if (!menu.contains(e.target)) {
    menu.style.display = "none";
  }
});

