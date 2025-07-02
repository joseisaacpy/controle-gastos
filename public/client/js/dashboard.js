async function getInfoToDash() {
  // Spans com informações da API
  const spanTotal = document.getElementById("totalGasto");
  const spanTabulacao = document.getElementById("totalTabulacao");
  const spanGastoMedio = document.getElementById("gastoMedio");

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
    spanGastoMedio.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalGastas / gastos.length);
    // Se tiver erro, mostra o erro no console
  } catch (error) {
    console.log(error);
  }
}

// Ao carregar o DOM, chama a função
document.addEventListener("DOMContentLoaded", () => {
  getInfoToDash();
});
