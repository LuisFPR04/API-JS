function paises(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        initial_response(xhr.responseText);
    }};

    xhr.open("GET", "https://restcountries.com/v3.1/all", true);
    xhr.send();
}

function initial_response(res){
   console.log("llamada api resuelta");

   let tabla = document.getElementById("tabla");

   var objeto = JSON.parse(res);
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
};

/*document.addEventListener('DOMContentLoaded', () => {
    const btnDelTables = document.querySelector('#btnDelTables');
    btnDelTables.addEventListener('click', () => {
      const tabla = document.querySelector('#tabla');
      const filas = tabla.querySelectorAll('tr');
  
        filas.forEach((fila) => {
            const cellsToEliminate = fila.querySelectorAll('td');
            cellsToEliminate.forEach((cell) => {
            cell.remove();
            });
        });
    });
  }); */

document.addEventListener('DOMContentLoaded', () => {
    const miInput = document.getElementById("camp1");
    miInput.addEventListener("input", (event) => {
    const valor = event.target.value;
    console.log("El valor actual del input es: ", valor);
});
});



  
  
  
  
  
  
  