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

const novoAtivo = {};

for (const campo of CONFIG_CATEGORIAS[tipo].campos) {

    if (campo.cadastrar === false) {
        novoAtivo[campo.nome] = campo.valorPadrao;
        continue;
    }

    const valor = prompt(campo.label + ":");

    if (valor === null) return;

    novoAtivo[campo.nome] = valor;

}

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

        const atualizado = { ...ativo };

for (const campo of CONFIG_CATEGORIAS[tipo].campos) {

    // Normalmente não faz sentido editar o patrimônio
    if (campo.editavel === false) continue;

    const valor = prompt(
        campo.label + ":",
        ativo[campo.nome] ?? ""
    );

    if (valor === null) return;

    atualizado[campo.nome] = valor;

}

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