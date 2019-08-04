var botaoAdicionarPaciente = document.querySelector("#adicionar-paciente");

botaoAdicionarPaciente.addEventListener("click", function(event) {
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");
  var paciente = obtemPacienteDoFormulario(form);

  if(!validaPaciente(paciente)) {
    alert("Paciente inválido");
    return;
  }

  var erros = validaPaciente(paciente);

  if(erros.length > 0) {
    exibeMensagensErro(erros);

    return;
  }

  adicionaLinha(trPaciente);
  form.reset();
  var ul = document.querySelector("#mensagens-erros");
  ul.innerHTML = '';
});


function obtemPacienteDoFormulario(form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaIMC(form.peso.value, form.altura.value)
  }
  return paciente;
}

function montaLinhaTabela(paciente) {
  var trPaciente = document.createElement("tr");
  trPaciente.classList.add("paciente");

  trPaciente.appendChild(montaColunaTabela("info-nome", paciente.nome));
  trPaciente.appendChild(montaColunaTabela("info-nome", paciente.peso));
  trPaciente.appendChild(montaColunaTabela("info-nome", paciente.altura));
  trPaciente.appendChild(montaColunaTabela("info-nome", paciente.gordura));
  trPaciente.appendChild(montaColunaTabela("info-nome", paciente.imc));

  return trPaciente;
}

function montaColunaTabela(classe, texto) {
  var td = document.createElement("td");
  td.classList.add(classe);
  td.textContent = texto;

  return td;
}

function adicionaLinha(paciente) {
  var trPaciente = montaLinhaTabela(paciente);
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(trPaciente);
}

function validaPaciente(paciente) {

  erros = [];

  if(!validaNome(paciente.nome)) {
    erros.push("Nome é inválido");
  }

  if(!validaPeso(paciente.peso)) {
    erros.push("Peso é inválido");
  }
  if(!validaAltura(paciente.altura)) {
    erros.push("Altura é inválido");
  }

  return erros;
}

function exibeMensagensErro(erros) {
  var ul = document.querySelector("#mensagens-erros");
  ul.innerHTML = "";
  erros.forEach(function(erro) {
    var li = document.createElement("li");
    li.classList.add("mensagem-erro");
    li.textContent = erro;
    ul.appendChild(li);
  });
}
