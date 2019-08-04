import {ConnectionFactory} from "./ConnectionFactory";
import {HttpService} from "./HttpService";

import {Negociacao} from "../models/Negociacao";
import {NegociacaoDAO} from "../daos/NegociacaoDAO";

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    listNegociacoes() {
        return Promise.all([
            this.listNegociacoesSemana(),
            this.listNegociacoesSemanaAnterior(),
            this.listNegociacoesSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }

    listNegociacoesSemana() {
        let promise = new Promise((resolve, reject) => {
            this._http.get("negociacoes/semana").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            }).catch(erro => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana");
            });
        });

        return promise;
    }

    listar() {
        return ConnectionFactory.getConnection()
            .then(connection => {
                let dao = new NegociacaoDAO(connection);
                dao.listaTodas()
            }).catch(() => {
                throw new Error("Não foi possível listar as negociações");
            });
    }

    cadastrar(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => {
                let dao = new NegociacaoDAO(connection);
                dao.adiciona(negociacao).then(() => "Negociação adicionada com sucesso");
            }).catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível adicionar a negociação");
            });
    }

    apaga() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodas())
            .then(() => "Negociações apagadas com sucesso")
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível apagar a negociação");
            })

    }

    listNegociacoesSemanaAnterior() {
        let promise = new Promise((resolve, reject) => {
            this._http.get("negociacoes/anterior").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            }).catch(erro => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana anterior");
            });
        });

        return promise;
    }

    listNegociacoesSemanaRetrasada() {
        let promise = new Promise((resolve, reject) => {
            this._http.get("negociacoes/retrasada").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            }).catch(erro => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana retrasada");
            });
        });

        return promise;
    }

    importar(listaAtual) {
        return this.listNegociacoes()
            .then(negociacoes => negociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExistente => negociacao.equals(negociacaoExistente))
            )
        ).catch(erro => {
            console.log(erro);
            throw new Error("Não foi possível importar as negociações");
        });
    }
}