"use strict";

import { autentificacion,app } from "./fireBase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  }from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
    getFirestore,
    collection,getDocs,query,  
    where,orderBy,addDoc,doc,getDoc,updateDoc,arrayUnion,arrayRemove,deleteDoc 
  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
  import * as u from "./utils.js";
  const dbase= getFirestore(app);
const usuarios= collection(dbase,"Usuarios");
const guardarUsuario = async (nuevoUsuario) => {//Para añadir el nuevo usuario creado.
    const usuarioGuardado = await addDoc(usuarios, nuevoUsuario);
    console.log(`Lista guardado con el id ${usuarioGuardado.id}`);
     u.mensajesUsuario("Usuario registrado con éxito. Ahora ya puedes Iniciar sesión con tu cuenta")  ;
   
   
  };
  const db = localStorage; 

export const crearNuevoUsuario =(correo,contraseña,telf)=>{//Crea un nuevo usuario con los parámetros necesarios tanto en el auth como en nuestra base de datos
    createUserWithEmailAndPassword(autentificacion, correo, contraseña)
    .then((credenciales) => {
      console.log(credenciales); // Credenciales del usuario creado.
      guardarUsuario(u.nuevoUsuarioJSON(correo,telf));//El usuario pasado a JSON.
      cambiarseccionLogin(true);
      db.setItem("usuario", correo);    
      db.setItem("usuario", contra);   
      u.closeModal('backdrop','exampleModal');//Para quitar el modal;
    })
    .catch((error) => {
      console.log(error);
      u.mensajesUsuario("Este usuario ya esta registrado");
    });
};
export const iniciarSesionComprobacion = (correo, contra) => { //Para iniciar sesión
    signInWithEmailAndPassword(autentificacion, correo, contra)
      .then((credenciales) => {
        if(correo=="admin@admin.es")window.location.href="../../back-end/back-end.html";
        console.log("Sesión Iniciada");
        const actual = credenciales.user;
        console.log(actual);
        cambiarseccionLogin(true);
        u.closeModal('backdrop','exampleModal');//Para quitar el modal;
        u.mensajesUsuario("Sesión Iniciada ya puedes hacer pedidos");
        db.setItem("usuario", correo);    
        db.setItem("usuario", contra);    

      })
      .catch((error) => {
        u.mensajesUsuario("Revisa el usuario y contraseña");    
        console.log(error);
      });
  };
  
  const cambiarseccionLogin=(tipo)=>{//Para cambiar la sección de Login dependiendo del estado.
    var ini= document.getElementById("login");
    var reg= document.getElementById("crearCuenta");
    var cerr= document.getElementById("logout");

    if(tipo){
      ini.classList.add("hidden");
      reg.classList.add("hidden");
      cerr.classList.remove("hidden");
    }else{
      ini.classList.remove("hidden");
      reg.classList.remove("hidden");
      cerr.classList.add("hidden");
    }
  }


  export const cerrarSesion = (ruta="./index.html") => {//Para cerrar la sesión indicada.
    autentificacion
      .signOut()
      .then(() => {
       cambiarseccionLogin(false);
       db.clear();
        u.mensajesUsuario("Sesión cerrada correctamente");  
        window.location.href(ruta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

