async function getInfoToDash() {
  // Spans com informações da API
  const spanTotal = document.getElementById("totalGasto");
  const spanTabulacao = document.getElementById("totalTabulacao");
  const spanGastoMedio = document.getElementById("gastoMedio");
  const spanLastGasto = document.getElementById("ultimoGasto");

  //   Para loading
  const loading = document.getElementById("loading");
  const cards = document.getElementById("cardsContainer");

  // Mostra o loading e esconde os cards
  loading.style.display = "flex";
  cards.classList.add("hidden");

  //   Consumindo a API
  try {
    // Faz a requisição pra API
    const response = await fetch("/api");

    // Pega os gastos via JSON
    const gastos = await response.json();

    // Valida se a resposta foi bem sucedida
    if (!response.ok) {
      // Lanca um erro
      throw new Error("Erro ao buscar gastos");
    }

    // Pega o total de gastos tabulados e joga no span
    spanTabulacao.innerText = gastos.length;

    // Pega a soma de todos os gastos, soma e joga no span
    const totalGastas = gastos.reduce((acumulador, iAtual) => {
      return acumulador + iAtual.valor;
    }, 0);

    // Adiciona o valor total formatado no span
    spanTotal.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalGastas);

    // Pega a média de gastos e joga no span
    const gastoMedio = totalGastas / gastos.length;
    spanGastoMedio.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(gastoMedio);

    // Pega última tabulação e joga no span
    if (gastos.length > 0) {
      const lastGasto = gastos[gastos.length - 1];
      const valorFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(lastGasto.valor);
      const dataFormatada = new Date(lastGasto.data).toLocaleDateString(
        "pt-BR"
      );

      spanLastGasto.innerHTML = `
    <span class="flex flex-col font-bold">
      <span>Categoria: ${lastGasto.categoria}</span>
      <span>Valor: ${valorFormatado}</span>
      <span>Data: ${dataFormatada}</span>
    </span>
  `;
    } else {
      spanLastGasto.innerText = "Nenhum gasto registrado.";
    }

    // Se tiver erro, mostra o erro no console
  } catch (error) {
    console.log(error);
    loading.textContent = "Erro ao carregar os dados.";
  } finally {
    // Esconde o loading e mostra os cards
    loading.style.display = "none";
    cards.classList.remove("hidden");
    cards.classList.add("grid");
  }
}

// Ao carregar o DOM, chama a função
document.addEventListener("DOMContentLoaded", () => {
  getInfoToDash();
});
