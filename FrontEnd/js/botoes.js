document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("botaoEmpilhadeira")
        .addEventListener("click", () => {
            window.location.href = "/exibeAtivos.html";
        });
});  

document
    .getElementById("btnBuscar")
    .addEventListener("click", buscarAtivo);

document
    .getElementById("btnAdicionar")
    .addEventListener("click", async () => {

        const patrimonio = prompt("Patrimônio:");
        if (!patrimonio) return;

        const descricao = prompt("Descrição:");
        const categoria = prompt("Categoria:");
        const setor = prompt("Setor:");
        const responsavel = prompt("Responsável:");

        const novoAtivo = {
            patrimonio,
            descricao,
            categoria,
            setor,
            responsavel,
            status: "Disponível"
        };

        await fetch('/api/ativos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoAtivo)
        });

        carregarAtivos();
    });

document
    .getElementById("btnEditar")
    .addEventListener("click", async () => {

        if (!ativoSelecionado) {
            alert("Selecione um ativo");
            return;
        }

        const res = await fetch(`/api/ativos/${ativoSelecionado}`);
        const ativo = await res.json();

        const descricao = prompt("Descrição:", ativo.descricao);
        const categoria = prompt("Categoria:", ativo.categoria);
        const setor = prompt("Setor:", ativo.setor);
        const responsavel = prompt("Responsável:", ativo.responsavel);

        if (descricao === null) return;

        const atualizado = {
            ...ativo,
            descricao,
            categoria,
            setor,
            responsavel
        };

        await fetch(`/api/ativos/${ativoSelecionado}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atualizado)
        });

        carregarAtivos();
    });

document
    .getElementById("btnRemover")
    .addEventListener("click", async () => {

        if (!ativoSelecionado) {
            alert("Selecione um ativo");
            return;
        }

        const confirmar = confirm(
            `Deseja remover ${ativoSelecionado}?`
        );

        if (!confirmar) return;

        try {

            const resposta = await fetch(
                `/api/ativos/${ativoSelecionado}`,
                {
                    method: "DELETE"
                }
            );

            const dados = await resposta.json();

            alert(dados.mensagem);

            carregarAtivos();

        } catch (erro) {

            console.error(erro);

            alert("Erro ao remover ativo");

        }

    });

document
    .getElementById("btnStatus")
    .addEventListener("click", async () => {

        if (!ativoSelecionado) {
            alert("Selecione um ativo");
            return;
        }

        const res = await fetch(`/api/ativos/${ativoSelecionado}`);
        const ativo = await res.json();

        const novoStatus =
            ativo.status === "Disponível"
                ? "Em uso"
                : "Disponível";

        const atualizado = {
            ...ativo,
            status: novoStatus
        };

        await fetch(`/api/ativos/${ativoSelecionado}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atualizado)
        });

        carregarAtivos();

    });