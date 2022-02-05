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
export const openModal = (id1, id2) => {
    d.getElementById(`${id1}`).style.display = "block"
    d.getElementById(`${id2}`).style.display = "block"
    d.getElementById(`${id2}`).classList.add("show")
}
export const closeModal = (id1, id2) => {z
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
