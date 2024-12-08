// Array de menús, cada uno con un nombre y una URL
const menus = [
    {nombre: "inicio", url: "index.html"}, // Menú de inicio
    {nombre: "contacto", url: "contacto.html"} // Menú de contacto
];

// Función para cargar los menús dinámicamente
function cargarmenu() {
    let enlaces = document.getElementById("ulmenu"); // Obtiene el elemento <ul> con id "ulmenu"
    if (!enlaces) {
        console.error("No se encontró el elemento con id 'ulmenu'");
        return;
    }
    for (const menu of menus) { // Recorre cada objeto del array menus
        let lista = document.createElement("li"); // Crea un elemento <li> para cada menú
        lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`; // Inserta el enlace dentro del <li>
        enlaces.appendChild(lista); // Agrega el <li> al <ul>
    }
}

// Array de productos, cada uno con nombre, precio, imagen y un identificador único
const productos = [
    {nombre:"Almohadon", precio:"10000", img:"img/almohadon.jpeg", id:"1", stock:20},
    {nombre:"Bolso", precio:"30000", img:"img/bolso.jpeg", id:"2", stock:10},
    {nombre:"Ladrillos", precio:"5000", img:"img/ladrillos.jpeg", id:"3", stock:24},
    {nombre:"Mat premium", precio:"30000", img:"img/matpremium.jpeg", id:"4", stock:30},
    {nombre:"Mat simple", precio:"25000", img:"img/matsimple.jpeg", id:"5", stock:28},
    {nombre:"Pelota", precio:"15000", img:"img/pelota.jpeg", id:"6", stock:50},
]

// Función para cargar los productos dinámicamente
function cargarproductos() {
    let ventas = document.getElementById("boxproductos"); // Obtiene el elemento donde se mostrarán los productos
    if (!ventas) {
        console.error("No se encontró el elemento con id 'boxproductos'");
        return;
    }
    for (const producto of productos) { // Recorre cada objeto del array productos
        let contenedor = document.createElement("div"); // Crea un contenedor <div> para cada producto
        contenedor.innerHTML = `
            <div id="boxproducto"> <!-- Caja del producto -->
                <h3>${producto.nombre}</h3> <!-- Nombre del producto -->
                <img src="${producto.img}" alt="${producto.nombre}"> <!-- Imagen del producto -->
                <p>$ ${producto.precio}</p> <!-- Precio del producto -->
                <button onclick="verdetalle('${producto.id}')">Detalle</button> <!-- Botón de detalles -->
            </div>`;
        ventas.appendChild(contenedor); // Agrega el contenedor al elemento padre
    }
}

// Función para ver los detalles de un producto seleccionado
function verdetalle(idproducto) {
    const buscarproducto = productos.find(producto => producto.id === idproducto); // Busca el producto por su id
    if (!buscarproducto) {
        console.error("Producto no encontrado");
        return;
    }
    const enJSON = JSON.stringify(buscarproducto); // Convierte el producto a formato JSON
    localStorage.setItem("detalleproducto", enJSON); // Guarda el producto en el Local Storage
    window.location.href = "detalle.html"; // Redirige a la página de detalles
}

// Función para actualizar el carrito
function actualizarCarrito() {
    // Recuperar la cantidad desde localStorage
    let cantidadTotal = parseInt(localStorage.getItem("cantidadCarrito"), 10) || 0;

    // Actualizar el contador en el ícono del carrito
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = cantidadTotal;
    }
}

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
window.addEventListener('DOMContentLoaded', function() {
    cargarmenu();
    cargarproductos();
    actualizarCarrito();
});
