"use strict";

import { autentificacion, app } from "./fireBase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import * as u from "./utils.js";

//Obtenemos la conexión a la BBDD.
const dbase = getFirestore(app);
const usuarios = collection(dbase, "Usuarios");

//Para añadir el nuevo usuario creado.
const guardarUsuario = async (nuevoUsuario) => {
  const usuarioGuardado = await addDoc(usuarios, nuevoUsuario);
  console.log(`Lista guardado con el id ${usuarioGuardado.id}`);
  u.mensajesUsuario("Usuario registrado con éxito. Ahora ya puedes Iniciar sesión con tu cuenta");
};

//Crea un nuevo usuario con los parámetros necesarios tanto en el auth como en nuestra base de datos
export const crearNuevoUsuario = (correo, contraseña, telf,) => {
  createUserWithEmailAndPassword(autentificacion, correo, contraseña)
    .then((credenciales) => {
      //El usuario pasado a JSON.
      guardarUsuario(u.nuevoUsuarioJSON(correo, telf));
      cambiarseccionLogin(true);
      //Para quitar el modal;
      u.closeModal('backdrop', 'exampleModal2');
    })
    .catch((error) => {
      console.log(error);
      u.mensajesUsuario("Este usuario ya esta registrado");
    });
};

//Para iniciar sesión
export const iniciarSesionComprobacion = (correo, contra,) => {
  signInWithEmailAndPassword(autentificacion, correo, contra)
    .then((credenciales) => {
      if (correo == "admin@admin.es") window.location.href = "../../back-end/back-end.html";
      const actual = credenciales.user;
      cambiarseccionLogin(true);
      //Para quitar el modal;
      u.closeModal('backdrop', 'exampleModal');
      u.mensajesUsuario("Sesión Iniciada ya puedes hacer pedidos");
    })
    .catch((error) => {
      u.mensajesUsuario("Revisa el usuario y contraseña");
      console.log(error);
    });
};
//Para cambiar la sección de Login dependiendo del estado.
const cambiarseccionLogin = (tipo) => {
  var ini = document.getElementById("login");
  var reg = document.getElementById("crearCuenta");
  var cerr = document.getElementById("logout");
  let botonCarrito = document.getElementById("botonCarrito");
  if (tipo) {
    ini.classList.add("hidden");
    reg.classList.add("hidden");
    botonCarrito.classList.remove("hidden");
    cerr.classList.remove("hidden");
  } else {
    ini.classList.remove("hidden");
    reg.classList.remove("hidden");
    cerr.classList.add("hidden");
    botonCarrito.classList.add("hidden");
  }
}

//Para cerrar la sesión indicada.
export const cerrarSesion = () => {
  autentificacion
    .signOut()
    .then(() => {
      cambiarseccionLogin(false);
      u.mensajesUsuario("Sesión cerrada correctamente");
    })
    .catch((error) => {
      console.log(error);
    });
};

