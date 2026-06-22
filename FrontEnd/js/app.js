const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const container = document.getElementById("dados");

if (!id) {
    container.innerHTML = "<h2>Nenhum patrimônio informado na URL</h2>";
} else {

    fetch('/api/ativos')
        .then(res => res.json())
        .then(ativos => {

            const ativo = ativos.find(
                a => a.patrimonio.trim() === id.trim()
            );

            if (!ativo) {
                container.innerHTML = `<h2>Ativo ${id} não encontrado</h2>`;
                return;
            }

            container.innerHTML = `
                <h2>${ativo.patrimonio}</h2>
                <p><strong>Descrição:</strong> ${ativo.descricao}</p>
                <p><strong>Setor:</strong> ${ativo.setor}</p>
                <p><strong>Responsável:</strong> ${ativo.responsavel}</p>
            `;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<h2>Erro ao carregar API</h2>";
        });
}