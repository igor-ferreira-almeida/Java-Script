
import {Negociacao} from "../models/Negociacao";

export class NegociacaoDAO {

    constructor(connection) {
        this._connection = connection;
        this._store = "negociacao";

    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let transaction = this._connection.transaction([this._store], "readwrite");
            let store = transaction.objectStore(this._store);
            let request = store.add(negociacao);

            request.onsuccess = e => {
                console.log("Negociação incluída com sucesso");
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject("Não foi possível adicionar a negociação");
            };
        });
    }

    apagaTodas() {
        return new Promise((resolve, reject) => {
            let transaction = this._connection.transaction(this._store, "readwrite");
            let store = transaction.objectStore(this._store);

            let request = store.clear();

            request.onsuccess = e => resolve("Negociações removidas com sucesso");
            request.onerror = e => reject("Não foi possível remover as negociações");
        });
    }

    listaTodas() {
        return new Promise((resolve, reject) => {
            let transaction = this._connection.transaction(this._store, "readwrite");
            let store = transaction.objectStore(this._store);

            let cursor = store.openCursor();
            let negociacoes = [];

            cursor.onsuccess = event => {
                let atual = event.target.result;

                if(atual) {
                    var dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            };

            cursor.onerror = event => {
                console.log(event.target.error.name);
                reject("Não foi possível listar as negociações");
            };
        });
    }
}