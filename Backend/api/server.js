const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

function caminhoArquivo(tipo) {
    return path.join(__dirname, "dados", `${tipo}.json`);
}

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, '../../Imagens')));
app.use(cors());
app.use(express.json());

/*
=========================================
LISTAR TODOS OS ATIVOS
GET /api/ativos
=========================================
*/
app.get('/api/:tipo', (req, res) => {

    const arquivo = caminhoArquivo(req.params.tipo);

    fs.readFile(arquivo, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                erro: 'Erro ao ler arquivo'
            });
        }

        res.json(JSON.parse(data));

    });

});

/*
=========================================
BUSCAR UM ATIVO
GET /api/ativos/PTN001
=========================================
*/
app.get('/api/:tipo/:id', (req, res) => {

    const arquivo = caminhoArquivo(req.params.tipo);

    fs.readFile(arquivo, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                erro: 'Erro ao ler arquivo'
            });
        }

        const ativos = JSON.parse(data);

        const ativo = ativos.find(
            a => a.patrimonio === req.params.id
        );

        if (!ativo) {
            return res.status(404).json({
                erro: 'Ativo não encontrado'
            });
        }

        res.json(ativo);

    });

});

/*
=========================================
ADICIONAR ATIVO
POST /api/ativos
=========================================
*/
app.post('/api/:tipo', (req, res) => {

    const arquivo = caminhoArquivo(req.params.tipo);

    fs.readFile(arquivo, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                erro: 'Erro ao ler arquivo'
            });
        }

        const ativos = JSON.parse(data);

        const ativoExistente = ativos.find(
            a => a.patrimonio === req.body.patrimonio
        );

        if (ativoExistente) {
            return res.status(400).json({
                erro: 'Patrimônio já existe'
            });
        }

        ativos.push(req.body);

        fs.writeFile(
                arquivo,
            JSON.stringify(ativos, null, 2),
            err => {

                if (err) {
                    return res.status(500).json({
                        erro: 'Erro ao salvar arquivo'
                    });
                }

                res.json({
                    mensagem: 'Ativo adicionado com sucesso'
                });

            }
        );

    });

});

/*
=========================================
EDITAR ATIVO
PUT /api/ativos/PTN001
=========================================
*/
app.put('/api/:tipo/:id', (req, res) => {

    const arquivo = caminhoArquivo(req.params.tipo);

    fs.readFile(arquivo, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                erro: 'Erro ao ler arquivo'
            });
        }

        const ativos = JSON.parse(data);

        const indice = ativos.findIndex(
            a => a.patrimonio === req.params.id
        );

        if (indice === -1) {
            return res.status(404).json({
                erro: 'Ativo não encontrado'
            });
        }

        ativos[indice] = req.body;

        fs.writeFile(
                arquivo,
            JSON.stringify(ativos, null, 2),
            err => {

                if (err) {
                    return res.status(500).json({
                        erro: 'Erro ao salvar arquivo'
                    });
                }

                res.json({
                    mensagem: 'Ativo atualizado com sucesso'
                });

            }
        );

    });

});

/*
=========================================
REMOVER ATIVO
DELETE /api/ativos/PTN001
=========================================
*/
app.delete('/api/:tipo/:id', (req, res) => {

    const arquivo = caminhoArquivo(req.params.tipo);

    fs.readFile(arquivo, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                erro: 'Erro ao ler arquivo'
            });
        }

        const ativos = JSON.parse(data);

        const ativoExiste = ativos.some(
            a => a.patrimonio === req.params.id
        );

        if (!ativoExiste) {
            return res.status(404).json({
                erro: 'Ativo não encontrado'
            });
        }

        const novosAtivos = ativos.filter(
            a => a.patrimonio !== req.params.id
        );

      fs.writeFile(
            arquivo,
            JSON.stringify(novosAtivos, null, 2),
            err => {

                if (err) {
                    return res.status(500).json({
                        erro: 'Erro ao salvar arquivo'
                    });
                }

                res.json({
                    mensagem: 'Ativo removido com sucesso'
                });

            }
        );

    });

});

/*
=========================================
FRONTEND
=========================================
*/
app.use(
    express.static(
        path.join(__dirname, '../../FrontEnd')
    )
);

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});