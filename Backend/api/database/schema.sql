-- =========================
-- CATEGORIAS
-- =========================

CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    icone VARCHAR(100),
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TIPOS DE ATIVO
-- =========================

CREATE TABLE IF NOT EXISTS tipos_ativo (
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER NOT NULL,
    nome VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tipos_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_tipos_ativo_categoria_nome
    ON tipos_ativo (categoria_id, LOWER(nome));

-- =========================
-- CAMPOS
-- =========================

CREATE TABLE IF NOT EXISTS campos (
    id SERIAL PRIMARY KEY,
    tipo_ativo_id INTEGER NOT NULL,

    nome VARCHAR(100) NOT NULL,
    label VARCHAR(100) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    opcoes JSONB NOT NULL DEFAULT '[]'::JSONB,

    obrigatorio BOOLEAN DEFAULT FALSE,
    editavel BOOLEAN DEFAULT TRUE,
    visivel BOOLEAN DEFAULT TRUE,

    ordem INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_campos_tipo
        FOREIGN KEY (tipo_ativo_id)
        REFERENCES tipos_ativo(id)
        ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_campos_tipo_nome
    ON campos (tipo_ativo_id, LOWER(nome));

ALTER TABLE campos
    ADD COLUMN IF NOT EXISTS opcoes JSONB NOT NULL DEFAULT '[]'::JSONB;

-- =========================
-- ATIVOS
-- =========================

CREATE TABLE IF NOT EXISTS ativos (
    id SERIAL PRIMARY KEY,
    tipo_ativo_id INTEGER NOT NULL,

    patrimonio VARCHAR(50) UNIQUE NOT NULL,
    dados JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ativo_tipo
        FOREIGN KEY (tipo_ativo_id)
        REFERENCES tipos_ativo(id)
);

-- Compatibilidade com bancos criados antes da coluna JSONB.
ALTER TABLE ativos
    ADD COLUMN IF NOT EXISTS dados JSONB NOT NULL DEFAULT '{}'::JSONB;
