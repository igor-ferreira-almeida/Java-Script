"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: "get",
                    value: function get(url) {
                        return new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            xhr.open("GET", url);

                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == EstadoRequisicao.REQUISICAO_CONCLUIDA_E_RESPOSTA_PRONTA) {
                                    if (xhr.status == 200) {
                                        resolve(JSON.parse(xhr.responseText));
                                    } else {
                                        reject(xhr.responseText);
                                    }
                                }
                            };

                            xhr.send();
                        });
                    }
                }, {
                    key: "post",
                    value: function post(url, dado) {
                        return new Promise(function (resolve, reject) {

                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", url, true);
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.onreadystatechange = function () {

                                if (xhr.readyState == EstadoRequisicao.REQUISICAO_CONCLUIDA_E_RESPOSTA_PRONTA) {

                                    if (xhr.status == 200) {

                                        resolve(JSON.parse(xhr.responseText));
                                    } else {

                                        reject(xhr.responseText);
                                    }
                                }
                            };
                            xhr.send(JSON.stringify(dado));
                        });
                    }
                }]);

                return HttpService;
            }();
        }
    };
});
//# sourceMappingURL=HttpService_deprecated.js.map