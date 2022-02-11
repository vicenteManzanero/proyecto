'use strict';
import * as u from "./utils.js";
import * as t from "./eltiempo.js";
import { crearNuevoUsuario, iniciarSesionComprobacion, cerrarSesion } from "./login.js";
import { obtenerArticulos } from "./productos.js";
//Nivel 1 Eventos de la página.
window.onload = () => {
  //Cargamos el tiempo.
  t.mostrarTiempo();
  //cargamos la página de bienvenida.
  u.mostrarHistoria();
  /* Botones de menú, logo y nombre de empresa.*/
  let d = document;
  //Botón login.
  let login = d.getElementById('login');
  //Botón crearCuenta.
  let crearCuenta = d.getElementById('crearCuenta');
  //Botón para registrarse.
  let registrar = d.getElementById("registrarCuenta");
  //Botón de inicio sesión.
  let enviarDatosLogin = d.getElementById("entrar");
  //Botón de inicio sesión.
  let logout = d.getElementById("logout");
  //Botones de Menú.
  let botonHistoria = d.getElementById("botonHistoria");
  let botonCarrito = d.getElementById("botonCarrito");
  let botonContacto = d.getElementById("botonContacto");
  let botonProducto = d.getElementById("botonProducto");
  let logo = d.getElementById("logo");
  let nombreEmpresa = d.getElementById("nombre");
  var botonBuscar = d.getElementById("buscarP");

  /*Variables globales */
  //Para controlar usuario.
  let usuarioDelPedido = "";
  //Para controlar el carrito que se pierde solo se guardará en la base de datos en caso de completar el pedido.
  var productosEnELCarrito = [];

  /*   DIV para ir mostrando y ocultando.  */
  let divCarrito = d.getElementById("carrito");
  let divHistoria = d.getElementById("historia");
  let divContacto = d.getElementById("contacto");
  let divProducto = d.getElementById("productos");
  let divProductosCategorias = d.getElementById("productosCategorias");

  /*Para mostrar las categorías segun cliques.*/
  let bobas = d.getElementById("bobas");
  let refrescos = d.getElementById("refrescos");
  let pan = d.getElementById("pan");
  let hojaldre = d.getElementById("hojaldre");
  let rollos = d.getElementById("rollos");
  let tortas = d.getElementById("tortas");

  /*  Inicio de las funciones funciones y eventos.*/


  //Creamos un evento por cada tarjeta del menú.
  hojaldre.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("hojaldre", productosEnELCarrito, usuarioDelPedido);
  }, false);
  bobas.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("bobas", productosEnELCarrito, usuarioDelPedido);
  }, false);
  refrescos.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("refrescos", productosEnELCarrito, usuarioDelPedido);
  }, false);
  pan.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("pan", productosEnELCarrito, usuarioDelPedido);
  }, false);
  rollos.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("rollos", productosEnELCarrito, usuarioDelPedido);
  }, false);
  tortas.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("tortas", productosEnELCarrito, usuarioDelPedido);
  }, false);
  botonBuscar.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    var producto = d.getElementById("busqueda");
    obtenerArticulos("", productosEnELCarrito, usuarioDelPedido, producto.value);
    producto.value = "";
  }, false);
  //Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario.
  botonCarrito.addEventListener("click", () => {
    u.crearCabeceraCarrito('cabeceraCarrito');
    u.cambiarBotonesMenu(botonCarrito);
    u.mostrarPartedeMenu(divCarrito);
  }, false);

  //Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario.
  botonHistoria.addEventListener("click", () => {
    u.cambiarBotonesMenu(botonHistoria);
    u.mostrarPartedeMenu(divHistoria);
  }, false);

  //Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario.
  logo.addEventListener("click", () => {
    u.cambiarBotonesMenu(botonHistoria);
    u.mostrarPartedeMenu(divHistoria);
  }, false);

  //Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario.
  nombreEmpresa.addEventListener("click", () => {
    u.cambiarBotonesMenu(botonHistoria);
    u.mostrarPartedeMenu(divHistoria);
  }, false);

  //Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario.
  botonContacto.addEventListener("click", () => {
    u.cambiarBotonesMenu(botonContacto);
    u.mostrarPartedeMenu(divContacto);
  }, false);

  //Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario.
  botonProducto.addEventListener("click", () => {
    u.cambiarBotonesMenu(botonProducto);
    u.mostrarPartedeMenu(divProducto);
  }, false);

  //En el botón del login, se crea un evento que abre el modal para poder iniciar sesión.
  login.addEventListener('click', () => {
    u.openModal('backdrop', 'exampleModal');
    //Dentro de el modal, se crea el evento para enviar los datos.
    enviarDatosLogin.addEventListener("click", () => {
      if (u.comprobarDatos(d.getElementById("usuario").value, d.getElementById("clave").value)) {//Comprobamos que los datos de correo , password, telf sean correctos.
        iniciarSesionComprobacion(d.getElementById("usuario").value, d.getElementById("clave").value);
        usuarioDelPedido = d.getElementById("usuario").value;
        u.cambiarBotonesMenu(botonHistoria);
        u.mostrarPartedeMenu(divHistoria);
      } else {
        u.mensajesUsuarioLogin("Introduce todos los campos correctamente", 'contenedorMensajeLogin');
      }
    }, false);
    //Evento para cerrar el modal.
    d.getElementById('cerrar').addEventListener('click', () => {
      u.closeModal('backdrop', 'exampleModal');
    }, false);

  }, false);


  //Evento para poder crear una cuenta.
  crearCuenta.addEventListener('click', () => {
    //Se abre un modal distinto, para poder registrarte.
    u.openModal('backdrop', 'exampleModal2');
    //Cuando pulsamos en el botón registrar, se hacen las comprobaciones y se envian los datos.
    registrar.addEventListener("click", () => {
      if (u.comprobarDatos(d.getElementById("usuarioRegistro").value, d.getElementById("claveRegistro").value, d.getElementById("telefonoRegistro").value)) {//Comprobamos que los datos de correo , password, telf sean correctos.
        crearNuevoUsuario(d.getElementById("usuarioRegistro").value, d.getElementById("claveRegistro").value, d.getElementById("telefonoRegistro").value);//Si los datos están bien creamos usuario
        usuarioDelPedido = d.getElementById("usuario").value;
        u.cambiarBotonesMenu(botonHistoria);
        u.mostrarPartedeMenu(divHistoria);
      } else {
        u.mensajesUsuarioLogin("Introduce todos los campos correctamente", 'contenedorMensajeLogin2');
      }
    }, false);
    d.getElementById('cerrarCrear').addEventListener('click', () => {
      u.closeModal('backdrop', 'exampleModal2');
    }, false);
  }, false);


  //Para que al cerrar sesión nos vuelva al home.
  logout.addEventListener("click", () => {
    cerrarSesion();
    u.cambiarBotonesMenu(botonHistoria);
    u.mostrarPartedeMenu(divHistoria);
  }, false);


}