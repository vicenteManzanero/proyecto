'use strict';
window.onload = () => {
    let d = document;
    let imagenes = ["../img/carrusel_historia/1.jpg", "../img/carrusel_historia/2.jpg", "../img/carrusel_historia/3.jpg", "../img/carrusel_historia/4.jpg", "../img/carrusel_historia/5.jpg", "../img/carrusel_historia/6.jpg"];
    function mostrar() {
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
    mostrar();
}