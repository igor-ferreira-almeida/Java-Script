"use strict";

System.register(["./ConnectionFactory", "./HttpService", "../models/Negociacao", "../daos/NegociacaoDAO"], function (_export, _context) {
    "use strict";

    var ConnectionFactory, HttpService, Negociacao, NegociacaoDAO, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_daosNegociacaoDAO) {
            NegociacaoDAO = _daosNegociacaoDAO.NegociacaoDAO;
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

            _export("NegociacaoService", NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: "listNegociacoes",
                    value: function listNegociacoes() {
                        return Promise.all([this.listNegociacoesSemana(), this.listNegociacoesSemanaAnterior(), this.listNegociacoesSemanaRetrasada()]).then(function (periodos) {
                            var negociacoes = periodos.reduce(function (dados, periodo) {
                                return dados.concat(periodo);
                            }, []);
                            return negociacoes;
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: "listNegociacoesSemana",
                    value: function listNegociacoesSemana() {
                        var _this = this;

                        var promise = new Promise(function (resolve, reject) {
                            _this._http.get("negociacoes/semana").then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Não foi possível obter as negociações da semana");
                            });
                        });

                        return promise;
                    }
                }, {
                    key: "listar",
                    value: function listar() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            var dao = new NegociacaoDAO(connection);
                            dao.listaTodas();
                        }).catch(function () {
                            throw new Error("Não foi possível listar as negociações");
                        });
                    }
                }, {
                    key: "cadastrar",
                    value: function cadastrar(negociacao) {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            var dao = new NegociacaoDAO(connection);
                            dao.adiciona(negociacao).then(function () {
                                return "Negociação adicionada com sucesso";
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível adicionar a negociação");
                        });
                    }
                }, {
                    key: "apaga",
                    value: function apaga() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.apagaTodas();
                        }).then(function () {
                            return "Negociações apagadas com sucesso";
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível apagar a negociação");
                        });
                    }
                }, {
                    key: "listNegociacoesSemanaAnterior",
                    value: function listNegociacoesSemanaAnterior() {
                        var _this2 = this;

                        var promise = new Promise(function (resolve, reject) {
                            _this2._http.get("negociacoes/anterior").then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Não foi possível obter as negociações da semana anterior");
                            });
                        });

                        return promise;
                    }
                }, {
                    key: "listNegociacoesSemanaRetrasada",
                    value: function listNegociacoesSemanaRetrasada() {
                        var _this3 = this;

                        var promise = new Promise(function (resolve, reject) {
                            _this3._http.get("negociacoes/retrasada").then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Não foi possível obter as negociações da semana retrasada");
                            });
                        });

                        return promise;
                    }
                }, {
                    key: "importar",
                    value: function importar(listaAtual) {
                        return this.listNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return negociacao.equals(negociacaoExistente);
                                });
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível importar as negociações");
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export("NegociacaoService", NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map