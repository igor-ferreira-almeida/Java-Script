
var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function() {
  console.log("buscar...");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

  xhr.addEventListener("load", function() {
    var erroAjax = document.querySelector("#erro-ajax");
    if(xhr.status == 200) {
      erroAjax.classList.add("invisible");
      var resposta = xhr.responseText;
      console.log(typeof resposta);
      console.log(resposta);
      var pacientes = JSON.parse(resposta);

      pacientes.forEach(function(paciente) {
          adicionaLinha(paciente);
      });

      console.log(typeof pacientes);
    } else {
      erroAjax.classList.remove("invisible");
      console.log(xhr.status);
      console.log(xhr.responseText);
    }

  });
  xhr.send();

});
