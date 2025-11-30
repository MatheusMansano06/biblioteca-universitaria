// bibliotecario/js/editar-livro.js

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const livroId = params.get('id');

  const form = document.getElementById('form-livro');
  const mensagem = document.getElementById('mensagem');

  if (!livroId) {
    mensagem.textContent = 'ID do livro não informado na URL.';
    mensagem.style.color = '#f97373';
    form.style.display = 'none';
    return;
  }

  async function carregarLivro() {
    mensagem.textContent = 'Carregando dados do livro...';

    try {
      const response = await fetch(`${API_BASE}/livros/${livroId}`);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        mensagem.textContent = data.error || 'Erro ao carregar livro.';
        mensagem.style.color = '#f97373';
        form.style.display = 'none';
        return;
      }

      mensagem.textContent = '';

      document.getElementById('titulo').value = data.titulo || '';
      document.getElementById('autor').value = data.autor || '';
      document.getElementById('editora').value = data.editora || '';
      document.getElementById('ano_publicacao').value = data.ano_publicacao || '';
      document.getElementById('categoria').value = data.categoria || '';
      document.getElementById('exemplares_total').value = data.exemplares_total ?? 1;
      document.getElementById('exemplares_disponiveis').value = data.exemplares_disponiveis ?? 0;
    } catch (error) {
      console.error(error);
      mensagem.textContent = 'Erro de comunicação com o servidor.';
      mensagem.style.color = '#f97373';
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    mensagem.textContent = 'Salvando alterações...';
    mensagem.style.color = '#e5e7eb';

    const exemplaresTotal = Number(document.getElementById('exemplares_total').value);
    const exemplaresDisponiveis = Number(document.getElementById('exemplares_disponiveis').value);

    if (exemplaresDisponiveis > exemplaresTotal) {
      mensagem.textContent = 'Disponíveis não podem ser maiores que o total.';
      mensagem.style.color = '#f97373';
      return;
    }

    const livro = {
      titulo: document.getElementById('titulo').value.trim(),
      autor: document.getElementById('autor').value.trim(),
      editora: document.getElementById('editora').value.trim(),
      ano_publicacao: document.getElementById('ano_publicacao').value.trim(),
      categoria: document.getElementById('categoria').value.trim(),
      exemplares_total: exemplaresTotal,
      exemplares_disponiveis: exemplaresDisponiveis
    };

    try {
      const response = await fetch(`${API_BASE}/livros/${livroId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livro)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        mensagem.textContent = data.error || 'Erro ao atualizar livro.';
        mensagem.style.color = '#f97373';
      } else {
        mensagem.textContent = data.message || 'Livro atualizado com sucesso!';
        mensagem.style.color = '#4ade80';
      }
    } catch (error) {
      console.error(error);
      mensagem.textContent = 'Erro de comunicação com o servidor.';
      mensagem.style.color = '#f97373';
    }
  });

  carregarLivro();
});
