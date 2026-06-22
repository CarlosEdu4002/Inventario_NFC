const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/ativos', (req, res) => {

    fs.readFile('ativos.json', 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                erro: 'Erro ao ler arquivo'
            });
        }

        res.json(JSON.parse(data));
    });

});

app.get('/api/ativos/:id', (req, res) => {

    fs.readFile('ativos.json', 'utf8', (err, data) => {

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

const path = require('path');

app.use(express.static(path.join(__dirname, '../../FrontEnd')));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
