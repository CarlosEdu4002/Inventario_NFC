// Mostra informações no console para diagnóstico
//console.log("URL COMPLETA:", window.location.href);
//console.log("SEARCH:", window.location.search);

// Captura o parâmetro id da URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

console.log("ID recebido:", id);

// Se não houver ID na URL
if (!id) {
    document.getElementById("dados").innerHTML =
        "<h2>Nenhum patrimônio informado na URL</h2>";
} else {
    // Carrega o arquivo JSON
    fetch("ativos.json")
        .then(response => response.json())
        .then(ativos => {

            console.log("Ativos carregados:", ativos);

            // Procura o patrimônio correspondente
            const ativo = ativos.find(
                a => a.patrimonio.trim() === id.trim()
            );

            console.log("Resultado da busca:", ativo);

            // Se não encontrar
            if (!ativo) {
                document.getElementById("dados").innerHTML =
                    `<h2>Ativo ${id} não encontrado</h2>`;
                return;
            }

            // Exibe os dados
            document.getElementById("dados").innerHTML = `
                <h2>${ativo.patrimonio}</h2>

                <p>
                    <strong>Descrição:</strong>
                    ${ativo.descricao}
                </p>

                <p>
                    <strong>Setor:</strong>
                    ${ativo.setor}
                </p>

                <p>
                    <strong>Responsável:</strong>
                    ${ativo.responsavel}
                </p>
            `;
        })
        .catch(error => {

            console.error("Erro ao carregar JSON:", error);

            document.getElementById("dados").innerHTML =
                "<h2>Erro ao carregar os ativos</h2>";
        });
}


