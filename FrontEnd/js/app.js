window.tipo = new URLSearchParams(window.location.search).get("tipo") || "paleteiras";

let ativosCarregados = [];
let ativoSelecionado = null;

function selecionarLinha(id, linha){

    document.querySelectorAll("#tabela tr")
        .forEach(tr => tr.classList.remove("selecionado"));

    linha.classList.add("selecionado");

    ativoSelecionado = id;
}

function abrirAtivo(id){
    window.location.href = `ativo.html?tipo=${tipo}&id=${id}`;
}

async function carregarAtivos() {

    try {

        const res = await fetch(`/api/${tipo}`);
        const ativos = await res.json();

        ativosCarregados = ativos;

        const tabela = document.getElementById("tabela");
        tabela.innerHTML = "";

        const isTouch = navigator.maxTouchPoints > 0;

        ativos.forEach(a => {

            const linha = document.createElement("tr");

            CONFIG_CATEGORIAS[tipo].campos.forEach(campo => {

                const td = document.createElement("td");
                td.textContent = a[campo.nome] ?? "";
                linha.appendChild(td);

            });

            linha.addEventListener("click", () => {

                selecionarLinha(a.patrimonio, linha);

                if (isTouch) {
                    abrirAtivo(a.patrimonio);
                }

            });

            if (!isTouch) {

                linha.addEventListener("dblclick", () => {
                    abrirAtivo(a.patrimonio);
                });

            }

            tabela.appendChild(linha);

        });

    } catch (err) {

        console.error(err);

    }

}

function buscarAtivo(){

    const texto = document
        .getElementById("buscaId")
        .value
        .trim()
        .toUpperCase();

    const ativo = ativosCarregados.find(
        a => a.patrimonio.toUpperCase() === texto
    );

    if(!ativo){

        alert("Ativo não encontrado");

        return;
    }

    abrirAtivo(ativo.patrimonio);
}

function montarCabecalho() {

    const cabecalho = document.getElementById("cabecalhoTabela");

    cabecalho.innerHTML = "";

    CONFIG_CATEGORIAS[tipo].campos.forEach(campo => {

        const th = document.createElement("th");

        th.textContent = campo.label;

        cabecalho.appendChild(th);

    });

}

montarCabecalho();
carregarAtivos();