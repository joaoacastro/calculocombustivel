// ===== VARIÁVEIS =====
const form = document.getElementById("formulario");
const btnCalcular = document.getElementById("btnCalculate");
const btnZerar = document.getElementById("btnZerar");
const resultadoDiv = document.getElementById("resultado");
const inputs = document.querySelectorAll(".input");

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  carregarDados();
  adicionarEventosBotoes();
  adicionarValidacaoTempo();
});

// ===== CARREGAR DADOS DO LOCALSTORAGE =====
function carregarDados() {
  const dados = localStorage.getItem("combustivelDados");
  if (dados) {
    const { etanol, gasolina, autonomiaEtanol, autonomiaGasolina } = JSON.parse(dados);
    document.getElementById("etanol").value = etanol;
    document.getElementById("gasolina").value = gasolina;
    document.getElementById("autonomiaEtanol").value = autonomiaEtanol;
    document.getElementById("autonomiaGasolina").value = autonomiaGasolina;
    calcular(); // Recalcular com dados carregados
  }
}

// ===== SALVAR DADOS NO LOCALSTORAGE =====
function salvarDados() {
  const dados = {
    etanol: document.getElementById("etanol").value,
    gasolina: document.getElementById("gasolina").value,
    autonomiaEtanol: document.getElementById("autonomiaEtanol").value,
    autonomiaGasolina: document.getElementById("autonomiaGasolina").value,
  };
  localStorage.setItem("combustivelDados", JSON.stringify(dados));
}

// ===== ADICIONAR EVENTOS AOS BOTÕES =====
function adicionarEventosBotoes() {
  btnCalcular.addEventListener("click", calcular);
  btnZerar.addEventListener("click", zerar);

  // Enviar com ENTER no teclado (com formulário focado)
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calcular();
  });

  // Permite enviar ao pressionar Enter em qualquer campo input
  inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        calcular();
      }
    });
  });
}

// ===== VALIDAÇÃO EM TEMPO REAL =====
function adicionarValidacaoTempo() {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      limparErro(input);
    });
  });
}

// ===== LIMPAR MENSAGEM DE ERRO =====
function limparErro(input) {
  const spanErro = input.parentElement.querySelector(".erro");
  if (spanErro) {
    spanErro.textContent = "";
    spanErro.classList.remove("ativo");
  }
}

// ===== VALIDAR ENTRADA =====
function validarEntradas() {
  let valido = true;

  const etanol = parseFloat(document.getElementById("etanol").value);
  const gasolina = parseFloat(document.getElementById("gasolina").value);
  const autonomiaEtanol = parseFloat(document.getElementById("autonomiaEtanol").value);
  const autonomiaGasolina = parseFloat(document.getElementById("autonomiaGasolina").value);

  if (!etanol || etanol <= 0) {
    mostraErro("etanol", "Insira um valor positivo para o Etanol");
    valido = false;
  }

  if (!gasolina || gasolina <= 0) {
    mostraErro("gasolina", "Insira um valor positivo para a Gasolina");
    valido = false;
  }

  if (!autonomiaEtanol || autonomiaEtanol <= 0) {
    mostraErro("autonomiaEtanol", "Insira um valor positivo para o consumo de Etanol (Km/L)");
    valido = false;
  }

  if (!autonomiaGasolina || autonomiaGasolina <= 0) {
    mostraErro("autonomiaGasolina", "Insira um valor positivo para o consumo de Gasolina (Km/L)");
    valido = false;
  }

  return valido;
}

// ===== MOSTRAR ERRO =====
function mostraErro(idInput, mensagem) {
  const input = document.getElementById(idInput);
  const spanErro = input.parentElement.querySelector(".erro");
  if (spanErro) {
    spanErro.textContent = mensagem;
    spanErro.classList.add("ativo");
  }
}

// ===== CALCULAR COMBUSTÍVEL MAIS ECONÔMICO =====
function calcular() {
  // Limpar erros anteriores
  inputs.forEach((input) => limparErro(input));
  
  if (!validarEntradas()) {
    return;
  }

  const etanol = parseFloat(document.getElementById("etanol").value);
  const gasolina = parseFloat(document.getElementById("gasolina").value);
  const autonomiaEtanol = parseFloat(document.getElementById("autonomiaEtanol").value);
  const autonomiaGasolina = parseFloat(document.getElementById("autonomiaGasolina").value);

  // Custo por km (cada combustível usa sua autonomia específica)
  const custoPorKmEtanol = etanol / autonomiaEtanol;
  const custoPorKmGasolina = gasolina / autonomiaGasolina;

  // Comparar custos
  let combustivel;
  let economia;
  let comparacao;

  if (custoPorKmEtanol < custoPorKmGasolina) {
    combustivel = "ETANOL";
    economia = (
      (((custoPorKmGasolina - custoPorKmEtanol) / custoPorKmGasolina) * 100).toFixed(2)
    );
    comparacao = `Etanol custa R$ ${custoPorKmEtanol.toFixed(3)}/km vs gasolina R$ ${custoPorKmGasolina.toFixed(3)}/km`;
  } else {
    combustivel = "GASOLINA";
    economia = (
      (((custoPorKmEtanol - custoPorKmGasolina) / custoPorKmEtanol) * 100).toFixed(2)
    );
    comparacao = `Gasolina custa R$ ${custoPorKmGasolina.toFixed(3)}/km vs etanol R$ ${custoPorKmEtanol.toFixed(3)}/km`;
  }

  // Exibir resultado em duas linhas
  resultadoDiv.innerHTML = `<strong>${combustivel}</strong><small>Economiza ${economia}% neste abastecimento</small><small>${comparacao}</small><small>Custo por km considera preço/litro e autonomia por combustível</small>`;
  resultadoDiv.classList.add("ativo");

  // Salvar dados
  salvarDados();
}

// ===== RESETAR FORMULÁRIO =====
function zerar() {
  form.reset();
  resultadoDiv.innerHTML = "";
  resultadoDiv.classList.remove("ativo");
  localStorage.removeItem("combustivelDados");
  inputs.forEach((input) => limparErro(input));
}
