// Array que contiene los elementos del menú con su nombre y URL
const menus = [
    {nombre: "inicio", url: "index.html"}, // Página de inicio
    {nombre: "contacto", url: "contacto.html"}, // Página de contacto
];

// Función para cargar el menú dinámicamente en el DOM
function cargarmenu() {
    let enlaces = document.getElementById("ulmenu"); // Obtiene la lista del menú por su ID
    for (const menu of menus) {
        let lista = document.createElement("li"); // Crea un nuevo elemento de lista
        lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`; // Añade un enlace con el nombre y URL del menú
        enlaces.appendChild(lista); // Agrega el elemento al DOM
    }
}

cargarmenu(); // Llama a la función para cargar el menú

// Recupera el detalle del producto guardado en localStorage
let productodetalle = JSON.parse(localStorage.getItem("detalleproducto"));

// Función para cargar un producto específico en el DOM
function cargarproducto() {
    let enlaces = document.getElementById("boxproducto"); // Obtiene el contenedor del producto por su ID
    let lista = document.createElement("div"); // Crea un nuevo contenedor
    lista.innerHTML = `
        <h3>${productodetalle.nombre}</h3><br> <!-- Nombre del producto -->
        <img src=${productodetalle.img} alt=""><br> <!-- Imagen del producto -->
        <p>$ ${productodetalle.precio}</p><br> <!-- Precio del producto -->
        <div class="botonescontador"><br> <!-- Contador de productos -->
            <button onclick="sumar()">+</button> <!-- Botón para sumar -->
            <p id="contarproducto">0</p> <!-- Contador inicial -->
            <button onclick="restar()">-</button> <!-- Botón para restar -->
        </div><br>
        <button onclick="cargarcarrito()">Agregar al carrito</button> <!-- Botón para agregar al carrito -->
    `;
    enlaces.appendChild(lista); // Agrega el contenedor al DOM
}

cargarproducto(); // Llama a la función para mostrar el producto

// Variable para llevar la cuenta de la cantidad de productos
let contador = 0;

// Función para incrementar el contador
function sumar() {
    contador = contador + 1; // Incrementa el contador
    document.getElementById("contarproducto").innerHTML = contador; // Actualiza el valor en el DOM
}

// Función para decrementar el contador
function restar() {
    if (contador > 0) { // Solo decrece si el contador es mayor a 0
        contador = contador - 1;
        document.getElementById("contarproducto").innerHTML = contador; // Actualiza el valor en el DOM
    }
}

// Función para agregar el producto al carrito
function cargarcarrito() {
    if (contador === 0) { // Si no se selecciona una cantidad, muestra un mensaje de alerta
        alert("Por favor, ingrese la cantidad de productos deseados");
    } else {
        let carrito = JSON.parse(localStorage.getItem("carrito")); // Recupera el carrito de localStorage

        if (carrito === null) {
            carrito = []; // Si el carrito no existe, lo inicializa como un array vacío
        }

        // Obtiene los detalles del producto seleccionado
        cantidadproducto = parseInt(document.getElementById("contarproducto").innerHTML);
        productonuevo = {
            id: productodetalle.id, // ID del producto
            nombre: productodetalle.nombre, // Nombre del producto
            cantidad: cantidadproducto, // Cantidad seleccionada
            precio: productodetalle.precio, // Precio del producto
            img: productodetalle.img // Imagen del producto
        };

        carrito.push(productonuevo); // Agrega el producto al carrito
        const enJSON = JSON.stringify(carrito); // Convierte el carrito a JSON
        localStorage.setItem("carrito", enJSON); // Guarda el carrito en localStorage
        window.location.href = "carrito.html"; // Redirige a la página del carrito
    }
}



function actualizarCarrito() {
    // Recuperar la cantidad desde localStorage
    let cantidadTotal = parseInt(localStorage.getItem("cantidadCarrito"), 10) || 0;

    // Actualizar el contador en el ícono del carrito
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = cantidadTotal;
    }
}

window.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
});
