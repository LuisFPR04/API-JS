/* API info */
let filtro;
let objetoFiltrado;

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
    objetoFiltrado = JSON.parse(data)
    initial_response(data);
    })
    .catch(error => console.error(error));

});

/* Functions*/ 

function delRow() {
  var table = document.getElementById("tabla");
  var rowCount = table.rows.length;

  for (let i = rowCount - 1; i >= 0; i--) {
      table.deleteRow(i);
    }
} 

function createCells(objeto, tabla, i) {
  let nuevaFila = tabla.insertRow();
  let celda1 = nuevaFila.insertCell();
  let celda2 = nuevaFila.insertCell();
  let celda3 = nuevaFila.insertCell();
  let celda4 = nuevaFila.insertCell();
  if (nuevaFila.rowIndex % 2 == 0) {
    celda1.style.backgroundColor = "#C6DFE0";
    celda2.style.backgroundColor = "#C6DFE0";
    celda3.style.backgroundColor = "#C6DFE0";
    celda4.style.backgroundColor = "#C6DFE0";

    celda1.style.borderRight = "2px solid black";
    celda2.style.borderRight = "2px solid black";
    celda3.style.borderRight = "2px solid black";
    celda4.style.borderRight = "2px solid black";
    celda1.style.borderLeft = "2px solid black";
    celda2.style.borderLeft = "2px solid black";
    celda3.style.borderLeft = "2px solid black";
    celda4.style.borderLeft = "2px solid black";
  } else {
    celda1.style.backgroundColor = "#D2F0F1";
    celda2.style.backgroundColor = "#D2F0F1";
    celda3.style.backgroundColor = "#D2F0F1";
    celda4.style.backgroundColor = "#D2F0F1";

    celda1.style.borderRight = "2px solid black";
    celda2.style.borderRight = "2px solid black";
    celda3.style.borderRight = "2px solid black";
    celda4.style.borderRight = "2px solid black";
    celda1.style.borderLeft = "2px solid black";
    celda2.style.borderLeft = "2px solid black";
    celda3.style.borderLeft = "2px solid black";
    celda4.style.borderLeft = "2px solid black";
  }
  celda1.textContent = objeto[i].altSpellings[0];
  celda2.textContent = objeto[i].name.common;
  celda3.textContent = objeto[i].continents;
  celda4.textContent = objeto[i].population;
}

function initial_response(data){
    let tabla = document.getElementById("tabla");
    filtro = document.getElementById("camp1").value;

    delRow();

    var objeto = JSON.parse(data);
    for (i = 0; i < objeto.length; i++){

      if(filtro.toLowerCase() === `${objeto[i].region.toLowerCase()}`){
        createCells(objeto, tabla, i)
        
      } else if(filtro === null || filtro.trim()===""){
        createCells(objeto, tabla, i)
      }
    }
 }; 

 function desplegable(){
  let tabla = document.getElementById("tabla");
  let camp = document.getElementById("camp1").value.trim();

  delRow();

  var opcionSelec = document.getElementById("menu").value;
  var opcion = opcionSelec;
  if (camp === ""){
    switch(opcion){
      case "default":
          break;
      case "opcion 1":
          paises = objetoFiltrado.sort((a, b) => (a.name.common > b.name.common) ? 1 : -1);
          for (i = 0; i < objetoFiltrado.length; i++){
            createCells(paises, tabla, i)
          }

          /* This works weird */
          break;
      case "opcion 2":
        continentes = objetoFiltrado.sort((a, b) => (a.region > b.region) ? 1 : -1);
        for (i = 0; i < objetoFiltrado.length; i++){
          createCells(continentes, tabla, i)
          }
          break;
      case "opcion 3":
        poblacion = objetoFiltrado.sort((a, b) => (b.population - a.population));
        for (i = 0; i < objetoFiltrado.length; i++){
          createCells(poblacion, tabla, i)
          }
          break;
  }

  } if (camp.length > 0) {
    switch(opcion){
      case "default":
          break;
      case "opcion 1":
          paises = objetoFiltrado.sort((a, b) => (a.name.common > b.name.common) ? 1 : -1);
          for (i = 0; i < objetoFiltrado.length; i++){
            if (camp.toLowerCase() === `${paises[i].region.toLowerCase()}`){
              createCells(paises, tabla, i)
            }
            }
          break;
      case "opcion 2":
        continentes = objetoFiltrado.sort((a, b) => (a.region > b.region) ? 1 : -1);
        for (i = 0; i < objetoFiltrado.length; i++){
            createCells(continentes, tabla, i)
        }
          /* This works weird */
          break; 
      case "opcion 3":
        poblacion = objetoFiltrado.sort((a, b) => (b.population - a.population));
        for (i = 0; i < objetoFiltrado.length; i++){
          if (camp.toLowerCase() === `${poblacion[i].region.toLowerCase()}`){
            createCells(poblacion, tabla, i)
          }
          }
          break;
  }
  }
}

/* Asincronus Functions, button functions*/
function loadData() {
  let camp = document.getElementById("camp1").value.trim();
  var opcionSelec = document.getElementById("menu").value;
  
  if (camp.length > 0 && opcionSelec === "default" ){
    getCountryData()
        .then(data => {
            initial_response(data);
        })
        .catch(error => console.error(error));
  } if (opcionSelec != "default"){
    desplegable();
  }
  /*document.getElementById("camp1").value = "";
  document.getElementById("menu").value = "default"*/
}


/* Pruebas */
