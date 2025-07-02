// Função pra consumir a API e alimentar a table de gastos
async function getGastos() {
  try {
    // Faz a requisição pra API
    const response = await fetch("/api");
    if (!response.ok) {
      throw new Error("Erro ao buscar gastos");
    }
    // Pega os gastos via JSON
    const gastos = await response.json();
    // Pega o elemento do tbody
    const tbody = document.getElementById("tbody");
    // Limpa a tabela
    tbody.innerHTML = "";
    // Valida se há gastos
    if (gastos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="border text-center font-bold">Nenhum gasto encontrado</td></tr>`;
    }
    // Cria uma linha pra cada gasto
    // Os dados do valor e a data são formatados de acordo com o padrão brasileiro
    gastos.forEach((gasto) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td class="border text-center">${gasto.id}</td>
                <td class="border text-center">${gasto.descricao}</td>
                <td class="border text-center">${gasto.categoria}</td>
                 <td class="border text-center">${new Intl.NumberFormat(
                   "pt-BR",
                   {
                     style: "currency",
                     currency: "BRL",
                   }
                 ).format(Number(gasto.valor))}</td>
                <td class="border text-center">${new Date(
                  gasto.data
                ).toLocaleDateString("pt-BR")}</td>
            `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

// Função pra enviar dados do form pro banco
function sendGasto() {
  // Pega o form
  const form = document.getElementById("formGasto");
  // Pega span das mensagens
  const span = document.getElementById("msg");
  // Aciona o evento de envio do form
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    // Coleta os dados do form por meio de destructuring
    const dados = {
      descricao: form.descricao.value,
      categoria: form.categoria.value,
      valor: parseFloat(form.valor.value), // Converte o valor para float
      data: form.data.value,
    };
    // Envia os dados para a API
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar gasto");
      }
      //   Limpa o form no final
      form.reset();
      // Mostra a mensagem de sucesso
      span.classList.add("text-green-500");
      span.textContent = "Gasto cadastrado com sucesso!";
      // Atualiza a tabela de gastos
      getGastos();
    } catch (error) {
      console.error(error); // Mostra o erro no console
    }
  });
}

// Quando o DOM carregar, chama a função
document.addEventListener("DOMContentLoaded", () => {
  getGastos();
  sendGasto();
});
