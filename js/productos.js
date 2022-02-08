'use strict';
import { app } from "../../js/fireBase.js";
import * as u from "./utils.js";
import { query, getFirestore, collection, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const db = getFirestore(app);
const productos = collection(db, "Productos");
let d = document;

export const obtenerArticulos = async (categoria) => {//cambiar categoria 
    try {
        u.crearCabecera();
        d.getElementById('resultado').innerHTML = ``;
        const consulta = await query(productos, where('categoria', '==', categoria));//categoriaActual
        const documentos = await onSnapshot(consulta, (col) => {
            col.docs.map((documento, index) => {
                u.mostrarProducto(documento.data(), index);
                d.getElementById(`boton${index}`).addEventListener('click', (e) => {
                    if (e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value == "") {
                        console.log('campo vacio');
                    } else {
                        console.log(e.target.parentNode.parentNode.children[1].innerHTML); //Nombre producto
                        console.log( parseFloat(e.target.parentNode.parentNode.children[3].innerHTML)); //Precio producto
                        
                        if (documento.data().venta === 'unidad') {
                            console.log(parseInt(e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value)); //Cantidad en unidades
                        } else {
                            console.log(parseFloat(e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value));//Cantidad en gramos
                        }
                        //Aquí va la función de añadir al carrito.
                    }

                }, false);
            });
        });
    } catch (error) {

        console.log(error.message);
    }
};

