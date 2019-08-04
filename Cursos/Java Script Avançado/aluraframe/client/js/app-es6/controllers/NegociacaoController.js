import {ListaNegociacoes} from "../models/ListaNegociacoes";
import {Mensagem} from "../models/Mensagem";
import {Negociacao} from "../models/Negociacao";

import {NegociacaoView} from "../views/NegociacaoView";
import {MensagemView} from "../views/MensagemView";

import {NegociacaoService} from "../services/NegociacaoService";

import {DateHelper} from "../helpers/DateHelper";
import {Bind} from "../helpers/Bind";

class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._form = $(".form");
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._service = new NegociacaoService();

    this._ordemAtual = '';

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacaoView($("#negociacoesView")),
      'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
    );

    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
    this._init();
  }

  _init() {
    this._service.listar().then(negociacoes => {
      negociacoes.forEach(negociacao => {
        this._listaNegociacoes.adiciona(negociacao);
      });
    }).catch(erro => this._mensagem.texto = erro);

    setInterval(() => this.importar(), 3000);
  }

  importar() {
    this._service.importar(this._listaNegociacoes.negociacoes)
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = "Negociações importadas com sucesso";
      }).catch(erro => this._mensagem.texto = erro);
  }

  adiciona(event) {
    event.preventDefault();
    let negociacao = this._criaNegociacao();
    
    this._service.cadastrar(negociacao).then(mensagem => {
      this._listaNegociacoes.adiciona(negociacao);
      this._mensagem.texto = mensagem;
      this._limpaFormulario();
    }).catch(erro => this._mensagem.texto = erro);
  }

  apaga() {
    this._service.apaga().then(mensagem => {
      this._mensagem.texto = mensagem;
      this._listaNegociacoes.esvazia();
    }).catch(erro => this._mensagem.texto = erro);
  }

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  _limpaFormulario() {
    this._form.reset();
    this._inputData.focus();
  }
}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
  return negociacaoController;
}