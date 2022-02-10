'use strict';
let d = document;
import { app } from "../../js/fireBase.js";
import {
    getFirestore,
    addDoc,  collection
  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

  const db = getFirestore(app);
  const pedidosDB = collection(db, "Pedidos");
  const guardarPedido = async (pedidos, pedidoCreado) => {
    const pedidoGuardado = await addDoc(pedidos, pedidoCreado);
    console.log(`Producto guardado con el id ${pedidoGuardado.id}`);
    mensajesUsuario(`Pedido añadido con éxito `);
  };

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
export const comprobarDatos = (correo, password, telf = "") => {//Función creada para comprobar los datos de iniciar sesión y registrarse;
    var comprobacionCorreo = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo));//Comprobamos el correo electrónico.
  //  console.log(correo);
   // console.log(password);

    var comprobarPassword = (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&*-])[A-Za-z\d@$!%*?&]{8,}$/.test(password));//Obligamos a una constraseña segura de mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
    var comprobacionTelf = (/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/).test(telf);
    console.log(comprobacionCorreo);
    console.log(comprobarPassword);
    console.log(comprobacionTelf);
    if (telf == "") return (comprobarPassword && comprobacionCorreo);//Para el inicio de sesión .
    else return (comprobarPassword && comprobacionCorreo && comprobacionTelf);//Para registrase por primera vez.

}
export const nuevoUsuarioJSON = (Correo, Telf) => {// Para crear el usuario con el formato deseado.
    return {
        correo: Correo,
        telefono: Telf,
        pedidos: ""

    }
}
export function mensajesUsuario(texto) {//Para comunicar al usuario todo lo que va ocurriendo
    let div = document.getElementById("comunicacion_usuario");
    div.classList.remove("hidden");
    div.innerHTML = texto;
    setTimeout(() => {
        div.classList.add("hidden");
    }, 3000);
}
export const openModal = (id1, id2) => {
    d.getElementById(`${id1}`).style.display = "block"
    d.getElementById(`${id2}`).style.display = "block"
    d.getElementById(`${id2}`).classList.add("show")
}
export const openModalArticulo = (id1, id2, datos) => {
    d.getElementById(`${id1}`).style.display = "block"
    d.getElementById(`${id2}`).style.display = "block"
    d.getElementById(`${id2}`).classList.add("show");
    d.getElementById('datosModalArticulo').innerHTML = `
    ${datos.imagen}<br>
    ${datos.nombre}<br>
    ${datos.precio}<br>
    `;
}
export const closeModal = (id1, id2) => {
    d.getElementById(`${id1}`).style.display = "none"
    d.getElementById(`${id2}`).style.display = "none"
    d.getElementById(`${id2}`).classList.remove("show")
}
var modal = d.getElementById('exampleModal');
var modal2 = d.getElementById('exampleModal2');
window.onclick = function (event) {
    if (event.target == modal || event.target == modal2) {
        closeModal('backdrop', 'exampleModal2');
        closeModal('backdrop', 'exampleModal');
    }
}
export const mostrarProducto = (objeto, n) => {

    let div = d.createElement('div');
    /* div.style.cursor = 'pointer'; */
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


    let aler = d.createElement('div');
    aler.setAttribute('class', 'col d-flex align-items-center justify-content-center');
    for (let j = 0; j < objeto.alérgenos.length; j++) {
        aler.innerHTML += `${objeto.alérgenos[j]}<br>`;
    }
    d.getElementById(`alergenos${n}`).appendChild(aler);
    if (objeto.venta === 'unidad') {
        let divTipo = d.createElement('div');
        divTipo.setAttribute('class', 'col d-flex align-items-center justify-content-center');
        divTipo.innerHTML = `<input id="tipos${n}"  type="text" class="form-control" placeholder="Cantidad" aria-describedby="basic-addon1">`;
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
    let logout= d.getElementById('logout');
    let boton=d.getElementById(`boton${n}`);
    let tipos=d.getElementById(`tipos${n}`);
    if(logout.classList.contains("hidden")){//Para dejar deshabilitar esas opciones si no estás logeado;
        boton.setAttribute("disabled","");
        tipos.setAttribute("disabled","");
    }
}

export const cambiarBotonesMenu = (opcionMenu) => {
    botonCarrito.classList.remove("seleccionado");
    botonHistoria.classList.remove("seleccionado");
    botonContacto.classList.remove("seleccionado");
    botonProducto.classList.remove("seleccionado");
    opcionMenu.classList.add("seleccionado");
}
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
export const crearCabecera = () => {//Crea la cabecera para mostrar los productos.
    let div = d.createElement('div');
    div.setAttribute('class', 'row');
    let cabeceraArticulo = d.getElementById('cabeceraArticulos');//Para que al llamar a la función cada vez no se creen más de una vez la  cabecera.
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
//Carrito
export const crearCabeceraCarrito = (donde) => {//Crea la cabecera para mostrar los productos.
    let div = d.createElement('div');
    div.setAttribute('class', 'row');
    let cabeceraCarrito = d.getElementById(donde);
    cabeceraCarrito.innerHTML = '';//Para que al llamar a la función cada vez no se creen más de una vez la  cabecera. */
    div.innerHTML = `
    <div class= "col d-flex justify-content-center cabeceraArticulo">PRODUCTO</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">PRECIO</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">CANTIDAD</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">TOTAL</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">ELIMINAR</div>`;
    
    cabeceraCarrito.appendChild(div);
}
export function PedidosJSON(Correo,Pedido,Fecha){//Creamos los objetos que recibimos por formulario.
    return {correo: Correo,
            pedido: Pedido,
            fecha: Fecha
        }
}
export const enviarProductoCarrito = (carrito, usuarioDelPedido)=>{
    d.getElementById('resultadoCarrito').innerHTML="";//Para cada vez que añadimos o borramos un producto del carrito se vuelva a pintar completamente.
   let totalCompra=0;
  console.log(carrito);
    carrito.map((objeto)=>{
        let div = d.createElement('div');
        div.setAttribute('class', 'row ');
        div.innerHTML = `
    <div class= "col d-flex align-items-center justify-content-center">${objeto.nombre}</div>
    <div class= "col d-flex align-items-center justify-content-center">${objeto.precio} €</div>
    <div class= "col d-flex align-items-center justify-content-center">${objeto.cantidad} ${objeto.tipo}</div>
    <div class= "col d-flex align-items-center justify-content-center">${Math.round((objeto.total + Number.EPSILON) * 100) / 100} €</div>
    <div class= "col d-flex align-items-center justify-content-center"><img class="iconoBorrar" src="../img/borrar.png" width="30" height="30" /> </div>
    `;//El math.Round del final es para que no diera a veces resultados  con muchos decimales ya que al ser la conversión a float hay veces que salen cosas raras;
    totalCompra+=Math.round((objeto.total + Number.EPSILON) * 100) / 100;
    
    d.getElementById('resultadoCarrito').appendChild(div);
});

let divTotal = d.createElement('div');
divTotal.setAttribute('class', 'row ');
divTotal.innerHTML = `  <div class= "col d-flex align-items-center justify-content-center">El precio total del pedido es de ${totalCompra}€ .     Introducir del pedido:   <input type="date" id="fechaPedido">       <button type="button" class="btn btn-success" id="confirmarPedido">confirmar el Pedido</button></div>`;

if(carrito.length==0) {//comprobamos que si borramos producto quede alguno en la lista sino ocultamos la parte de confirmar el pedido.
   divTotal.setAttribute('class', "hidden");
   d.getElementById('resultadoCarrito').innerHTML="No hay más productos en el carrito";/*Primero cambiamos el texto del carrito.
    y luego añadimos el confirmar pedido se hace de esta manera para que no de un error de undefined el addEventListener de realizar pedido aunque el funcionamiento no se vería afectado.*/
   d.getElementById('resultadoCarrito').appendChild(divTotal);

}
d.getElementById('resultadoCarrito').appendChild(divTotal);

let botonPedido=d.getElementById("confirmarPedido");
let iconosBorrar= d.getElementsByClassName("iconoBorrar");
for(let i=0; i<iconosBorrar.length; i++){
  
    iconosBorrar[i].addEventListener("click",(event)=>{
        console.log(carrito[i]);
        carrito.splice(i, 1);//para borrar el elemento del carrito que queremos;
        console.log( ` longitud carrito ${carrito.length}`);
       
        enviarProductoCarrito(carrito, usuarioDelPedido);

    });

}
botonPedido.addEventListener("click",(e)=>{//Para crear el pedido una vez todos los pasos son correctos.
 let fechasinFiltrar=   d.getElementById("fechaPedido").value;
 let hoy = new Date();
 let fechaPedido = new Date(fechasinFiltrar);
if(fechaPedido>hoy && fechaPedido.getDay()!=0 ){// falta crear JSON que sea pedido con los datos del carrito e introducirlo en la base de datos.
 guardarPedido(pedidosDB, PedidosJSON(usuarioDelPedido,carrito,fechasinFiltrar));
 carrito=[];//para vaciarlo por si el usuario quiere hacer otro pedido;
   carritoVacio();
}else mensajesUsuario('Recuerde los domingos estamos cerrados y necesitamos un día para la preparación del pedido.');

})

}


export const carritoVacio = () => {
    d.getElementById('resultadoCarrito').innerHTML= 'Pedido Realizado con éxito. Muchas gracias por confiar en nosotros';
}
