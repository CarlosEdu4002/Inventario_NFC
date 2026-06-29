// =====================
// Buscar
// =====================
const btnBuscar = document.getElementById("btnBuscar");

if (btnBuscar) {
    btnBuscar.addEventListener("click", buscarAtivo);
}

// =====================
// Adicionar
// =====================
const btnAdicionar = document.getElementById("btnAdicionar");

if (btnAdicionar) {

    btnAdicionar.addEventListener("click", async () => {

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

        await fetch(`/api/${tipo}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoAtivo)
        });

        carregarAtivos();

    });

}

// =====================
// Editar
// =====================
const btnEditar = document.getElementById("btnEditar");

if (btnEditar) {

    btnEditar.addEventListener("click", async () => {

        if (!ativoSelecionado) {
            alert("Selecione um ativo");
            return;
        }

        const res = await fetch(`/api/${tipo}/${ativoSelecionado}`);
        const ativo = await res.json();

        const descricao = prompt("Descrição:", ativo.descricao);
        if (descricao === null) return;

        const categoria = prompt("Categoria:", ativo.categoria);
        const setor = prompt("Setor:", ativo.setor);
        const responsavel = prompt("Responsável:", ativo.responsavel);

        const atualizado = {
            ...ativo,
            descricao,
            categoria,
            setor,
            responsavel
        };

        await fetch(`/api/${tipo}/${ativoSelecionado}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atualizado)
        });

        carregarAtivos();

    });

}

// =====================
// Remover
// =====================
const btnRemover = document.getElementById("btnRemover");

if (btnRemover) {

    btnRemover.addEventListener("click", async () => {

        if (!ativoSelecionado) {
            alert("Selecione um ativo");
            return;
        }

        const confirmar = confirm(`Deseja remover ${ativoSelecionado}?`);

        if (!confirmar) return;

        try {

            const resposta = await fetch(`/api/${tipo}/${ativoSelecionado}`, {
                method: "DELETE"
            });

            const dados = await resposta.json();

            alert(dados.mensagem);

            ativoSelecionado = null;

            carregarAtivos();

        } catch (erro) {

            console.error(erro);

            alert("Erro ao remover ativo");

        }

    });

}

// =====================
// Alterar Status
// =====================
const btnStatus = document.getElementById("btnStatus");

if (btnStatus) {

    btnStatus.addEventListener("click", async () => {

        if (!ativoSelecionado) {
            alert("Selecione um ativo");
            return;
        }

        const res = await fetch(`/api/${tipo}/${ativoSelecionado}`);
        const ativo = await res.json();

        const atualizado = {
            ...ativo,
            status: ativo.status === "Disponível"
                ? "Em uso"
                : "Disponível"
        };

        await fetch(`/api/${tipo}/${ativoSelecionado}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atualizado)
        });

        carregarAtivos();

    });

}