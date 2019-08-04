
/**
0: requisição ainda não iniciada.
1: conexão com o servidor estabelecida.
2: requisição recebida.
3: processando requisição.
4: requisição concluída e a resposta esta pronta.
*/
const EstadoRequisicao = Object.freeze({
    REQUISICAO_NAO_INICIADA : 0,
    CONEXAO_ESTABELECIDA : 1,
    REQUISICAO_RECEBIDA : 2,
    PROCESSANDO_REQUISICAO : 3,
    REQUISICAO_CONCLUIDA_E_RESPOSTA_PRONTA : 4
});