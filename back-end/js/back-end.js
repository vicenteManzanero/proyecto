
'use strict';
/* En este archivo tendremos la posibilidad de realizar un CRUD completo sobre los productos ya que a este archivo solo tiene permiso para acceder el admin*/ 
import { app,autentificacion } from "../../js/fireBase.js";
import {
  getFirestore,
  collection, getDocs, query,onSnapshot,setDoc,
  where, orderBy, addDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { ProductoJSON, mensajesUsuario } from "./plantillas.js";
import { crearCabecera, mostrarProducto } from "../../js/utils.js";


window.onload = () => {
  var d = document;

  const db = getFirestore(app);
  const productos = collection(db, "Productos");
  

  const guardarProducto = async (productos, productoCreado) => {
    const ProductoGuardado = await addDoc(productos, productoCreado);
    console.log(`Producto guardado con el id ${ProductoGuardado.id}`);
    mensajesUsuario(`Producto añadido con éxito `);
  };

  const borrarDoc = async (id) => {
    try{
      await deleteDoc(doc(productos, id));
    }catch(error){
      console.log(error.message);
    }

  };
  
  const ActulizarProducto = async (id,JSON) => {//Funcion necesaria para actulizar el producto.
    const productoId = await doc(productos, id);
   
     await setDoc(productoId, JSON  );
   
  };


  /*Botones */
  var logout= d.getElementById("logout");
  var anyadir = d.getElementById("anyadir");
  var formAnyadir=d.getElementById("anyadirProducto");
  var modificar = d.getElementById("modificar");
  var formModificarProducto= d.getElementById("modificarProducto");
  var eliminar = d.getElementById("eliminar");
  var crear = d.getElementById("crear");
var  divBuscar= d.getElementById("buscarproducto");
var botonBuscar= d.getElementById("buscarP");
 var eliminarProducto= d.getElementById("eliminarProducto");
var modificarM=d.getElementById("modificarM");
 var eliminarProductoSelecionado=d.getElementById("eliminarProductoSelecionado");

 var idProductoEliminado= d.getElementById("idProductoEliminado");
 var idProductoModificado= d.getElementById("idProductoModificado");





  anyadir.addEventListener("click",()=>{//Para que nos muestre la información necesaria y oculte el resto.
    if(!anyadir.classList.contains("seleccionado")){
      anyadir.classList.toggle("seleccionado");
      crear.classList.remove("hidden");
      formAnyadir.classList.remove("hidden");
      formModificarProducto.classList.add("hidden");
      modificar.classList.remove("seleccionado");
      eliminar.classList.remove("seleccionado");
      divBuscar.classList.add("hidden");
      eliminarProducto.classList.add("hidden");
    }
  },false);

  modificar.addEventListener("click",()=>{//Para que nos muestre la información necesaria y oculte el resto.
    if(!modificar.classList.contains("seleccionado")){
      modificar.classList.toggle("seleccionado");
      eliminar.classList.remove("seleccionado");
      anyadir.classList.remove("seleccionado");
      formAnyadir.classList.add("hidden");
      crear.classList.add("hidden");
      formModificarProducto.classList.remove("hidden");
      divBuscar.classList.remove("hidden");
      eliminarProducto.classList.add("hidden");
    }
  },false);

  eliminar.addEventListener("click",()=>{//Para que nos muestre la información necesaria y oculte el resto.
    if(!eliminar.classList.contains("seleccionado")){
      formAnyadir.classList.add("hidden");
      eliminar.classList.toggle("seleccionado");
      modificar.classList.remove("seleccionado");
      anyadir.classList.remove("seleccionado");
      crear.classList.add("hidden");
      formModificarProducto.classList.add("hidden");
      divBuscar.classList.remove("hidden");
      eliminarProducto.classList.remove("hidden");
    }
  },false);


  crear.addEventListener("click", () => {
    var nombre = d.getElementById("nombreProducto").value;
    var precio = d.getElementById("precio").value;
    var categoria = d.getElementById("categoria").value;
    var foto = d.getElementById("imagen").value;
    var tipoVenta = d.querySelector("input[type='radio']:checked").value;
    var IVA = d.getElementById("IVA").value;
    var chequeados = d.querySelectorAll("#anyadirProducto input[type='checkbox']:checked");
    var alergenos = [];
    chequeados.forEach((element) => { alergenos.push(element.value); });
    const productoNuevo = ProductoJSON(nombre, precio, categoria, tipoVenta, IVA, foto, alergenos);
   // console.log(productoNuevo);
   guardarProducto(productos, productoNuevo);
  }, false);
  botonBuscar.addEventListener("click",async()=>{

    let cabeceraArticulos=d.getElementById("cabeceraArticulos");
    cabeceraArticulos.innerHTML="";
    let articulos=d.getElementById("resultado");
    articulos.innerHTML="";
    try{
  crearCabecera();
    const consulta = await query(productos, where('nombre', '!=', ""));
    let nombreBusqueda=d.getElementById("buscar");
    const documentos = await onSnapshot(consulta, (col) => {
      col.docs.map((documento, index) => {
        if(documento.data().nombre.toUpperCase().includes(nombreBusqueda.value.toUpperCase())) {
          mostrarProducto(documento.data(), index);
       
            d.getElementById(`boton${index}`).addEventListener('click', (e) => {
           
              if(modificar.classList.contains("seleccionado")){
              var chequeados = d.querySelectorAll("#modificarProducto input[type='checkbox']");
          
              idProductoModificado.value=documento.id;
              console.log(idProductoModificado.value);
              var alergenos= documento.data().alérgenos;
              for(let i=0 ; i<chequeados.length;i++){
                chequeados[i].checked=false;
                for(let k=0; k<alergenos.length;k++){
                  console.log( chequeados[i].value==alergenos[k]);
                  if( chequeados[i].value==alergenos[k]){
                    console.log(` añado ${ chequeados[i].value}`);
                    chequeados[i].checked=true;
                  }           
                }
              }
              d.getElementById("nombreProductoM").value=documento.data().nombre;
          d.getElementById("precioM").value=documento.data().precio;
          d.getElementById("categoriaM").value=documento.data().categoria;
          d.getElementById("imagenM").value=documento.data().imagen;//funciona pero ahora hay muchos productos que no tienen nada definido en este campo
          let radio =d.querySelectorAll("input[name='radioM']");
              if(radio[0].value===documento.data().venta) {
                radio[0].setAttribute("checked"," ");
                radio[1].removeAttribute("checked");
              }
              else {
                radio[1].setAttribute("checked"," ");
                radio[0].removeAttribute("checked");
              }
       d.getElementById("IVAM").value=documento.data().IVA;
          /*     if (documento.data().venta === 'peso') {
                  console.log(e.target.parentNode.parentNode.children[4].children[0].childNodes[0].value);
              } else {
                  console.log(e.target.parentNode.parentNode.children[4].children[0].childNodes[1].value);
              } */
              
            }
            else if(eliminar.classList.contains("seleccionado")){//Añadimos al formulario el nombre a eliminar de la base de datos
             
              idProductoEliminado.value= documento.id;
              console.log(idProductoEliminado.value);
              d.getElementById("nombreProductoE").value=documento.data().nombre;
            }
          }, false);
          
         
    
        }
      });
  });    
  d.getElementById("nombreProductoE").value="";
  d.getElementById("nombreProductoM").value="";
}catch (error) {
console.log(error.message);
}

  },false);


  eliminarProductoSelecionado.addEventListener("click",()=>{
borrarDoc(idProductoEliminado.value);
let cabeceraArticulos=d.getElementById("cabeceraArticulos");
cabeceraArticulos.innerHTML="";
let articulos=d.getElementById("resultado");
articulos.innerHTML="";
d.getElementById("nombreProductoM").value="";
  },false);

  modificarM.addEventListener("click",()=>{
   
   //Datos necesarios para modificar el producto completo.
    console.log(idProductoModificado.value);
    var nombre=(d.getElementById("nombreProductoM").value);
    var precio=(d.getElementById("precioM").value);
   var categoria= (d.getElementById("categoriaM").value);
    var imagen=(d.getElementById("imagenM").value);
    var tipo=( d.querySelector("input[name='radioM']:checked").value);
    var IVA=(  d.getElementById("IVAM").value);
    var chequeados =d.querySelectorAll("#modificarProducto input[type='checkbox']:checked");
  var alergenos = [];
    chequeados.forEach((element) => { alergenos.push(element.value); });
   
 var productoModificadoJSON=ProductoJSON(nombre,precio,categoria,tipo,IVA,imagen,alergenos);
 //console.log(productoModificadoJSON);
 ActulizarProducto(idProductoModificado.value,productoModificadoJSON);
 let cabeceraArticulos=d.getElementById("cabeceraArticulos");
 cabeceraArticulos.innerHTML="";
 let articulos=d.getElementById("resultado");
 articulos.innerHTML=" ";
 d.getElementById("nombreProductoM").value="";
    
      },false);

  const cerrarSesion = () => {//Para cerrar la sesión indicada.
    autentificacion
      .signOut()
      .then(() => {   
        window.location.href=("../../index.html");
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  logout.addEventListener("click",()=>{
    cerrarSesion();
  })

}