var btn = document.querySelector("#refresh");
    btn.addEventListener("click", () => {
    location.reload();
});

function calcular(){
    let inputEtanol = document.getElementById("etanol");
    let inputGasolina = document.getElementById("gasolina");
    let resultado = document.getElementById("resultado");
    
    etanol = inputEtanol.value.replace(",",".");
    gasolina = inputGasolina.value.replace(",",".");

    let resultadoTemp = etanol/gasolina

    if (etanol <= 0 || gasolina <= 0){
        alert("Por favor, preencher tanto o valor do Etanol quanto da Gasolina!")
        location.reload();
    }

    if (resultadoTemp < 0.7) {
        resultado.innerHTML = "Abastecer com Etanol";
        document.getElementById("refresh").disabled = false;
    } else {
        resultado.innerHTML = "Abastecer com Gasolina";
        document.getElementById("refresh").disabled = false;
    }
}