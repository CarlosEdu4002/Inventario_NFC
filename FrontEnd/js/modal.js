const modal = document.getElementById("modal");
const tituloModal = document.getElementById("tituloModal");
const camposModal = document.getElementById("camposModal");
const formModal = document.getElementById("formModal");
const btnCancelar = document.getElementById("cancelarModal");

let modoModal = "cadastro";
let ativoEditando = null;

// =====================
// Abrir cadastro
// =====================
function abrirModal() {

    modoModal = "cadastro";
    ativoEditando = null;

    modal.classList.remove("oculto");
    tituloModal.textContent = "Novo Ativo";

    camposModal.innerHTML = "";

    CONFIG_CATEGORIAS[tipo].campos.forEach(campo => {

        if (campo.cadastrar === false) return;

        const grupo = document.createElement("div");
        grupo.className = "grupo-campo";

        grupo.innerHTML = `
            <label for="${campo.nome}">${campo.label}</label>
            <input type="text" id="${campo.nome}" name="${campo.nome}">
        `;

        camposModal.appendChild(grupo);
    });
}

// =====================
// Abrir edição
// =====================
function abrirModalEdicao(ativo) {

    modoModal = "edicao";
    ativoEditando = ativo;

    modal.classList.remove("oculto");
    tituloModal.textContent = "Editar Ativo";

    camposModal.innerHTML = "";

    CONFIG_CATEGORIAS[tipo].campos.forEach(campo => {

        if (campo.cadastrar === false) return;

        const grupo = document.createElement("div");
        grupo.className = "grupo-campo";

        grupo.innerHTML = `
            <label for="${campo.nome}">${campo.label}</label>
            <input 
                type="text" 
                id="${campo.nome}" 
                name="${campo.nome}"
                value="${ativo[campo.nome] ?? ""}">
        `;

        camposModal.appendChild(grupo);
    });
}

// =====================
// Fechar modal
// =====================
function fecharModal() {
    modal.classList.add("oculto");
    ativoEditando = null;
    modoModal = "cadastro";
}

// =====================
// Coletar dados
// =====================
function coletarDadosFormulario() {

    const dados = {};

    CONFIG_CATEGORIAS[tipo].campos.forEach(campo => {

        if (campo.cadastrar === false) {
            dados[campo.nome] = campo.valorPadrao;
            return;
        }

        const input = document.getElementById(campo.nome);
        dados[campo.nome] = input ? input.value : "";
    });

    return dados;
}

// =====================
// Eventos
// =====================

// cancelar
btnCancelar.addEventListener("click", fecharModal);

// submit (cadastro + edição)
formModal.addEventListener("submit", async (e) => {

    e.preventDefault();

    const dados = coletarDadosFormulario();

    if (modoModal === "cadastro") {

        await fetch(`/api/${tipo}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

    } else {

        await fetch(`/api/${tipo}/${ativoEditando.patrimonio}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });
    }

    fecharModal();
    carregarAtivos();
});

function confirmarExclusao(texto, callback){

    const modal = document.getElementById("modalConfirmacao");

    const textoConfirmacao = document.getElementById("textoConfirmacao");

    const btnCancelar = document.getElementById("btnCancelarRemocao");

    const btnConfirmar = document.getElementById("btnConfirmarRemocao");

    textoConfirmacao.textContent = texto;

    modal.classList.remove("oculto");

    function fechar(){

        modal.classList.add("oculto");

        btnCancelar.removeEventListener("click", cancelar);

        btnConfirmar.removeEventListener("click", confirmar);

    }

    function cancelar(){

        fechar();

    }

    function confirmar(){

        fechar();

        callback();

    }

    btnCancelar.addEventListener("click", cancelar);

    btnConfirmar.addEventListener("click", confirmar);

}