var btn = document.querySelector("#refresh");
    btn.addEventListener("click", () => {
    location.reload();
});

function calcular(){
    let etanol = document.getElementById("etanol").value.replace(",",".");
    let gasolina = document.getElementById("gasolina").value.replace(",",".");
    let resultadoTexto = document.getElementById("resultadoTexto");
    let resultado = document.getElementById("resultado");

    let resultadoTemp = etanol/gasolina

    if (etanol <= 0 || gasolina <= 0){
        alert("Ops, parece que faltou algo. \n Por favor, preencha tanto o valor do Etanol quanto da Gasolina!")
        location.reload();
    }

    if (resultadoTemp < 0.7) {
        resultadoTexto.innerHTML = "Obrigado por usar nossa plataforma, baseado nos valores inseridos o melhor neste momento, é abastecer com:";
        resultado.innerHTML = "ETANOL";

        resultadoTexto.style = "padding: 10px; border-radius: 10px";
        resultado.style = "padding: 10px; border-radius: 10px";
        document.getElementById("refresh").disabled = false;
    } else {
        resultadoTexto.innerHTML = "Obrigado por usar nossa plataforma, baseado nos valores inseridos o melhor neste momento, é abastecer com:";
        resultado.innerHTML = "GASOLINA";

        resultadoTexto.style = "padding: 10px; border-radius: 10px";
        resultado.style = "padding: 10px; border-radius: 10px";
        document.getElementById("refresh").disabled = false;
    }
}
