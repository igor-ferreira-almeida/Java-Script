"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var EstadoRequisicao;
    return {
        setters: [],
        execute: function () {
            EstadoRequisicao = Object.freeze({
                REQUISICAO_NAO_INICIADA: 0,
                CONEXAO_ESTABELECIDA: 1,
                REQUISICAO_RECEBIDA: 2,
                PROCESSANDO_REQUISICAO: 3,
                REQUISICAO_CONCLUIDA_E_RESPOSTA_PRONTA: 4
            });
        }
    };
});
//# sourceMappingURL=EstadoRequisicao.js.map