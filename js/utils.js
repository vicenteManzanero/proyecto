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
export const comprobarDatos = (correo, password, telf = "") => {//Función creada para comprobar los datos de iniciar sesión y registrarse;
    var comprobacionCorreo = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo));//Comprobamos el correo electrónico.
    console.log(correo);
    console.log(password);

    var comprobarPassword = (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&*-])[A-Za-z\d@$!%*?&]{8,}$/.test(password));//Obligamos a una constraseña segura de mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
    var comprobacionTelf = (/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/).test(telf);
    console.log(comprobacionCorreo);
    console.log(comprobarPassword);
    console.log(comprobacionTelf);
    if (telf == "") return (comprobarPassword && comprobacionCorreo);//Para el inicio de sesión .
    else return (comprobarPassword && comprobacionCorreo && comprobacionTelf);//Para registrase por primera vez.

}
export const nuevoUsuarioJSON = (Correo, Telf) => {// Para crear el usuario con el formato deseado.
    return {
        correo: Correo,
        telefono: Telf,
        pedidos: ""

    }
}
export function mensajesUsuario(texto) {//Para comunicar al usuario todo lo que va ocurriendo
    let div = document.getElementById("comunicacion_usuario");
    div.classList.remove("hidden");
    div.innerHTML = texto;
    setTimeout(() => {
        div.classList.add("hidden");
    }, 3000);
}


export const openModal = (id1, id2) => {
    d.getElementById(`${id1}`).style.display = "block"
    d.getElementById(`${id2}`).style.display = "block"
    d.getElementById(`${id2}`).classList.add("show")
}
export const openModalArticulo = (id1, id2, datos) => {
    d.getElementById(`${id1}`).style.display = "block"
    d.getElementById(`${id2}`).style.display = "block"
    d.getElementById(`${id2}`).classList.add("show");
    d.getElementById('datosModalArticulo').innerHTML = `
    ${datos.imagen}<br>
    ${datos.nombre}<br>
    ${datos.precio}<br>
    `;

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

export const mostrarProducto = (objeto, n) => {
    let div = d.createElement('div');
    div.style.cursor = 'pointer';
    div.setAttribute('class', 'row ');
    div.setAttribute('data-toggle', 'modal');
    div.setAttribute('data-target', `modalArticulos${n}`);

    div.setAttribute('id', `fila${n}`);
    div.innerHTML = `
    <div class= "col d-flex align-items-center justify-content-center">${objeto.imagen}</div>
    <div class= "col d-flex align-items-center justify-content-center">${objeto.nombre}</div>
    <div class= "col d-flex align-items-center justify-content-center" id="alergenos${n}"></div>
    <div class= "col d-flex align-items-center justify-content-center">${objeto.precio} €</div>
    <div class= "col d-flex align-items-center justify-content-center" id="tipo${n}">
    
    </div>
    <div class= "col d-flex align-items-center justify-content-center">
    <button type="button" class="btn btn-success" id="boton${n}">Añadir</button>
    </div>
    `;
    d.getElementById('resultado').appendChild(div);
    let aler = d.createElement('div');
    aler.setAttribute('class', 'col d-flex align-items-center justify-content-center');
    for (let j = 0; j < objeto.alérgenos.length; j++) {
        aler.innerHTML += `${objeto.alérgenos[j]}<br>`;
    }
    d.getElementById(`alergenos${n}`).appendChild(aler);
    if (objeto.venta === 'peso') {
        let divTipo = d.createElement('div');
        divTipo.setAttribute('class', 'col d-flex align-items-center justify-content-center');
        divTipo.innerHTML = `<input type="text" class="form-control" placeholder="Cantidad" aria-describedby="basic-addon1">`;
        d.getElementById(`tipo${n}`).appendChild(divTipo);
    } else {
        let divTipo = d.createElement('div');
        divTipo.setAttribute('class', 'col d-flex align-items-center justify-content-center');
        divTipo.innerHTML = `
        <select class="form-select" aria-label="Default select example">
            <option selected>SELECCIONE</option>
            <option value="0.250">250 g</option>
            <option value="0.500">500 g</option>
            <option value="1">1 Kg</option>
            <option value="2">2 Kg</option>
        </select>
        `;
        d.getElementById(`tipo${n}`).appendChild(divTipo);
    }

}







export const crearCabecera = () => {
    let div = d.createElement('div');
    div.setAttribute('class', 'row');
    div.innerHTML = `
    <div class= "col d-flex justify-content-center cabeceraArticulo">FOTO</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">NOMBRE</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">ALÉRGENOS</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">PRECIO</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">CANTIDAD</div>
    <div class= "col d-flex justify-content-center cabeceraArticulo">AÑADIR</div>`;
    d.getElementById('cabeceraArticulos').appendChild(div);
}
