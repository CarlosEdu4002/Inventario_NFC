const categoriasModel = require("../models/categorias.model");

async function listarCategorias() {
    return categoriasModel.listar();
}

async function buscarCategoria(id) {
    const categoria = await categoriasModel.buscarPorId(id);

    if (!categoria) {
        const erro = new Error("Categoria não encontrada");
        erro.status = 404;
        throw erro;
    }

    return categoria;
}

async function criarCategoria(body) {
    const nome = body.nome?.trim();

    if (!nome) {
        const erro = new Error("Nome da categoria é obrigatório");
        erro.status = 400;
        throw erro;
    }

    return categoriasModel.criar(nome);
}

async function atualizarCategoria(id, body) {
    const nome = body.nome?.trim();

    if (!nome) {
        const erro = new Error("Nome da categoria é obrigatório");
        erro.status = 400;
        throw erro;
    }

    const categoria = await categoriasModel.atualizar(id, nome);

    if (!categoria) {
        const erro = new Error("Categoria não encontrada");
        erro.status = 404;
        throw erro;
    }

    return categoria;
}

async function removerCategoria(id) {
    const categoria = await categoriasModel.remover(id);

    if (!categoria) {
        const erro = new Error("Categoria não encontrada");
        erro.status = 404;
        throw erro;
    }
}

module.exports = {
    listarCategorias,
    buscarCategoria,
    criarCategoria,
    atualizarCategoria,
    removerCategoria
};