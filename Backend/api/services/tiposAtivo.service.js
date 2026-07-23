const tiposAtivoModel = require("../models/tiposAtivo.model");

function criarErro(mensagem, status) {
    const erro = new Error(mensagem);
    erro.status = status;

    return erro;
}

function validarId(valor, campo) {
    const id = Number(valor);

    if (!Number.isInteger(id) || id <= 0) {
        throw criarErro(`${campo} inválido`, 400);
    }

    return id;
}

async function validarCategoria(categoriaId) {
    const existe = await tiposAtivoModel.categoriaExiste(categoriaId);

    if (!existe) {
        throw criarErro("Categoria não encontrada", 404);
    }
}

async function listarTipos() {
    return tiposAtivoModel.listar();
}

async function listarTiposPorCategoria(categoriaIdInformado) {
    const categoriaId = validarId(
        categoriaIdInformado,
        "ID da categoria"
    );

    await validarCategoria(categoriaId);

    return tiposAtivoModel.listarPorCategoria(categoriaId);
}

async function buscarTipo(idInformado) {
    const id = validarId(idInformado, "ID do tipo de ativo");

    const tipo = await tiposAtivoModel.buscarPorId(id);

    if (!tipo) {
        throw criarErro("Tipo de ativo não encontrado", 404);
    }

    return tipo;
}

async function criarTipo(body) {
    const categoriaId = validarId(
        body.categoria_id,
        "ID da categoria"
    );

    const nome = body.nome?.trim();

    if (!nome) {
        throw criarErro(
            "Nome do tipo de ativo é obrigatório",
            400
        );
    }

    await validarCategoria(categoriaId);

    return tiposAtivoModel.criar(categoriaId, nome);
}

async function atualizarTipo(idInformado, body) {
    const id = validarId(idInformado, "ID do tipo de ativo");

    const categoriaId = validarId(
        body.categoria_id,
        "ID da categoria"
    );

    const nome = body.nome?.trim();

    if (!nome) {
        throw criarErro(
            "Nome do tipo de ativo é obrigatório",
            400
        );
    }

    await validarCategoria(categoriaId);

    const tipo = await tiposAtivoModel.atualizar(
        id,
        categoriaId,
        nome
    );

    if (!tipo) {
        throw criarErro("Tipo de ativo não encontrado", 404);
    }

    return tipo;
}

async function removerTipo(idInformado) {
    const id = validarId(idInformado, "ID do tipo de ativo");

    const tipo = await tiposAtivoModel.remover(id);

    if (!tipo) {
        throw criarErro("Tipo de ativo não encontrado", 404);
    }
}

module.exports = {
    listarTipos,
    listarTiposPorCategoria,
    buscarTipo,
    criarTipo,
    atualizarTipo,
    removerTipo
};