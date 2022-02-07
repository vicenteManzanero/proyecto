'use strict';
import * as u from "./utils.js";

import { crearNuevoUsuario,iniciarSesionComprobacion , cerrarSesion} from "./login.js";
//Nivel 1 Eventos de la página
window.onload = () => {
  const db = localStorage; //Para controlar las sesiones.
  console.log(db.getItem("correo")!=null);
  /* if(db.getItem("correo")) {
    iniciarSesionComprobacion(db.getItem("correo"),d.getElementById("clave").value);
  } */
    let d = document;
    let login= d.getElementById('login');//Botón login.
    let crearCuenta= d.getElementById('crearCuenta');//Botón crearCuenta.
    let registrar= d.getElementById("registrarCuenta");//Botón para registrarse.
    let enviarDatosLogin=d.getElementById("entrar");//Botón de inicio sesión.
    let logout=d.getElementById("logout");//Botón de inicio sesión.

    u.mostrar();
    login.addEventListener('click',()=>{
        u.openModal('backdrop','exampleModal');
        enviarDatosLogin.addEventListener("click",()=>{
            if(u.comprobarDatos(d.getElementById("usuario").value,d.getElementById("clave").value)){//Comprobamos que los datos de correo , password, telf sean correctos.
                iniciarSesionComprobacion(d.getElementById("usuario").value,d.getElementById("clave").value);
            }else{
          u.mensajesUsuario("Introduce todos los campos correctamente");
            }   
          },false);

        d.getElementById('cerrar').addEventListener('click',()=>{
            u.closeModal('backdrop','exampleModal');
        },false);
        
    },false);

    crearCuenta.addEventListener('click',()=>{
        u.openModal('backdrop','exampleModal2');
        registrar.addEventListener("click",()=>{
          if(u.comprobarDatos(d.getElementById("usuarioRegistro").value,d.getElementById("claveRegistro").value,d.getElementById("telefonoRegistro").value)){//Comprobamos que los datos de correo , password, telf sean correctos.
            crearNuevoUsuario(d.getElementById("usuarioRegistro").value,d.getElementById("claveRegistro").value,d.getElementById("telefonoRegistro").value);//Si los datos están bien creamos usuario
          }else{
        u.mensajesUsuario("Introduce todos los campos correctamente");
          }
        },false);
        d.getElementById('cerrarCrear').addEventListener('click',()=>{
            u.closeModal('backdrop','exampleModal2');
        },false);
    },false);

    logout.addEventListener("click",()=>{
cerrarSesion();
    },false);


}