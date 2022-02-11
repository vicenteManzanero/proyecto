'use strict';
let d = document;
import { app } from "../../js/fireBase.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

//Para poder hacer consultas a la BBDD.
const db = getFirestore(app);
const pedidosDB = collection(db, "Pedidos");


//Función para guardar un pedido en la BBDD.
const guardarPedido = async (pedidos, pedidoCreado) => {
    const pedidoGuardado = await addDoc(pedidos, pedidoCreado);
    console.log(`Producto guardado con el id ${pedidoGuardado.id}`);
    mensajesUsuario(`Pedido añadido con éxito `);
};


//Función para mostrar el carrusel.
export const mostrarHistoria = () => {
    let imagenes = ["../img/carrusel_historia/1.jpg", "../img/carrusel_historia/2.jpg", "../img/carrusel_historia/3.jpg", "../img/carrusel_historia/4.jpg", "../img/carrusel_historia/5.jpg", "../img/carrusel_historia/6.jpg"];
    let i = 0;

    setInterval(() => {
        let img = d.createElement("img");
        img.setAttribute("src", imagenes[i]);
        img.setAttribute("class", "carrusel");
        d.getElementById('carrusel').innerHTML = img.outerHTML;

        i++;
        if (i >= imagenes.length) {
            i = 0;
        }
    }, 3000);
}
//Función creada para comprobar los datos de iniciar sesión y registrarse;
export const comprobarDatos = (correo, password, telf = "") => {
    //Comprobamos el correo electrónico.
    var comprobacionCorreo = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo));
    //Obligamos a una constraseña segura de mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
    var comprobarPassword = (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&*-])[A-Za-z\d@$!%*?&]{8,}$/.test(password));
    var comprobacionTelf = (/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/).test(telf);
    //Para el inicio de sesión .
    if (telf == "") return (comprobarPassword && comprobacionCorreo);
    //Para registrase por primera vez.
    else return (comprobarPassword && comprobacionCorreo && comprobacionTelf);

}
// Para crear el usuario con el formato deseado.
export const nuevoUsuarioJSON = (Correo, Telf) => {
    return {
        correo: Correo,
        telefono: Telf,
        pedidos: ""

    }
}
//Para comunicar al usuario todo lo que va ocurriendo.
export function mensajesUsuario(texto) {
    let div = document.getElementById("comunicacion_usuario");
    div.classList.remove("hidden");
    div.innerHTML = texto;
    setTimeout(() => {
        div.classList.add("hidden");
    }, 3000);
}
//Para comunicar al usuario todo lo que va ocurriendo.
export function mensajesUsuarioLogin(texto, donde) {
    let div = document.getElementById(donde);
    div.classList.remove("hidden");
    div.innerHTML = texto;
    setTimeout(() => {
        div.classList.add("hidden");
    }, 3000);
}
//Función para mostrar el modal.
export const openModal = (id1, id2) => {
    d.getElementById(`${id1}`).style.display = "block"
    d.getElementById(`${id2}`).style.display = "block"
    d.getElementById(`${id2}`).classList.add("show")
}
/* export const openModalArticulo = (id1, id2, datos) => {
    d.getElementById(`${id1}`).style.display = "block"
    d.getElementById(`${id2}`).style.display = "block"
    d.getElementById(`${id2}`).classList.add("show");
    d.getElementById('datosModalArticulo').innerHTML = `
    ${datos.imagen}<br>
    ${datos.nombre}<br>
    ${datos.precio}<br>
    `;
} */
//Función para cerrar el modal.
export const closeModal = (id1, id2) => {
    d.getElementById(`${id1}`).style.display = "none"
    d.getElementById(`${id2}`).style.display = "none"
    d.getElementById(`${id2}`).classList.remove("show")
}
//Para que se cierre el modal cuando clicas fuera.
var modal = d.getElementById('exampleModal');
var modal2 = d.getElementById('exampleModal2');
window.onclick = function (event) {
    if (event.target == modal || event.target == modal2) {
        closeModal('backdrop', 'exampleModal2');
        closeModal('backdrop', 'exampleModal');
    }
}


//Función para mostrar un producto en la lista de productosCategoría.
export const mostrarProducto = (objeto, n) => {
    let div = d.createElement('div');
    div.setAttribute('class', 'row ');
    div.setAttribute('data-toggle', 'modal');
    div.setAttribute('data-target', `modalArticulos${n}`);
    div.setAttribute('id', `fila${n}`);
    div.innerHTML = `
    <div class= "col d-flex align-items-center justify-content-center"><img src="${objeto.imagen}" alt="foto" width="80" height="50"></div>
    <div class= "col d-flex align-items-center justify-content-center">${objeto.nombre}</div>
    <div class= "col d-flex align-items-center justify-content-center" id="alergenos${n}"></div>
    <div class= "col d-flex align-items-center justify-content-center">${objeto.precio} €</div>
    <div class= "col d-flex align-items-center justify-content-center" id="tipo${n}">
    </div>
    <div class= "col d-flex align-items-center justify-content-center">
    <button type="button" class="btn btn-success" id="boton${n}">Añadir</button>
    </div>
    `;
    d.getElementById('resultado').appendChild(div);
    //Metemos los alérgenos en un array por si el producto contiene más de un alérgeno.
    let aler = d.createElement('div');
    aler.setAttribute('class', 'col d-flex align-items-center justify-content-center');
    for (let j = 0; j < objeto.alérgenos.length; j++) {
        aler.innerHTML += `${objeto.alérgenos[j]}<br>`;
    }
    d.getElementById(`alergenos${n}`).appendChild(aler);
    //En función del tipo de venta que tiene un producto (unidad o peso) se muestra un tipo de input distinto.
    if (objeto.venta === 'unidad') {
        let divTipo = d.createElement('div');
        divTipo.setAttribute('class', 'col d-flex align-items-center justify-content-center');
        divTipo.innerHTML = `<input id="tipos${n}"  type="text" class="form-control" placeholder="Cantidad" value="" aria-describedby="basic-addon1">`;
        d.getElementById(`tipo${n}`).appendChild(divTipo);
    } else {
        let divTipo = d.createElement('div');
        divTipo.setAttribute('class', 'col d-flex align-items-center justify-content-center');
        divTipo.innerHTML = `
        <select id="tipos${n}" class="form-select" aria-label="Default select example">
            <option selected value="">SELECCIONE</option>
            <option value="0.250">250 g</option>
            <option value="0.500">500 g</option>
            <option value="1">1 Kg</option>
            <option value="2">2 Kg</option>
        </select>
        `;
        d.getElementById(`tipo${n}`).appendChild(divTipo);
    }
    let logout = d.getElementById('logout');
    let boton = d.getElementById(`boton${n}`);
    let tipos = d.getElementById(`tipos${n}`);
    //Para dejar deshabilitar esas opciones si no estás logeado;
    if (logout.classList.contains("hidden")) {
        boton.setAttribute("disabled", "");
        tipos.setAttribute("disabled", "");
    }
}


//Función para aplicar un efecto al botón seleccionado.
export const cambiarBotonesMenu = (opcionMenu) => {
    botonCarrito.classList.remove("seleccionado");
    botonHistoria.classList.remove("seleccionado");
    botonContacto.classList.remove("seleccionado");
    botonProducto.classList.remove("seleccionado");
    opcionMenu.classList.add("seleccionado");
}
//Función para mostrar la parte del menú que se le pasa por parámetro y ocultar el resto de partes.
export const mostrarPartedeMenu = (parte) => {
    let divCarrito = d.getElementById("carrito");
    let divHistoria = d.getElementById("historia");
    let divContacto = d.getElementById("contacto");
    let divProducto = d.getElementById("productos");
    let divProductosCategorias = d.getElementById("productosCategorias");
    divProductosCategorias.classList.add("hidden");
    divCarrito.classList.add("hidden");
    divHistoria.classList.add("hidden");
    divProducto.classList.add("hidden");
    divContacto.classList.add("hidden");
    parte.classList.remove("hidden");
}
//Crea la cabecera para mostrar los productos.
export const crearCabecera = () => {
    let div = d.createElement('div');
    div.setAttribute('class', 'row');
    //Para que al llamar a la función cada vez no se creen más de una vez la  cabecera.
    let cabeceraArticulo = d.getElementById('cabeceraArticulos');
    cabeceraArticulo.innerHTML = "";
    div.innerHTML = `
    <div class= "col d-flex justify-content-center cabeceraArticulo">FOTO</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">NOMBRE</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">ALÉRGENOS</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">PRECIO</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">CANTIDAD</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">AÑADIR</div>`;
    cabeceraArticulo.appendChild(div);
}
//Crea la cabecera para mostrar los productos.
export const crearCabeceraCarrito = (donde) => {
    let div = d.createElement('div');
    div.setAttribute('class', 'row');
    let cabeceraCarrito = d.getElementById(donde);
    //Para que al llamar a la función cada vez no se creen más de una vez la  cabecera.
    cabeceraCarrito.innerHTML = '';
    div.innerHTML = `
    <div class= "col d-flex justify-content-center cabeceraArticulo">PRODUCTO</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">PRECIO</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">CANTIDAD</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">TOTAL</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">ELIMINAR</div>`;

    cabeceraCarrito.appendChild(div);
}

export const enviarProductoCarrito = (carrito, usuarioDelPedido) => {
    //Para cada vez que añadimos o borramos un producto del carrito se vuelva a pintar completamente.
    d.getElementById('resultadoCarrito').innerHTML = "";
    let totalCompra = 0;
    carrito.map((objeto) => {
        let div = d.createElement('div');
        div.setAttribute('class', 'row ');
        div.innerHTML = `
    <div class= "col d-flex align-items-center justify-content-center">${objeto.nombre}</div>
    <div class= "col d-flex align-items-center justify-content-center">${objeto.precio} €</div>
    <div class= "col d-flex align-items-center justify-content-center">${objeto.cantidad} ${objeto.tipo}</div>
    <div class= "col d-flex align-items-center justify-content-center">${Math.round((objeto.total + Number.EPSILON) * 100) / 100} €</div>
    <div class= "col d-flex align-items-center justify-content-center"><img class="iconoBorrar" src="../img/borrar.png" width="30" height="30" /> </div>
    `;
        totalCompra += Math.round((objeto.total + Number.EPSILON) * 100) / 100;
        d.getElementById('resultadoCarrito').appendChild(div);
    });

    let divTotal = d.createElement('div');
    divTotal.setAttribute('class', 'row ');
    divTotal.innerHTML = `  <div class= "col d-flex align-items-center justify-content-center">El precio total del pedido es de ${totalCompra}€ .     Introducir del pedido:   <input type="date" id="fechaPedido">       <button type="button" class="btn btn-success" id="confirmarPedido">confirmar el Pedido</button></div>`;
    //comprobamos que si borramos producto quede alguno en la lista sino ocultamos la parte de confirmar el pedido.
    if (carrito.length == 0) {
        divTotal.setAttribute('class', "hidden");
        /*Primero cambiamos el texto del carrito.
    y luego añadimos el confirmar pedido se hace de esta manera para que no de un error de undefined el addEventListener de realizar pedido aunque el funcionamiento no se vería afectado.*/
        d.getElementById('resultadoCarrito').innerHTML = "No hay más productos en el carrito";
        d.getElementById('resultadoCarrito').appendChild(divTotal);

    }
    d.getElementById('resultadoCarrito').appendChild(divTotal);
    let botonPedido = d.getElementById("confirmarPedido");
    let iconosBorrar = d.getElementsByClassName("iconoBorrar");
    for (let i = 0; i < iconosBorrar.length; i++) {
        iconosBorrar[i].addEventListener("click", (event) => {
            console.log(carrito[i]);
            //para borrar el elemento del carrito que queremos;
            carrito.splice(i, 1);
            console.log(` longitud carrito ${carrito.length}`);
            enviarProductoCarrito(carrito, usuarioDelPedido);
        });

    }
    //Para crear el pedido una vez todos los pasos son correctos.
    botonPedido.addEventListener("click", (e) => {
        let fechasinFiltrar = d.getElementById("fechaPedido").value;
        let hoy = new Date();
        let fechaPedido = new Date(fechasinFiltrar);
        // Falta crear JSON que sea pedido con los datos del carrito e introducirlo en la base de datos.
        if (fechaPedido > hoy && fechaPedido.getDay() != 0) {
            guardarPedido(pedidosDB, PedidosJSON(usuarioDelPedido, carrito, fechasinFiltrar));
            //Para vaciarlo por si el usuario quiere hacer otro pedido;
            carrito = [];
            carritoVacio();
        } else mensajesUsuario('Recuerde los domingos estamos cerrados y necesitamos un día para la preparación del pedido.');
    })
}

export const carritoVacio = () => {
    d.getElementById('resultadoCarrito').innerHTML = 'Pedido Realizado con éxito. Muchas gracias por confiar en nosotros';
}
