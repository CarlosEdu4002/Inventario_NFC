const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

// =====================
// Configurações
// =====================

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../../Imagens')));
app.use(express.static(path.join(__dirname, '../../FrontEnd')));
app.use(cors());
app.use(express.json());

// =====================
// Funções auxiliares
// =====================

/**
 * Retorna o caminho do arquivo JSON correspondente ao tipo informado.
 * @param {string} tipo Tipo de ativo.
 * @returns {string} Caminho absoluto do arquivo JSON.
 */
function caminhoArquivo(tipo) {
    return path.join(__dirname, 'dados', `${tipo}.json`);
}

// =====================
// Rota - Listar ativos
// GET /api/:tipo
// =====================

/** Lista todos os ativos de um tipo. */
app.get('/api/:tipo', (req, res) => {
    const arquivo = caminhoArquivo(req.params.tipo);
    fs.readFile(arquivo, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ erro: 'Erro ao ler arquivo' });
        res.json(JSON.parse(data));
    });
});

// =====================
// Rota - Buscar ativo
// GET /api/:tipo/:id
// =====================

/** Busca um ativo pelo patrimônio. */
app.get('/api/:tipo/:id', (req, res) => {
    const arquivo = caminhoArquivo(req.params.tipo);
    fs.readFile(arquivo, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ erro: 'Erro ao ler arquivo' });
        const ativos = JSON.parse(data);
        const ativo = ativos.find(a => a.patrimonio === req.params.id);
        if (!ativo) return res.status(404).json({ erro: 'Ativo não encontrado' });
        res.json(ativo);
    });
});

// =====================
// Rota - Adicionar ativo
// POST /api/:tipo
// =====================

/** Adiciona um novo ativo. */
app.post('/api/:tipo', (req, res) => {
    const arquivo = caminhoArquivo(req.params.tipo);
    fs.readFile(arquivo, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ erro: 'Erro ao ler arquivo' });
        const ativos = JSON.parse(data);
        if (ativos.find(a => a.patrimonio === req.body.patrimonio)) {
            return res.status(400).json({ erro: 'Patrimônio já existe' });
        }
        ativos.push(req.body);
        fs.writeFile(arquivo, JSON.stringify(ativos, null, 2), err => {
            if (err) return res.status(500).json({ erro: 'Erro ao salvar arquivo' });
            res.json({ mensagem: 'Ativo adicionado com sucesso' });
        });
    });
});

// =====================
// Rota - Atualizar ativo
// PUT /api/:tipo/:id
// =====================

/** Atualiza um ativo existente. */
app.put('/api/:tipo/:id', (req, res) => {
    const arquivo = caminhoArquivo(req.params.tipo);
    fs.readFile(arquivo, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ erro: 'Erro ao ler arquivo' });
        const ativos = JSON.parse(data);
        const indiceAtivo = ativos.findIndex(a => a.patrimonio === req.params.id);
        if (indiceAtivo === -1) return res.status(404).json({ erro: 'Ativo não encontrado' });
        // Mantém campos existentes e sobrescreve apenas os enviados.
        ativos[indiceAtivo] = { ...ativos[indiceAtivo], ...req.body };
        fs.writeFile(arquivo, JSON.stringify(ativos, null, 2), err => {
            if (err) return res.status(500).json({ erro: 'Erro ao salvar arquivo' });
            res.json({ mensagem: 'Ativo atualizado com sucesso' });
        });
    });
});

// =====================
// Rota - Remover ativo
// DELETE /api/:tipo/:id
// =====================

/** Remove um ativo pelo patrimônio. */
app.delete('/api/:tipo/:id', (req, res) => {
    const arquivo = caminhoArquivo(req.params.tipo);
    fs.readFile(arquivo, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ erro: 'Erro ao ler arquivo' });
        const ativos = JSON.parse(data);
        const ativoEncontrado = ativos.some(a => a.patrimonio === req.params.id);
        if (!ativoEncontrado) return res.status(404).json({ erro: 'Ativo não encontrado' });
        const listaAtualizada = ativos.filter(a => a.patrimonio !== req.params.id);
        fs.writeFile(arquivo, JSON.stringify(listaAtualizada, null, 2), err => {
            if (err) return res.status(500).json({ erro: 'Erro ao salvar arquivo' });
            res.json({ mensagem: 'Ativo removido com sucesso' });
        });
    });
});

// =====================
// Inicialização do servidor
// =====================

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
