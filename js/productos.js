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
                        console.log('campo vacio');//Informar de que tiene que introducir una cantidad
                    } else {
                                let pedido = {};
                                pedido.nombre = e.target.parentNode.parentNode.children[1].innerHTML; //Nombre producto
                                pedido.precio = parseFloat(e.target.parentNode.parentNode.children[3].innerHTML); //Precio producto
                        if (documento.data().venta === 'unidad') {
                                pedido.tipo = 'Unidad';
                                pedido.cantidad = parseInt(e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value); //Cantidad en unidades
                                pedido.total = pedido.cantidad * pedido.precio;
                        } else {
                            pedido.tipo = 'Kg';
                                pedido.cantidad = parseFloat(e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value);//Cantidad en gramos
                                pedido.total = pedido.cantidad * pedido.precio;
                        }
                        //Mostrar mensaje de producto añadido.
                        
                        u.enviarProductoCarrito(pedido);
                    }

                }, false);
            });
        });
    } catch (error) {

        console.log(error.message);
    }
};


