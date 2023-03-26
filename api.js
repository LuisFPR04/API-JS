/* API info */

function getCountryData() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject("Error en la solicitud");
          }
        }
      };
  
      xhr.open("GET", "https://restcountries.com/v3.1/all", true);
      xhr.send();
    });
}
document.addEventListener('DOMContentLoaded', function() {
    
    getCountryData()
    .then(data => {
    initial_response(data);
    })
    .catch(error => console.error(error));

});

/* Functions*/ 

function initial_response(data){
    let tabla = document.getElementById("tabla");
 
    var objeto = JSON.parse(data);
    for (i = 0; i < objeto.length; i++){
     let nuevaFila = tabla.insertRow();
     let celda1 = nuevaFila.insertCell();
     let celda2 = nuevaFila.insertCell();
     let celda3 = nuevaFila.insertCell();
     celda1.textContent = objeto[i].altSpellings[0];
     celda2.textContent = objeto[i].name.common;
     celda3.textContent = objeto[i].continents;
    }
 }; 

let regionText = '';
function handleKeyDown(event) {
    if (event.key === "Enter") {
        regionText = event.target.value;
        console.log(regionText)
    }
  } 

    function prueba(data){
    var objeto = JSON.parse(data)
    var table = document.getElementById("tabla");
    var rowCount = table.rows.length;
    for (let i = rowCount - 1; i >= 0; i--) {
        table.deleteRow(i);
    }
    for (i = 0; i < objeto.length; i++){
        if (objeto[i].region === `${regionText}`){
          let nuevaFila = tabla.insertRow();
          let celda1 = nuevaFila.insertCell();
          let celda2 = nuevaFila.insertCell();
          let celda3 = nuevaFila.insertCell();
          celda1.textContent = objeto[i].altSpellings[0];
          celda2.textContent = objeto[i].name.common;
          celda3.textContent = objeto[i].continents;
        }
  }
}

/* Asincronus Functions, button functions*/

function EjecutaPrueba() {
    getCountryData()
        .then(data => {
            prueba(data);
        })
        .catch(error => console.error(error));
};

function loadData() {
    getCountryData()
        .then(data => {
            initial_response(data);
        })
        .catch(error => console.error(error));
}

/* function delRow() {
    var table = document.getElementById("tabla");
    var rowCount = table.rows.length;
    for (let i = rowCount - 1; i >= 0; i--) {
        table.deleteRow(i);
      }
  } */