let productosCarrito = localStorage.getItem("productos-en-carrito");
productosCarrito = JSON.parse(productosCarrito);

const contCarritoVacio = document.querySelector("#carritoVacio");
const contProdComprado = document.querySelector("#contProdComprado");
const contOpcionLadoIzq=document.querySelector("#opcionLadoIzq");
const contopcionLadoDer=document.querySelector("#opcionLadoDer");
const contCarritoComprado=document.querySelector("#carritoComprado");
const btnLimpiarCarrito = document.querySelector("#btnLimpiarCarrito");
const botonComprar = document.querySelector("#btnComprarCarrito");

function cargarProductosCarrito() {
  if (productosCarrito && productosCarrito.length > 0) {
    contCarritoVacio.classList.add("disabled");
    contProdComprado.classList.remove("disabled");
    contProdComprado.innerHTML = "";

    productosCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("detalleProdComprado");
      div.innerHTML = `
            <img src="${producto.imgPostre}" alt="${producto.nomPostre}">
            <div>
                <p class="tituloTabla">PRODUCTO</p>
                <p>${producto.nomPostre}</p>
            </div>
            <div>
                <p class="tituloTabla">PRECIO</p>
                <p>S/. ${producto.precio.toFixed(2)}</p>
            </div>
            <div>
                <p class="tituloTabla">CANTIDAD</p>
                <p>${producto.cantidad}</p>
            </div>
            <div>
                <p class="tituloTabla">TOTAL</p>
                <p>S/. ${(producto.precio * producto.cantidad).toFixed(2)}</p>
                </div>
            <div">
            <p class="btnEliminar" id="${producto.id}">x</p>
            </div>
            `;
      contProdComprado.append(div);
    });
    actualizarBtnEliminar();
    actualizarTotal();
  } else {
    contCarritoVacio.classList.remove("disabled");
    contProdComprado.classList.add("disabled");
    contOpcionLadoIzq.classList.add("disabled");
    contopcionLadoDer.classList.add("disabled");
    contCarritoComprado.classList.add("disabled");
    total.innerText = `S/. 0.00`;
  }
}

cargarProductosCarrito();

function actualizarBtnEliminar() {
  let btnEliminar = document.querySelectorAll(".btnEliminar");

  btnEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarItemCarrito);
  });
}

function eliminarItemCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosCarrito.findIndex(
    (producto) => producto.id === idBoton
  );

  productosCarrito.splice(index, 1);
  cargarProductosCarrito();
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosCarrito)
  );
}
btnLimpiarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  Swal.fire({
    title: "¿Estás seguro?",
    icon: "question",
    html: `Se van a borrar ${productosCarrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    )} productos.`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      productosCarrito.length = 0;
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosCarrito)
      );
      cargarProductosCarrito();
      total.innerText = `S/. 0.00`;
    }
  });
}

function actualizarTotal() {
  const totalCalculado = productosCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `S/. ${totalCalculado.toFixed(2)}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
 // Obtener los elementos de input y textarea dentro de cont-inputs
 const inputs = document.querySelectorAll('.cont-inputs input, .cont-inputs textarea');

 // Variable para verificar si todos los campos están llenos
 let todosLlenos = true;

 // Verificar si alguno de los campos está vacío
 inputs.forEach(input => {
  if (!input.placeholder.includes('(Opcional)') && input.value.trim() === '') {
      todosLlenos = false;
      input.classList.add('obligatorio'); // Agregar clase para resaltar campo obligatorio

      // Agregar event listener para remover la clase obligatorio cuando se escriba algo
      input.addEventListener('input', function() {
          if (this.value.trim() !== '') {
              this.classList.remove('obligatorio');
          }
      });
  }
});

 // Mostrar mensaje y detener la función si no todos los campos están llenos
 if (!todosLlenos) {
     Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Debes rellenar todos los campos antes de comprar.'
     });
     return; // Detener la función comprarCarrito
 }
  productosCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
    contCarritoVacio.classList.add("disabled");
    contProdComprado.classList.add("disabled");
    contOpcionLadoIzq.classList.add("disabled");
    contopcionLadoDer.classList.add("disabled");
    contCarritoComprado.classList.remove("disabled");

    // Obtener los valores de nombre, apellido y dirección
    const nombre = document.getElementById('input-nombre').value;
    const apellido = document.getElementById('input-apellido').value;
    const direccion = document.getElementById('input-direccion').value;

    // Mostrar mensaje personalizado en el div carritoComprado
    const mensajeCompra = document.getElementById('mensajeCompra');
    mensajeCompra.innerText = `
        Muchas gracias por tu compra.
        Se estará realizando el envío a la dirección indicada:
        ${direccion},
        a nombre de ${nombre} ${apellido}.
    `;
   
    
    inputs.forEach(input => {
      input.value = ''; // Limpiar el valor del campo
      input.classList.remove('obligatorio'); // Remover cualquier clase de resaltado
  });

}