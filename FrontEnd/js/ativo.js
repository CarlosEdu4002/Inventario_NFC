const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo") || "paleteiras";
const id = params.get("id");

async function carregarAtivo() {
    const container = document.getElementById("conteudo");

    if (!id) {
        container.innerHTML =
            '<p class="erro">ID não informado na URL</p>';
        return;
    }

    try {
        const [contexto, response] = await Promise.all([
            obterContextoTipo(tipo),
            fetch(
                `/api/${encodeURIComponent(tipo)}/${encodeURIComponent(
                    id
                )}`
            )
        ]);
        const ativo = await lerResposta(
            response,
            "Ativo não encontrado"
        );

        container.innerHTML = "";

        camposVisiveis(contexto.campos).forEach((campo) => {
            const linha = document.createElement("div");
            const label = document.createElement("span");
            const valor = document.createElement("span");

            linha.className = "linha";
            label.className = "label";
            label.textContent = `${campo.label}:`;
            valor.textContent =
                formatarValorCampo(campo, ativo[campo.nome]) || "N/A";

            linha.appendChild(label);
            linha.appendChild(valor);
            container.appendChild(linha);
        });
    } catch (erro) {
        console.error(erro);
        container.innerHTML =
            '<p class="erro">Erro ao carregar ativo</p>';
    }
}

carregarAtivo();
