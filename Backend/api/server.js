require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const initDatabase = require("./database/init");

const categoriasRoutes = require("./routes/categorias.routes");
const tiposAtivoRoutes = require("./routes/tiposAtivo.routes");
const ativosRoutes = require("./routes/ativos.routes");

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
app.use("/api", ativosRoutes);

// =====================
// Inicialização
// =====================

async function iniciarServidor() {
    try {
        await initDatabase();

        app.listen(PORT, () => {
            console.log(
                `Servidor rodando em http://localhost:${PORT}`
            );
        });
    } catch (erro) {
        console.error("Erro ao iniciar o servidor:", erro);
        process.exit(1);
    }
}

iniciarServidor();