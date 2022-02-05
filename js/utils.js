'use strict';
let d = document;
export const mostrar = () => {
    let imagenes = ["../img/carrusel_historia/1.jpg", "../img/carrusel_historia/2.jpg", "../img/carrusel_historia/3.jpg", "../img/carrusel_historia/4.jpg", "../img/carrusel_historia/5.jpg", "../img/carrusel_historia/6.jpg"];
    let i = 0;
    setInterval(() => {
        let img = d.createElement("img");
        img.setAttribute("src", imagenes[i]);
        img.setAttribute("class", "carrusel");
        d.getElementById('carrusel').innerHTML = img.outerHTML;
        i++;
        if (i >= imagenes.length) {
            i = 0;
        }
    }, 3000);
}
export const comprobarDatos=(correo, password, telf="")=>{//Función creada para comprobar los datos de iniciar sesión y registrarse;
    var comprobacionCorreo=(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo));//Comprobamos el correo electrónico.
    console.log(correo);
    console.log(password);
    
    var comprobarPassword=(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&*-])[A-Za-z\d@$!%*?&]{8,}$/.test(password));//Obligamos a una constraseña segura de mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
    var comprobacionTelf=(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/).test(telf);
    console.log(comprobacionCorreo);
    console.log(comprobarPassword);
    console.log(comprobacionTelf);
    if(telf=="") return (comprobarPassword && comprobacionCorreo);//Para el inicio de sesión .
    else  return (comprobarPassword && comprobacionCorreo && comprobacionTelf);//Para registrase por primera vez.

}
export const nuevoUsuarioJSON=(Correo,Telf)=>{// Para crear el usuario con el formato deseado.
    return { correo:Correo,
        telefono:Telf,
        pedidos:""

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


export const openModal = (id1,id2) => {
    document.getElementById(`${id1}`).style.display = "block"
    document.getElementById(`${id2}`).style.display = "block"
    document.getElementById(`${id2}`).classList.add("show")
}
export const closeModal = (id1, id2) => {
    d.getElementById(`${id1}`).style.display = "none"
    d.getElementById(`${id2}`).style.display = "none"
    d.getElementById(`${id2}`).classList.remove("show")
}
var modal = d.getElementById('exampleModal');
var modal2 = d.getElementById('exampleModal2');
window.onclick = function (event) {
    if (event.target == modal || event.target == modal2) {
        closeModal('backdrop', 'exampleModal2');
        closeModal('backdrop', 'exampleModal');
    }
}


export const mostrarProducto = (objeto,n) =>{
    let div = d.createElement('div');
    div.setAttribute('class','row');
    div.setAttribute('id',`fila${n}`);
    div.innerHTML = `
    <div class= "col d-flex align-items-center justify-content-center">Foto : ${objeto.imagen}</div>
    <div class= "col d-flex align-items-center justify-content-center"> Nombre : ${objeto.nombre}</div>
    <div class= "col d-flex align-items-center justify-content-center"> Alergenos : ${objeto.alérgenos[0]}</div>
    <div class= "col d-flex align-items-center justify-content-center"> Precio: ${objeto.precio}</div>
    <div class= "col d-flex align-items-center justify-content-center">
    <input type="text" class="form-control" placeholder="Cantidad" aria-describedby="basic-addon1">
    </div>
    <div class= "col d-flex align-items-center justify-content-center">
    <button type="button" class="btn btn-success">Añadir</button>
    </div>
    
    `;
    d.getElementById('resultado').appendChild(div);

}
