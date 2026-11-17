// 1. Leer el carrito guardado (o empezar vacío)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 2. Agregar un producto
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad++;          // ya estaba: sumo una unidad
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio,
                   imagen: producto.imagen, cantidad: 1 });
  }
  guardarCarrito();
  renderizarCarrito();
}

// 3. Cambiar cantidad (+1 o -1); si llega a 0, se quita
function cambiarCantidad(id, cambio) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad += cambio;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(i => i.id !== id);
  }
  guardarCarrito();
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
}

// 4. Dibujar el panel, el total y el contador
function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("total-carrito");
  const contador = document.getElementById("contador-carrito");

  const unidades = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  if (contador) contador.textContent = unidades;
  if (totalEl) totalEl.textContent = "$" + total.toLocaleString("es-AR");
  if (!lista) return;

  if (carrito.length === 0) {
    lista.innerHTML = "<li class='carrito-vacio'>Tu carrito está vacío</li>";
    return;
  }

  lista.innerHTML = carrito.map(item => `
    <li class="item-carrito">
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="item-datos">
        <h4>${item.nombre}</h4>
        <p>$${(item.precio * item.cantidad).toLocaleString("es-AR")}</p>
        <div class="item-cantidad">
          <button data-accion="restar" data-id="${item.id}">−</button>
          <span>${item.cantidad}</span>
          <button data-accion="sumar" data-id="${item.id}">+</button>
        </div>
      </div>
    </li>
  `).join("");
}

// 5. Abrir y cerrar el panel
const panel = document.getElementById("panel-carrito");
const overlay = document.getElementById("overlay-carrito");

function abrirPanel()  { panel.classList.add("abierto");    overlay.classList.add("visible"); }
function cerrarPanel() { panel.classList.remove("abierto"); overlay.classList.remove("visible"); }

document.getElementById("abrir-carrito").addEventListener("click", abrirPanel);
document.getElementById("cerrar-carrito").addEventListener("click", cerrarPanel);
overlay.addEventListener("click", cerrarPanel);
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

// 6. Escuchar todos los clics (delegación de eventos)
document.addEventListener("click", function (e) {
  // Botón "AGREGAR AL CARRITO" de las tarjetas
  const botonAgregar = e.target.closest(".card-button");
  if (botonAgregar) {
    agregarAlCarrito(Number(botonAgregar.dataset.id));
    abrirPanel();   // opcional: borrá esta línea si no querés que se abra solo
    return;
  }

  // Botones + y − dentro del carrito
  const botonCantidad = e.target.closest("[data-accion]");
  if (botonCantidad) {
    const id = Number(botonCantidad.dataset.id);
    cambiarCantidad(id, botonCantidad.dataset.accion === "sumar" ? 1 : -1);
  }
});

// 7. Al cargar la página, mostrar lo que ya había guardado
renderizarCarrito();