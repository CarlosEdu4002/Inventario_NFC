const ativosModel = require("../models/ativos.model");

// =====================
// Regras de negócio
// =====================

async function listarAtivos(tipo) {
    const ativos = await ativosModel.listarPorTipo(tipo);

    return ativos.map((ativo) => ({
        patrimonio: ativo.patrimonio,
        ...(ativo.dados || {})
    }));
}

async function buscarAtivo(tipo, patrimonio) {
    const ativo = await ativosModel.buscarPorPatrimonio(
        tipo,
        patrimonio
    );

    if (!ativo) {
        const erro = new Error("Ativo não encontrado");
        erro.status = 404;
        throw erro;
    }

    return {
        patrimonio: ativo.patrimonio,
        ...(ativo.dados || {})
    };
}

async function criarAtivo(tipo, body) {
    const { patrimonio, ...dados } = body;

    if (!patrimonio) {
        const erro = new Error("Patrimônio é obrigatório");
        erro.status = 400;
        throw erro;
    }

    const tipoEncontrado = await ativosModel.buscarTipoPorNome(tipo);

    if (!tipoEncontrado) {
        const erro = new Error("Tipo não encontrado");
        erro.status = 404;
        throw erro;
    }

    await ativosModel.criar(
        tipoEncontrado.id,
        patrimonio,
        dados
    );
}

async function atualizarAtivo(tipo, patrimonioAtual, body) {
    const { patrimonio, ...dados } = body;

    if (!patrimonio) {
        const erro = new Error("Patrimônio é obrigatório");
        erro.status = 400;
        throw erro;
    }

    const tipoEncontrado = await ativosModel.buscarTipoPorNome(tipo);

    if (!tipoEncontrado) {
        const erro = new Error("Tipo não encontrado");
        erro.status = 404;
        throw erro;
    }

    const ativoAtualizado = await ativosModel.atualizar(
        tipoEncontrado.id,
        patrimonioAtual,
        patrimonio,
        dados
    );

    if (!ativoAtualizado) {
        const erro = new Error("Ativo não encontrado");
        erro.status = 404;
        throw erro;
    }
}

async function removerAtivo(tipo, patrimonio) {
    const tipoEncontrado = await ativosModel.buscarTipoPorNome(tipo);

    if (!tipoEncontrado) {
        const erro = new Error("Tipo não encontrado");
        erro.status = 404;
        throw erro;
    }

    const ativoRemovido = await ativosModel.remover(
        tipoEncontrado.id,
        patrimonio
    );

    if (!ativoRemovido) {
        const erro = new Error("Ativo não encontrado");
        erro.status = 404;
        throw erro;
    }
}

module.exports = {
    listarAtivos,
    buscarAtivo,
    criarAtivo,
    atualizarAtivo,
    removerAtivo
};