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

async function carregarAtivos(){

    try{

        const res = await fetch(`/api/${tipo}`);
        const ativos = await res.json();

        ativosCarregados = ativos;

        const tabela = document.getElementById("tabela");

        tabela.innerHTML = "";

        ativos.forEach(a => {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${a.patrimonio}</td>
                <td>${a.descricao}</td>
                <td>${a.categoria}</td>
                <td>${a.setor}</td>
                <td>${a.responsavel}</td>
                <td>${a.status}</td>
            `;

            linha.addEventListener("click", () => {
                selecionarLinha(a.patrimonio, linha);
            });

            linha.addEventListener("dblclick", () => {
                abrirAtivo(a.patrimonio);
            });

            tabela.appendChild(linha);

        });

    }

    catch(err){

        console.error(err);

        //alert("Erro ao carregar ativos");

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

carregarAtivos();