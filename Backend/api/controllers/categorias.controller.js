const categoriasService = require("../services/categorias.service");

function responderErro(res, erro, mensagemPadrao) {
    console.error(erro);

    if (erro.code === "23505") {
        return res.status(400).json({
            erro: "Categoria já existe"
        });
    }

    if (erro.code === "23503") {
        return res.status(400).json({
            erro: "A categoria possui tipos de ativos vinculados"
        });
    }

    return res.status(erro.status || 500).json({
        erro: erro.status ? erro.message : mensagemPadrao
    });
}

async function listar(req, res) {
    try {
        const categorias = await categoriasService.listarCategorias();
        return res.json(categorias);
    } catch (erro) {
        return responderErro(res, erro, "Erro ao listar categorias");
    }
}

async function buscar(req, res) {
    try {
        const categoria = await categoriasService.buscarCategoria(
            req.params.id
        );

        return res.json(categoria);
    } catch (erro) {
        return responderErro(res, erro, "Erro ao buscar categoria");
    }
}

async function criar(req, res) {
    try {
        const categoria = await categoriasService.criarCategoria(
            req.body
        );

        return res.status(201).json(categoria);
    } catch (erro) {
        return responderErro(res, erro, "Erro ao criar categoria");
    }
}

async function atualizar(req, res) {
    try {
        const categoria = await categoriasService.atualizarCategoria(
            req.params.id,
            req.body
        );

        return res.json(categoria);
    } catch (erro) {
        return responderErro(res, erro, "Erro ao atualizar categoria");
    }
}

async function remover(req, res) {
    try {
        await categoriasService.removerCategoria(req.params.id);

        return res.json({
            mensagem: "Categoria removida com sucesso"
        });
    } catch (erro) {
        return responderErro(res, erro, "Erro ao remover categoria");
    }
}

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    remover
};