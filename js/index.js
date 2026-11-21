// 1. Dibujar las tarjetas trending (con tus clases del index)
function renderizarTrending(lista, idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) {
    console.log("No encontré el contenedor:", idContenedor);
    return;
  }

  contenedor.innerHTML = lista.map(function (producto) {
    return `
      <a href="productos.html#${producto.categoria}" class="product-card">
        <div class="img-container">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="product-info">
          <h3>${producto.nombre.toUpperCase()}</h3>
          <p class="price">$${producto.precio.toLocaleString("es-AR")}</p>
        </div>
         <button class="card-button" data-id="${producto.id}">AGREGAR AL CARRITO</button>
        <div class="card-info">
        </div>
      </a>
    `;
  }).join("");
}

const trending = productos.filter(p => p.trending);
renderizarTrending(trending, "trending");

// 2. Scroll horizontal con las flechas
const track = document.getElementById("trending");
const flechaPrev = document.getElementById("flecha-prev");
const flechaNext = document.getElementById("flecha-next");

function desplazar(direccion) {
  const tarjeta = track.querySelector(".product-card");
  if (!tarjeta) return;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const paso = tarjeta.offsetWidth + gap;   // ancho de una tarjeta + el espacio entre ellas
  track.scrollBy({ left: direccion * paso, behavior: "smooth" });
}

flechaPrev.addEventListener("click", () => desplazar(-1));
flechaNext.addEventListener("click", () => desplazar(1));
