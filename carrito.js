// Array de menús con nombre y URL
const menus = [
    { nombre: "inicio", url: "index.html" },
    { nombre: "contacto", url: "contacto.html" },
];

// Función para cargar los menús dinámicamente en el HTML
function cargarmenu() {
    let enlaces = document.getElementById("ulmenu");
    for (const menu of menus) {
        let lista = document.createElement("li");
        lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`;
        enlaces.appendChild(lista);
    }
}

cargarmenu();

// Obtiene el carrito almacenado en localStorage, o crea un array vacío si no hay datos
let productocarritos = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para cargar los productos del carrito en la tabla
function cargarCarrito() {
    let enlaces = document.getElementById("tablacarrito");
    enlaces.innerHTML = ""; // Limpia la tabla antes de renderizar

    if (productocarritos.length > 0) {
        // Agrupa productos por ID y suma sus cantidades
        let productosAgrupados = {};

        productocarritos.forEach(producto => {
            producto.cantidad = parseInt(producto.cantidad, 10);
            if (productosAgrupados[producto.id]) {
                productosAgrupados[producto.id].cantidad += producto.cantidad;
            } else {
                productosAgrupados[producto.id] = { ...producto };
            }
        });

        // Agrega productos agrupados a la tabla
        for (const id in productosAgrupados) {
            let producto = productosAgrupados[id];
            let lista = document.createElement("tr");
            lista.id = producto.id;
            lista.innerHTML = `
                <td><img src="${producto.img}" alt="" width="50"></td>
                <td>${producto.cantidad}</td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td>$ ${(producto.cantidad * producto.precio).toFixed(2)}</td>
                <td><button id="btneliminar" onclick="eliminarProducto('${producto.id}')">Eliminar</button></td>
            `;
            enlaces.appendChild(lista);
        }

        // Calcula el total y la cantidad total de productos
        let total = 0;
        let cantidadTotal = 0;

        for (const id in productosAgrupados) {
            let producto = productosAgrupados[id];
            total += producto.cantidad * producto.precio;
            cantidadTotal += producto.cantidad;
        }

        localStorage.setItem("cantidadCarrito", cantidadTotal);

        // Agrega fila para mostrar el total final
        let totalFila = document.createElement("tr");
        totalFila.innerHTML = `
            <td colspan="5" style="text-align: right;">Total Final: $${total.toFixed(2)}</td>
            <td><button onclick="finalizarCompra()">Finalizar Compra</button></td>
        `;
        enlaces.appendChild(totalFila);

        actualizarCarrito(cantidadTotal);
    } else {
        // Si no hay productos, muestra un mensaje
        let mensaje = document.createElement("tr");
        mensaje.innerHTML = "<td colspan='6'>No hay productos en el carrito</td>";
        enlaces.appendChild(mensaje);

        actualizarCarrito(0); // Restablece el contador del carrito
    }
}

cargarCarrito();

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    productocarritos = productocarritos.filter(producto => producto.id !== id); // Filtra el producto a eliminar
    localStorage.setItem("carrito", JSON.stringify(productocarritos)); // Actualiza localStorage
    localStorage.setItem("cantidadCarrito", JSON.stringify(0));

    cargarCarrito(); // Recarga la tabla del carrito
}

// Función para finalizar la compra
function finalizarCompra() {
    alert("Procediendo con la compra.");
}

// Función para actualizar el contador del carrito
function actualizarCarrito(cantidadTotal) {
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = cantidadTotal || 0;
    }
}
