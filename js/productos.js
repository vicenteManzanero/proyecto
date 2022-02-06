'use strict';
import { app } from "../../js/fireBase.js";
import * as u from "./utils.js";
import { query, getFirestore, collection, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const db = getFirestore(app);
const productos = collection(db, "Productos");
let d = document;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//<a href="#" id="crearCuenta" data-toggle="modal" data-target="#exampleModal2">Crear Cuenta</a>

let categoriaActual = getParameterByName('cat');

const obtenerArticulos = async () => {
    try {
        u.crearCabecera();
        const consulta = await query(productos, where('categoria', '==', categoriaActual));
        const documentos = await onSnapshot(consulta, (col) => {
            col.docs.map((documento, index) => {
                u.mostrarProducto(documento.data(), index);
                d.getElementById(`boton${index}`).addEventListener('click', (e) => {

                    console.log(e.target.parentNode.parentNode.children[1].innerHTML);//Aquí va la función de añadir al carrito.

                    if (documento.data().venta === 'peso') {
                        console.log(e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value);
                    } else {
                        console.log(e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value);
                    }
                    // console.log(e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value);//Para peso
                    // console.log(e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value);//Para select

                }, false);
            });
        });
    } catch (error) {

        console.log(error.message);
    }
};
obtenerArticulos();


//funcion para mostrar los articulos ampiados
/* d.getElementById('resultado').addEventListener('click', (e) => {
    d.querySelector('div[tabindex="-1"]').setAttribute('id', e.target.parentNode.getAttribute('data-target'));
    let tar = e.target.parentNode.getAttribute('data-target');
    let datos = {};
    datos.nombre = e.target.parentNode.children[1].innerHTML;
    datos.imagen = e.target.parentNode.children[0].innerHTML;
    e.target.parentNode.children[3].innerHTML?datos.precio = e.target.parentNode.children[3].innerHTML:datos.precio ="";
    u.openModalArticulo('backdrop2', tar, datos);

    d.getElementById('anadirArticulo').addEventListener('click', () => {
     console.log('añadirr al carrito');
        //Aquí la funcion que añade productos
    }, false);

    var modal = d.getElementById(e.target.parentNode.getAttribute('data-target'));
    window.onclick = function (event) {
        if (event.target == modal || e.target.parentNode.getAttribute('data-target') == null) {
            u.closeModal('backdrop2', e.target.parentNode.getAttribute('data-target'));
        }
    }

}, false); */
