"use strict";

System.register(["../models/Negociacao"], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("NegociacaoDAO", NegociacaoDAO = function () {
                function NegociacaoDAO(connection) {
                    _classCallCheck(this, NegociacaoDAO);

                    this._connection = connection;
                    this._store = "negociacao";
                }

                _createClass(NegociacaoDAO, [{
                    key: "adiciona",
                    value: function adiciona(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var transaction = _this._connection.transaction([_this._store], "readwrite");
                            var store = transaction.objectStore(_this._store);
                            var request = store.add(negociacao);

                            request.onsuccess = function (e) {
                                console.log("Negociação incluída com sucesso");
                                resolve();
                            };

                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject("Não foi possível adicionar a negociação");
                            };
                        });
                    }
                }, {
                    key: "apagaTodas",
                    value: function apagaTodas() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var transaction = _this2._connection.transaction(_this2._store, "readwrite");
                            var store = transaction.objectStore(_this2._store);

                            var request = store.clear();

                            request.onsuccess = function (e) {
                                return resolve("Negociações removidas com sucesso");
                            };
                            request.onerror = function (e) {
                                return reject("Não foi possível remover as negociações");
                            };
                        });
                    }
                }, {
                    key: "listaTodas",
                    value: function listaTodas() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var transaction = _this3._connection.transaction(_this3._store, "readwrite");
                            var store = transaction.objectStore(_this3._store);

                            var cursor = store.openCursor();
                            var negociacoes = [];

                            cursor.onsuccess = function (event) {
                                var atual = event.target.result;

                                if (atual) {
                                    var dado = atual.value;
                                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                                    atual.continue();
                                } else {
                                    resolve(negociacoes);
                                }
                            };

                            cursor.onerror = function (event) {
                                console.log(event.target.error.name);
                                reject("Não foi possível listar as negociações");
                            };
                        });
                    }
                }]);

                return NegociacaoDAO;
            }());

            _export("NegociacaoDAO", NegociacaoDAO);
        }
    };
});
//# sourceMappingURL=NegociacaoDAO.js.map