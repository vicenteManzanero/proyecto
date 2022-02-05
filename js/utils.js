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


export const openModal = (id1,id2) => {
    document.getElementById(`${id1}`).style.display = "block"
    document.getElementById(`${id2}`).style.display = "block"
    document.getElementById(`${id2}`).classList.add("show")
}
export const closeModal = (id1,id2) => {
    document.getElementById(`${id1}`).style.display = "none"
    document.getElementById(`${id2}`).style.display = "none"
    document.getElementById(`${id2}`).classList.remove("show")
}
var modal = document.getElementById('exampleModal');
var modal2 = document.getElementById('exampleModal2');
window.onclick = function (event) {
    if (event.target == modal ||event.target == modal2 ) {
        closeModal('backdrop','exampleModal2');
        closeModal('backdrop','exampleModal');
    }
}
