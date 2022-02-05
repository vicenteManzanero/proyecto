'use strict';
import * as u from "./utils.js";
//Nivel 1 Eventos de la página
window.onload = () => {
    let d = document;
    let login= d.getElementById('login');
    let crearCuenta= d.getElementById('crearCuenta');

    u.mostrar();
    login.addEventListener('click',()=>{
        u.openModal('backdrop','exampleModal');
        d.getElementById('cerrar').addEventListener('click',()=>{
            u.closeModal('backdrop','exampleModal')
        },false);
    },false);

    crearCuenta.addEventListener('click',()=>{
        u.openModal('backdrop','exampleModal2');
        d.getElementById('cerrarCrear').addEventListener('click',()=>{
            u.closeModal('backdrop','exampleModal2')
        },false);
    },false);


}