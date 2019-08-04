
var pacientes = document.querySelectorAll(".paciente");
var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", function(event) {
  var alvoEvento = event.target;
  var paiDoAlvo = alvoEvento.parentNode;

  event.target.parentNode.classList.add("fade-out");
  setTimeout(function() {
      event.target.parentNode.remove();
  }, 500);
});

// pacientes.forEach(function(paciente) {
//   paciente.addEventListener("dblclick", function() {
//     console.log("Duplo click");
//     this.remove();
//   });
// });
