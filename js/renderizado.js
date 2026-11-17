function renderizarProductos(lista, idContenedor, claseCard) {
  const contenedor = document.getElementById(idContenedor);

  if (!contenedor) {
    console.log("No encontré el contenedor:", idContenedor);
    return;
  }

  contenedor.innerHTML = lista.map(function (producto) {
    return `
      <article class="${claseCard}">
        <div class="img-card">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="card-info">
          <h3 class="card-title">${producto.nombre}</h3>
          <p class="card-price">$${producto.precio.toLocaleString("es-AR")}</p>
          <button class="card-button" data-id="${producto.id}">AGREGAR AL CARRITO</button>
        </div>
      </article>
    `;
  }).join("");
}

renderizarProductos(productos.filter(p => p.coleccion === "spring").slice(0, 4), "contenedor-spring", "product-card-spring");
renderizarProductos(productos.filter(p => p.categoria === "men").slice(0, 4), "contenedor-men", "product-card");
renderizarProductos(productos.filter(p => p.categoria === "women").slice(0, 4), "contenedor-women", "product-card");
renderizarProductos(productos.filter(p => p.categoria === "accessories").slice(0, 4), "contenedor-accessories", "product-card");