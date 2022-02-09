'use strict';
import { app } from "../../js/fireBase.js";
import * as u from "./utils.js";
import { query, getFirestore, collection, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const db = getFirestore(app);
const productos = collection(db, "Productos");
let d = document;

export const obtenerArticulos = async (categoria,productosEnELCarrito) => {//cambiar categoria 
    try {
        u.crearCabecera();
        let semaforo=true;
        d.getElementById('resultado').innerHTML = ``;
        const consulta = await query(productos, where('categoria', '==', categoria));//categoriaActual
        const documentos = await onSnapshot(consulta, (col) => {
            col.docs.map((documento, index) => {
                u.mostrarProducto(documento.data(), index);
                d.getElementById(`boton${index}`).addEventListener('click', (e) => {
                    if (e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value == "" ||(documento.data().venta ==="peso"&&  e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value=="") ){// || e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value==""
                        u.mensajesUsuario('Introduzca una cantidad o seleccione un peso para el producto');//Informar de que tiene que introducir una cantidad o seleccionar un peso
                    } else {
                                let pedido = {};
                                pedido.nombre = e.target.parentNode.parentNode.children[1].innerHTML; //Nombre producto
                                pedido.precio = parseFloat(e.target.parentNode.parentNode.children[3].innerHTML); //Precio producto
                                console.log(pedido.precio);
                        if (documento.data().venta === 'unidad') {
                                pedido.tipo = 'Unidad';
                                pedido.cantidad = parseInt(e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value); //Cantidad en unidades
                                pedido.total = pedido.cantidad * pedido.precio;
                        } else {
                            pedido.tipo = 'Kg';
                                pedido.cantidad = parseFloat(e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value);//Cantidad en gramos
                                pedido.total = pedido.cantidad * pedido.precio;
                        }
                        
                        productosEnELCarrito.map((v)=>{//Comprueba si el producto ya existe en el carrito para añadirlo.
                                    if(v.nombre==pedido.nombre){
                                        semaforo=false;//Así no se añade otro producto al pedido sino que se añade al ya existente.
                                        v.cantidad+=pedido.cantidad;
                                        v.total+=pedido.total;
                                    }
                        });
                        if(semaforo)productosEnELCarrito.push(pedido);
                       console.log(productosEnELCarrito);
                        u.enviarProductoCarrito(productosEnELCarrito,'cabeceraCarrito');//Para que nos muestre la cabecera y el pedido.
                    }

                }, false);
            });
        });
    } catch (error) {

        console.log(error.message);
    }
};


