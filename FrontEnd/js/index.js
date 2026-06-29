document.addEventListener("DOMContentLoaded", () => {

    const btnPaleteira = document.getElementById("botaoPaleteira");
    const btnEmpilhadeira = document.getElementById("botaoEmpilhadeira");

    if (btnPaleteira) {
        btnPaleteira.addEventListener("click", () => {
            window.location.href = "/exibeAtivos.html?tipo=paleteiras";
        });
    }

    if (btnEmpilhadeira) {
        btnEmpilhadeira.addEventListener("click", () => {
            window.location.href = "/exibeAtivos.html?tipo=empilhadeirasmanuais";
        });
    }

});