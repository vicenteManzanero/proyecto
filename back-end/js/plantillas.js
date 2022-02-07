/*Este fichero nos proporciona plantillas*/ 
export function ProductoJSON(Nombre,Precio,Categoria,tipoDeVenta,iva,Imagen,Alergenos){//Creamos los objetos que recibimos por formulario.
    return {nombre: Nombre,
            precio: Precio,
            categoria: Categoria,
            venta: tipoDeVenta,
            IVA: iva,
            imagen: Imagen,
            alérgenos: Alergenos
        }
}
export function mensajesUsuario(texto){//Para comunicar al usuario todo lo que va ocurriendo
    let div=  document.getElementById("comunicacion_usuario");
    div.classList.remove("hidden");
    div.innerHTML= texto;
    setTimeout(() => {
       div.classList.add("hidden");   
    }, 3000);
   }
