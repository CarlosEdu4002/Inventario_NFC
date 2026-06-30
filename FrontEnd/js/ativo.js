// Pega o ID da URL: ativo.html?id=PAL001
// Pega os parâmetros da URL
const params = new URLSearchParams(window.location.search);

const tipo = params.get("tipo") || "paleteiras";
const id = params.get("id");

    async function carregarAtivo() {
      const container = document.getElementById("conteudo");

      if (!id) {
        container.innerHTML = `<p class="erro">ID não informado na URL</p>`;
        return;
      }

      try {
        const response = await fetch(`/api/${tipo}/${id}`);

        if (!response.ok) {
          throw new Error("Ativo não encontrado");
        }

        const ativo = await response.json();

      container.innerHTML = "";

      CONFIG_CATEGORIAS[tipo].campos.forEach(campo => {

        const linha = document.createElement("div");
        linha.className = "linha";

         linha.innerHTML = `
        <span class="label">${campo.label}:</span>
        ${ativo[campo.nome] ?? "N/A"}
    `;

    container.appendChild(linha);

});

      } catch (err) {
        container.innerHTML = `<p class="erro">Erro ao carregar ativo</p>`;
      }
    }

    carregarAtivo();
