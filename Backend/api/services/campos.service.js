const camposModel = require("../models/campos.model");

const TIPOS_PERMITIDOS = new Set([
    "texto",
    "numero",
    "data",
    "booleano",
    "selecao",
    "select",
    "textarea"
]);

function criarErro(mensagem, status) {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
}

function validarId(valor, campo = "ID do campo") {
    const id = Number(valor);

    if (!Number.isInteger(id) || id <= 0) {
        throw criarErro(`${campo} inválido`, 400);
    }

    return id;
}

async function validarTipoAtivo(tipoAtivoId) {
    const existe = await camposModel.tipoAtivoExiste(tipoAtivoId);

    if (!existe) {
        throw criarErro("Tipo de ativo não encontrado", 404);
    }
}

function normalizarBooleano(valor, padrao) {
    return typeof valor === "boolean" ? valor : padrao;
}

function normalizarDados(body) {
    const tipoAtivoId = validarId(
        body.tipo_ativo_id,
        "ID do tipo de ativo"
    );
    const nome = body.nome?.trim();
    const label = body.label?.trim();
    const tipo = body.tipo?.trim().toLowerCase();
    const ordem = body.ordem === undefined ? 0 : Number(body.ordem);
    const opcoesInformadas = Array.isArray(body.opcoes)
        ? body.opcoes
        : [];
    const opcoes = [
        ...new Set(
            opcoesInformadas
                .map((opcao) => String(opcao).trim())
                .filter(Boolean)
        )
    ];

    if (!nome || !/^[a-zA-Z][a-zA-Z0-9_]*$/.test(nome)) {
        throw criarErro(
            "Nome deve começar com uma letra e conter apenas letras, números e _",
            400
        );
    }

    if (!label) {
        throw criarErro("Label do campo é obrigatório", 400);
    }

    if (!TIPOS_PERMITIDOS.has(tipo)) {
        throw criarErro(
            `Tipo inválido. Use: ${[...TIPOS_PERMITIDOS].join(", ")}`,
            400
        );
    }

    if (!Number.isInteger(ordem) || ordem < 0) {
        throw criarErro(
            "Ordem deve ser um número inteiro maior ou igual a zero",
            400
        );
    }

    return {
        tipo_ativo_id: tipoAtivoId,
        nome,
        label,
        tipo,
        opcoes,
        obrigatorio: normalizarBooleano(body.obrigatorio, false),
        editavel: normalizarBooleano(body.editavel, true),
        visivel: normalizarBooleano(body.visivel, true),
        ordem
    };
}

async function listarCampos(tipoAtivoIdInformado) {
    const tipoAtivoId = validarId(
        tipoAtivoIdInformado,
        "ID do tipo de ativo"
    );

    await validarTipoAtivo(tipoAtivoId);
    return camposModel.listarPorTipo(tipoAtivoId);
}

async function buscarCampo(idInformado) {
    const id = validarId(idInformado);
    const campo = await camposModel.buscarPorId(id);

    if (!campo) {
        throw criarErro("Campo não encontrado", 404);
    }

    return campo;
}

async function criarCampo(body) {
    const dados = normalizarDados(body);
    await validarTipoAtivo(dados.tipo_ativo_id);
    return camposModel.criar(dados);
}

async function atualizarCampo(idInformado, body) {
    const id = validarId(idInformado);
    const dados = normalizarDados(body);
    await validarTipoAtivo(dados.tipo_ativo_id);

    const campo = await camposModel.atualizar(id, dados);

    if (!campo) {
        throw criarErro("Campo não encontrado", 404);
    }

    return campo;
}

async function removerCampo(idInformado) {
    const id = validarId(idInformado);
    const campo = await camposModel.remover(id);

    if (!campo) {
        throw criarErro("Campo não encontrado", 404);
    }
}

module.exports = {
    listarCampos,
    buscarCampo,
    criarCampo,
    atualizarCampo,
    removerCampo
};
