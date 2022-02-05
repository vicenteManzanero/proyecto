'use strict';
import * as u from "./utils.js";
//Nivel 1 Eventos de la página
window.onload = () => {
    let d = document;
    let login= d.getElementById('login');

    u.mostrar();
    d.getElementById('login').addEventListener('click',()=>{
        u.openModal();
        d.getElementById('cerrar').addEventListener('click',()=>{
            u.closeModal()
        },false);
    },false);




}