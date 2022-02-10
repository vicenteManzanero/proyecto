'use strict';
import * as u from "./utils.js";
import * as t from "./eltiempo.js";

import { crearNuevoUsuario, iniciarSesionComprobacion, cerrarSesion } from "./login.js";
import { obtenerArticulos } from "./productos.js";
//Nivel 1 Eventos de la página
window.onload = () => {
  t.mostrarTiempo();
  u.mostrarHistoria();
  /* Botones de menú, logo y nombre de empresa      */
  let d = document;
  let login = d.getElementById('login');//Botón login.
  let crearCuenta = d.getElementById('crearCuenta');//Botón crearCuenta.
  let registrar = d.getElementById("registrarCuenta");//Botón para registrarse.
  let enviarDatosLogin = d.getElementById("entrar");//Botón de inicio sesión.
  let logout = d.getElementById("logout");//Botón de inicio sesión.
  let botonHistoria = d.getElementById("botonHistoria");//Botones de Menú.
  let botonCarrito = d.getElementById("botonCarrito");
  let botonContacto = d.getElementById("botonContacto");
  let botonProducto = d.getElementById("botonProducto");
  let logo = d.getElementById("logo");
  let nombreEmpresa = d.getElementById("nombre");
  let usuarioDelPedido="";
  var productosEnELCarrito=[];//Para controlar el carrito que se pierde solo se guardará en la base de datos en caso de completar el pedido.


  /*Final de los botones
  Inicio de las funciones funciones
  */
  /*   DIV para ir mostrando y ocultando  */
  let divCarrito = d.getElementById("carrito");
  let divHistoria = d.getElementById("historia");
  let divContacto = d.getElementById("contacto");
  let divProducto = d.getElementById("productos");
  let divProductosCategorias = d.getElementById("productosCategorias");

  /*Para mostrar las categorías segun cliques*/
  let bobas = d.getElementById("bobas");
  let refrescos = d.getElementById("refrescos");
  let pan = d.getElementById("pan");
  let hojaldre = d.getElementById("hojaldre");
  let rollos = d.getElementById("rollos");
  let tortas = d.getElementById("tortas");


  hojaldre.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("hojaldre", productosEnELCarrito,usuarioDelPedido);
  }, false);
  bobas.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("bobas", productosEnELCarrito,usuarioDelPedido);
  }, false);
  refrescos.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("refrescos", productosEnELCarrito,usuarioDelPedido);
  }, false);
  pan.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("pan", productosEnELCarrito,usuarioDelPedido);
  }, false);
  rollos.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("rollos", productosEnELCarrito,usuarioDelPedido);
  }, false);
  tortas.addEventListener("click", () => {
    u.mostrarPartedeMenu(divProductosCategorias);
    obtenerArticulos("tortas", productosEnELCarrito,usuarioDelPedido);
  }, false);



  botonCarrito.addEventListener("click", () => {//Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario
    u.crearCabeceraCarrito('cabeceraCarrito');
    u.cambiarBotonesMenu(botonCarrito);
    u.mostrarPartedeMenu(divCarrito);
   

  }, false);
  botonHistoria.addEventListener("click", () => {//Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario
    u.cambiarBotonesMenu(botonHistoria);
    u.mostrarPartedeMenu(divHistoria);
    
  }, false);
  logo.addEventListener("click", () => {//Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario
    u.cambiarBotonesMenu(botonHistoria);
    u.mostrarPartedeMenu(divHistoria);
  }, false);
  nombreEmpresa.addEventListener("click", () => {//Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario
    u.cambiarBotonesMenu(botonHistoria);
    u.mostrarPartedeMenu(divHistoria);
  }, false);

  botonContacto.addEventListener("click", () => {//Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario
    u.cambiarBotonesMenu(botonContacto);
    u.mostrarPartedeMenu(divContacto);
  }, false);
  botonProducto.addEventListener("click", () => {//Para cada vez que pinche cambie el boton selecionado y haga todo lo necesario
    u.cambiarBotonesMenu(botonProducto);
    u.mostrarPartedeMenu(divProducto);
  }, false);



  login.addEventListener('click', () => {
    u.openModal('backdrop', 'exampleModal');
    enviarDatosLogin.addEventListener("click", () => {
      if (u.comprobarDatos(d.getElementById("usuario").value, d.getElementById("clave").value)) {//Comprobamos que los datos de correo , password, telf sean correctos.
        iniciarSesionComprobacion(d.getElementById("usuario").value, d.getElementById("clave").value);
       usuarioDelPedido= d.getElementById("usuario").value;
        u.cambiarBotonesMenu(botonHistoria);
        u.mostrarPartedeMenu(divHistoria);
      } else {
        u.mensajesUsuarioLogin("Introduce todos los campos correctamente",'mensajesUsuarioLogin');
      }
    }, false);

    d.getElementById('cerrar').addEventListener('click', () => {
      u.closeModal('backdrop', 'exampleModal');
    }, false);

  }, false);

  crearCuenta.addEventListener('click', () => {
    u.openModal('backdrop', 'exampleModal2');
    registrar.addEventListener("click", () => {
      if (u.comprobarDatos(d.getElementById("usuarioRegistro").value, d.getElementById("claveRegistro").value, d.getElementById("telefonoRegistro").value)) {//Comprobamos que los datos de correo , password, telf sean correctos.
        crearNuevoUsuario(d.getElementById("usuarioRegistro").value, d.getElementById("claveRegistro").value, d.getElementById("telefonoRegistro").value);//Si los datos están bien creamos usuario
        usuarioDelPedido= d.getElementById("usuario").value;
        u.cambiarBotonesMenu(botonHistoria);
        u.mostrarPartedeMenu(divHistoria);
      } else {
        u.mensajesUsuarioLogin("Introduce todos los campos correctamente",'mensajesUsuarioLogin2');
      }
    }, false);
    d.getElementById('cerrarCrear').addEventListener('click', () => {
      u.closeModal('backdrop', 'exampleModal2');
    }, false);
  }, false);

  logout.addEventListener("click", () => {
    cerrarSesion();//Para que al cerrar sesión nos vuelva al home.
    u.cambiarBotonesMenu(botonHistoria);
    u.mostrarPartedeMenu(divHistoria);
  }, false);


}