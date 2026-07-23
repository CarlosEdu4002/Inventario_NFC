const pool = require("../database/connection");

async function listar() {
    const resultado = await pool.query(
        `
        SELECT id, nome, created_at
        FROM categorias
        ORDER BY nome
        `
    );

    return resultado.rows;
}

async function buscarPorId(id) {
    const resultado = await pool.query(
        `
        SELECT id, nome, created_at
        FROM categorias
        WHERE id = $1
        `,
        [id]
    );

    return resultado.rows[0];
}

async function criar(nome) {
    const resultado = await pool.query(
        `
        INSERT INTO categorias (nome)
        VALUES ($1)
        RETURNING id, nome, created_at
        `,
        [nome]
    );

    return resultado.rows[0];
}

async function atualizar(id, nome) {
    const resultado = await pool.query(
        `
        UPDATE categorias
        SET nome = $1
        WHERE id = $2
        RETURNING id, nome, created_at
        `,
        [nome, id]
    );

    return resultado.rows[0];
}

async function remover(id) {
    const resultado = await pool.query(
        `
        DELETE FROM categorias
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return resultado.rows[0];
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
};