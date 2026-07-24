const pool = require("../database/connection");

// =====================
// Consultas de ativos
// =====================

async function buscarTipoPorNome(tipo) {
    const resultado = await pool.query(
        `
        SELECT id
        FROM tipos_ativo
        WHERE id::TEXT = $1
           OR LOWER(nome) = LOWER($1)
        `,
        [tipo]
    );

    return resultado.rows[0];
}

async function listarPorTipo(tipo) {
    const resultado = await pool.query(
        `
        SELECT
            a.patrimonio,
            a.dados
        FROM ativos a
        INNER JOIN tipos_ativo t
            ON t.id = a.tipo_ativo_id
        WHERE t.id::TEXT = $1
           OR LOWER(t.nome) = LOWER($1)
        ORDER BY a.patrimonio
        `,
        [tipo]
    );

    return resultado.rows;
}

async function buscarPorPatrimonio(tipo, patrimonio) {
    const resultado = await pool.query(
        `
        SELECT
            a.patrimonio,
            a.dados
        FROM ativos a
        INNER JOIN tipos_ativo t
            ON t.id = a.tipo_ativo_id
        WHERE (t.id::TEXT = $1
           OR LOWER(t.nome) = LOWER($1))
          AND a.patrimonio = $2
        `,
        [tipo, patrimonio]
    );

    return resultado.rows[0];
}

async function criar(tipoId, patrimonio, dados) {
    const resultado = await pool.query(
        `
        INSERT INTO ativos (
            tipo_ativo_id,
            patrimonio,
            dados
        )
        VALUES ($1, $2, $3)
        RETURNING id
        `,
        [tipoId, patrimonio, dados]
    );

    return resultado.rows[0];
}

async function atualizar(tipoId, patrimonioAtual, novoPatrimonio, dados) {
    const resultado = await pool.query(
        `
        UPDATE ativos
        SET patrimonio = $1,
            dados = $2
        WHERE patrimonio = $3
          AND tipo_ativo_id = $4
        RETURNING id
        `,
        [novoPatrimonio, dados, patrimonioAtual, tipoId]
    );

    return resultado.rows[0];
}

async function remover(tipoId, patrimonio) {
    const resultado = await pool.query(
        `
        DELETE FROM ativos
        WHERE patrimonio = $1
          AND tipo_ativo_id = $2
        RETURNING id
        `,
        [patrimonio, tipoId]
    );

    return resultado.rows[0];
}

module.exports = {
    buscarTipoPorNome,
    listarPorTipo,
    buscarPorPatrimonio,
    criar,
    atualizar,
    remover
};
