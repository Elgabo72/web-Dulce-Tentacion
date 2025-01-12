let productos = [];

fetch("js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  });

const contProductos = document.querySelector("#cont-productos");
let botonesAgregar = document.querySelectorAll(".btnComprar");
const contador = document.querySelector("#contadorCarritoCompras");
let btnMenu = document.querySelectorAll("#btnCerrarMenu");

function cargarProductos(productosElegidos) {
  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("cardsPostres");
    div.innerHTML = `
                  <div class="detallePostres">
                      <div class="detalleTop">
                          <p class="nomPostre">${producto.nomPostre}</p>
                          <textarea class="descripPostre" disabled>${
                            producto.descripcion
                          }</textarea>
                      </div>
                      <div class="detalleBottom">
                          <p class="precio">S/. ${producto.precio.toFixed(
                            2
                          )}</p>
                          <button id="${
                            producto.id
                          }" class="btnComprar">COMPRAR</button>
                      </div>
                  </div>
                  <img src="${producto.imgPostre}" alt="${
      producto.nomPostre
    }" />
      `;
    contProductos.append(div);
  });
  actualizarBtnAgregar();
}

function actualizarBtnAgregar() {
  botonesAgregar = document.querySelectorAll(".btnComprar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosCarrito;

let productosCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosCarritoLS) {
  productosCarrito = JSON.parse(productosCarritoLS);
  actualizarContador();
} else {
  productosCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }
  actualizarContador();
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosCarrito)
  );
}

function actualizarContador() {
  let nuevoContador = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  contador.innerText = nuevoContador;
}


