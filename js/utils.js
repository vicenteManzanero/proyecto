'use strict';

export const mostrar = ()=> {
    let imagenes = ["../img/carrusel_historia/1.jpg", "../img/carrusel_historia/2.jpg", "../img/carrusel_historia/3.jpg", "../img/carrusel_historia/4.jpg", "../img/carrusel_historia/5.jpg", "../img/carrusel_historia/6.jpg"];
    let d = document;
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