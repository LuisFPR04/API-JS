
function paises(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        response(xhr.responseText);
    }
    };

    xhr.open("GET", "https://restcountries.com/v3.1/all", true);
    xhr.send();
}

function response(res){
   console.log("llamada api resuelta");

   let tabla = document.getElementById("tabla");


   let objeto = JSON.parse(res);
   for (i = 0; i < objeto.length; i++){
   // console.log(`${objeto[i].name.common} aaaaaaaaaaaaaaaaaaaaaaaaaaaaa`)
    let nuevaFila = tabla.insertRow();
    let celda1 = nuevaFila.insertCell();
    let celda2 = nuevaFila.insertCell();
    let celda3 = nuevaFila.insertCell();
    celda1.textContent = objeto[i].altSpellings[0];
    celda2.textContent = objeto[i].name.common;
    celda3.textContent = objeto[i].region;

   }
}