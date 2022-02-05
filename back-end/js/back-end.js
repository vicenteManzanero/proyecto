
<<<<<<< HEAD
'use strict';
/* En este archivo tendremos la posibilidad de realizar un CRUD completo sobre los productos ya que a este archivo solo tiene permiso para acceder el admin*/ 
=======

/* En este archivo tendremos la posibilidad de realizar un CRUD completo sobre los productos ya que a este archivo solo tiene permiso para acceder el admin*/
>>>>>>> 97df775eef1dff7a365e72234ef8887f58fae416
import { app } from "../../js/fireBase.js";
import {
  getFirestore,
  collection, getDocs, query,
  where, orderBy, addDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { ProductoJSON, mensajesUsuario } from "./plantillas.js";
window.onload = () => {
  var d = document;
  const db = getFirestore(app);
  const productos = collection(db, "Productos");

  const guardarProducto = async (productos, productoCreado) => {
    const ProductoGuardado = await addDoc(productos, productoCreado);
    console.log(`Producto guardado con el id ${ProductoGuardado.data().nombre}`);
    mensajesUsuario(`Producto añadido con éxito `);
  };

  /*Botones   */
  var anyadir = d.getElementById("anyadir");
  var modificar = d.getElementById("modificar");
  var eliminar = d.getElementById("eliminar");
  var crear = d.getElementById("crear");
  crear.addEventListener("click", () => {
    /**/
    var nombre = d.getElementById("nombreProducto").value;
    var precio = d.getElementById("precio").value;
    var categoria = d.getElementById("categoria").value;
    var foto = d.getElementById("imagen").value;
    var tipoVenta = d.querySelector("input[type='radio']:checked").value;
    var IVA = d.getElementById("IVA").value;
    var chequeados = d.querySelectorAll("input[type='checkbox']:checked");
    var alergenos = [];
    chequeados.forEach((element) => { alergenos.push(element.value); });
    const productoNuevo = ProductoJSON(nombre, precio, categoria, tipoVenta, IVA, foto, alergenos);
    //console.log(productoNuevo);
    guardarProducto(productos, productoNuevo);
  }, false);

}