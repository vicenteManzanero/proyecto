"use strict";
let d = document;
function tiempoEnCelsius(tiempo){//Ya que nos da el tiempo en kelvin.
    var celsius= tiempo-273.15;
    return Math.round(celsius);
 }
 export const mostrarTiempo = async () => {
    try {
    const API = "79c68d0e95b5caad6bc7869bb373bc56";
    let url = `https://api.openweathermap.org/data/2.5/weather?id=2513195&appid=${API}`;
    let tiempo = await (await fetch(`${url}`)).json();
    let urlIcono =  `http://openweathermap.org/img/wn/${tiempo.weather[0].icon}@2x.png`;
    let divTiempo = d.createElement('div');
    divTiempo.innerHTML = `<h3> El tiempo en ${tiempo.name}</h3>`;
    divTiempo.innerHTML += `</br>`;
    divTiempo.innerHTML += `<img src="${urlIcono}" alt="Error al cargar imagen" />`;
    divTiempo.innerHTML += `</br>`;
    divTiempo.innerHTML += `<p class="tiempo">La temperatura actual hoy es ${tiempoEnCelsius(tiempo.main.temp)}ºC
     y la sensación térmica es ${tiempoEnCelsius(tiempo.main.feels_like)}ºC </p></br>`;
    divTiempo.innerHTML += `<p class="tiempo">La temperatura máxima hoy será ${tiempoEnCelsius(tiempo.main.temp_max)}ºC
     y la mínima será ${tiempoEnCelsius(tiempo.main.temp_min)}ºC </p>`;
     d.getElementById('tiempo').appendChild(divTiempo);
      } catch (error) {
        console.log(`Ha ocurrido un error: ${error}`);
      }
}


