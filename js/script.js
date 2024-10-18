var btn = document.querySelector("#refresh");
btn.addEventListener("click", () => {
  location.reload();
});

function calcular() {
  let etanol = document.getElementById("etanol").value.replace(",", ".");
  let gasolina = document.getElementById("gasolina").value.replace(",", ".");
  
  let autonomia = document.getElementById("autonomia").value.replace(",", ".");
  
  let resultado = document.getElementById("resultado");

  let resultadoTemp = etanol / gasolina;

  if (etanol <= 0 || gasolina <= 0 || autonomia <= 0) {
    alert(
      "Ops, parece que faltou algo. Mas calma que vamos te ajudar. \n Por favor, verifique se foi preenchido com valor positivo os campos do Etanol, da Gasolina e a Autonomia do veículo e tente novamente."
    );
    location.reload();
  }

  if (resultadoTemp < 0.7) {
    resultado.innerHTML = "ETANOL";
    resultado.classList.replace("resultado", "resultadoText");

    document.getElementById("refresh").disabled = false;
  } else {
    resultado.innerHTML = "GASOLINA";
    resultado.classList.replace("resultado", "resultadoText");

    document.getElementById("refresh").disabled = false;
  }
}
