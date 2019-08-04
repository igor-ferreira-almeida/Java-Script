
var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";


var pacientes = document.querySelectorAll(".paciente");

for(var i = 0; i < pacientes.length; i++) {
  var peso = pacientes[i].querySelector(".info-peso").textContent;
  var altura = pacientes[i].querySelector(".info-altura").textContent;
  var imc = calculaIMC(peso, altura);
  var tdImc = pacientes[i].querySelector(".info-imc");

  var isPesoValido = validaPeso(peso);
  var isAlturaValida = validaAltura(altura);

  if(isPesoValido && isAlturaValida) {
    tdImc.textContent = imc;
  } else {
    if(!isPesoValido) {
      tdImc.textContent = "Peso inválido";
    }

    if(!isAlturaValida) {
      tdImc.textContent = "Altura inválida";
    }
    pacientes[i].classList.add("campo-invalido");
  }
}

titulo.addEventListener("click", mostraMensagem);

function mostraMensagem() {
  console.log("Evento click");
}


function calculaIMC(peso, altura) {
  var imc = 0;
  imc = peso / Math.pow(altura, 2);
  return imc.toFixed(2);
}


function validaNome(nome) {
  if(nome.length == 0) {
    return false;
  }
  return true;
}

function validaPeso(peso) {
  if(peso <= 0 || peso >= 1000) {
    return false;
  }
  return true;
}

function validaAltura(altura) {
  if(altura <= 0 || altura >= 3) {
    return false;
  }
  return true;
}
