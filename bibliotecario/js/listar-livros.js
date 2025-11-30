// bibliotecario/js/listar-livros.js

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('tbody-livros');
  const mensagem = document.getElementById('mensagem');

  async function carregarLivros() {
    mensagem.textContent = 'Carregando livros...';

    try {
      const response = await fetch(`${API_BASE}/livros`);
      const data = await response.json().catch(() => []);

      if (!response.ok) {
        mensagem.textContent = data.error || 'Erro ao carregar livros.';
        mensagem.style.color = '#f97373';
        return;
      }

      mensagem.textContent = '';
      tbody.innerHTML = '';

      if (!data.length) {
        mensagem.textContent = 'Nenhum livro cadastrado.';
        mensagem.style.color = '#e5e7eb';
        return;
      }

      data.forEach((livro) => {
        const tr = document.createElement('tr');

        const emprestados =
          (livro.exemplares_total ?? 0) - (livro.exemplares_disponiveis ?? 0);

        tr.innerHTML = `
          <td>${livro.id}</td>
          <td>${livro.titulo}</td>
          <td>${livro.autor || '-'}</td>
          <td>${livro.categoria || '-'}</td>
          <td>${livro.exemplares_total ?? '-'}</td>
          <td>${livro.exemplares_disponiveis ?? '-'}</td>
          <td>${emprestados}</td>
          <td>
            <a href="editar-livro.html?id=${livro.id}" class="btn-acao">Editar</a>
            <button class="btn-acao btn-excluir" data-id="${livro.id}">Excluir</button>
          </td>
        `;

        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error(error);
      mensagem.textContent = 'Erro de comunicação com o servidor.';
      mensagem.style.color = '#f97373';
    }
  }

  // Delegação de evento para o botão Excluir
  tbody.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-excluir')) {
      const id = event.target.getAttribute('data-id');
      const ok = confirm(`Tem certeza que deseja excluir o livro ID ${id}?`);

      if (!ok) return;

      mensagem.textContent = 'Excluindo livro...';
      mensagem.style.color = '#e5e7eb';

      try {
        const response = await fetch(`${API_BASE}/livros/${id}`, {
          method: 'DELETE'
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          mensagem.textContent = data.error || 'Erro ao excluir livro.';
          mensagem.style.color = '#f97373';
        } else {
          mensagem.textContent = data.message || 'Livro excluído com sucesso!';
          mensagem.style.color = '#4ade80';
          carregarLivros();
        }
      } catch (error) {
        console.error(error);
        mensagem.textContent = 'Erro de comunicação com o servidor.';
        mensagem.style.color = '#f97373';
      }
    }
  });

  carregarLivros();
});
