// bibliotecario/js/cadastrar-livro.js

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-livro');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    mensagem.textContent = 'Salvando livro...';
    mensagem.style.color = '#e5e7eb';

    const exemplaresTotal = Number(document.getElementById('exemplares_total').value);
    const exemplaresDisponiveis = Number(document.getElementById('exemplares_disponiveis').value);

    const livro = {
      titulo: document.getElementById('titulo').value.trim(),
      autor: document.getElementById('autor').value.trim(),
      editora: document.getElementById('editora').value.trim(),
      ano_publicacao: document.getElementById('ano_publicacao').value.trim(),
      categoria: document.getElementById('categoria').value.trim(),
      exemplares_total: exemplaresTotal,
      exemplares_disponiveis: exemplaresDisponiveis
    };

    // validações básicas
    if (!livro.titulo || !livro.autor) {
      mensagem.textContent = 'Preencha pelo menos título e autor.';
      mensagem.style.color = '#f97373';
      return;
    }

    if (Number.isNaN(exemplaresTotal) || exemplaresTotal <= 0) {
      mensagem.textContent = 'Informe um número válido de exemplares totais.';
      mensagem.style.color = '#f97373';
      return;
    }

    if (Number.isNaN(exemplaresDisponiveis) || exemplaresDisponiveis < 0) {
      mensagem.textContent = 'Informe um número válido de exemplares disponíveis.';
      mensagem.style.color = '#f97373';
      return;
    }

    if (exemplaresDisponiveis > exemplaresTotal) {
      mensagem.textContent = 'Disponíveis não podem ser maiores que o total.';
      mensagem.style.color = '#f97373';
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/livros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livro)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        mensagem.textContent = data.error || 'Erro ao cadastrar livro.';
        mensagem.style.color = '#f97373';
      } else {
        mensagem.textContent = data.message || 'Livro cadastrado com sucesso!';
        mensagem.style.color = '#4ade80';

        form.reset();
        document.getElementById('exemplares_total').value = 1;
        document.getElementById('exemplares_disponiveis').value = 1;
      }
    } catch (error) {
      console.error(error);
      mensagem.textContent = 'Erro de comunicação com o servidor.';
      mensagem.style.color = '#f97373';
    }
  });
});
