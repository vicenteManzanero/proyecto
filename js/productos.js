'use strict';
import { app } from "../../js/fireBase.js";
import * as u from "./utils.js";
import {query,getFirestore,collection,where,onSnapshot} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const db = getFirestore(app);
const productos = collection(db, "Productos");


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let categoriaActual = getParameterByName('cat');

const obtenerArticulos = async () => {
    try {
        u.crearCabecera();
        const consulta = await query(productos,where('categoria', '==', categoriaActual));
        const documentos = await onSnapshot(consulta, (col) => {
            col.docs.map((documento,index) => {
                u.mostrarProducto(documento.data(),index);
            });
        });
    } catch (error) {

       console.log(error.message); 
    }
};
obtenerArticulos();
