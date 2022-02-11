'use strict';
import { app } from "../../js/fireBase.js";
import * as u from "./utils.js";
import { query, getFirestore, collection, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const db = getFirestore(app);
const productos = collection(db, "Productos");
let d = document;

//cambiar categoria.
export const obtenerArticulos = async (categoria = "", productosEnELCarrito, usuarioDelPedido, producto = "") => {
    try {
        u.crearCabecera();
        let productoEncontrado = false;
        let semaforo = true;
        d.getElementById('resultado').innerHTML = ``;
        if (producto == "") {
            //categoriaActual
            var consulta = await query(productos, where('categoria', '==', categoria));
        } else {
            //todas las categorias para filtrar por el nombre.
            var consulta = await query(productos, where('nombre', '!=', categoria));

        }
        const documentos = await onSnapshot(consulta, (col) => {
            col.docs.map((documento, index) => {
                //Ya que aquí solo entrar al buscar por producto.
                if (!documento.data().nombre.toUpperCase().includes(producto.toUpperCase()) && categoria == "") {
                } else {
                    productoEncontrado = true;
                    u.mostrarProducto(documento.data(), index);
                    d.getElementById(`boton${index}`).addEventListener('click', (e) => {
                        d.getElementById('totalCarrito').innerHTML = ``;
                        let cantidadFormulario = e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value;

                        if ((documento.data().venta === "unidad" && (parseInt(cantidadFormulario) < 1 || isNaN(cantidadFormulario) || cantidadFormulario == "")) || (documento.data().venta === "peso" && e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value == "")) {
                            //Informar de que tiene que introducir una cantidad o seleccionar un peso
                            u.mensajesUsuario('Introduzca una cantidad o seleccione un peso para el producto');
                        } else {
                            let pedido = {};
                            //Nombre producto.
                            pedido.nombre = e.target.parentNode.parentNode.children[1].innerHTML;
                            //Precio producto.
                            pedido.precio = parseFloat(e.target.parentNode.parentNode.children[3].innerHTML);
                            console.log(pedido.precio);
                            if (documento.data().venta === 'unidad') {
                                pedido.tipo = 'Unidad';
                                //Cantidad en unidades.
                                pedido.cantidad = parseInt(cantidadFormulario);
                                pedido.total = pedido.cantidad * pedido.precio;
                                //Para dejar en valor por defecto el campo de formulario.
                                e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value = "";
                            } else {
                                pedido.tipo = 'Kg';
                                //Cantidad en gramos.
                                pedido.cantidad = parseFloat(e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value);
                                pedido.total = pedido.cantidad * pedido.precio;
                                //Para dejar en valor por defecto el campo de formulario.
                                e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value = "";
                            }
                            //Comprueba si el producto ya existe en el carrito para añadirlo.
                            productosEnELCarrito.map((v) => {
                                if (v.nombre == pedido.nombre) {
                                    //Así no se añade otro producto al pedido sino que se añade al ya existente.
                                    semaforo = false;
                                    v.cantidad += pedido.cantidad;
                                    v.total += pedido.total;
                                }
                            });
                            if (semaforo) productosEnELCarrito.push(pedido);
                            console.log(productosEnELCarrito);
                            //Para que nos muestre la cabecera y el pedido.
                            u.enviarProductoCarrito(productosEnELCarrito, usuarioDelPedido);
                            u.mensajesUsuario('Producto añadido al carrito.');
                        }

                    }, false);
                }
            });
            if (!productoEncontrado) {
                u.mostrarPartedeMenu(d.getElementById("productos"));
                u.mensajesUsuario('No se ha encontrado ningún producto');
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};


