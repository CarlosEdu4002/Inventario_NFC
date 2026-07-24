require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const initDatabase = require("./database/init");

const categoriasRoutes = require("./routes/categorias.routes");
const tiposAtivoRoutes = require("./routes/tiposAtivo.routes");
const ativosRoutes = require("./routes/ativos.routes");
const camposRoutes = require("./routes/campos.routes");

// =====================
// Configurações
// =====================

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
    "/Imagens",
    express.static(path.join(__dirname, "../../Imagens"))
);

app.use(
    express.static(path.join(__dirname, "../../FrontEnd"))
);

// =====================
// Rotas
// =====================

app.use("/api/categorias", categoriasRoutes);
app.use("/api/tipos", tiposAtivoRoutes);
app.use("/api/campos", camposRoutes);
app.use("/api", ativosRoutes);

// =====================
// Inicialização
// =====================

async function iniciarServidor() {
    await initDatabase();

    return new Promise((resolve) => {
        const servidor = app.listen(PORT, () => {
            console.log(
                `Servidor rodando em http://localhost:${PORT}`
            );
            resolve(servidor);
        });
    });
}

if (require.main === module) {
    iniciarServidor().catch((erro) => {
        console.error("Erro ao iniciar o servidor:", erro);
        process.exit(1);
    });
}

module.exports = {
    app,
    iniciarServidor
};
