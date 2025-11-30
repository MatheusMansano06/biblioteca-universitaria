// bibliotecario/js/relatorio-leitores.js

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('tbody-leitores');
  const mensagem = document.getElementById('mensagem');

  async function carregarRelatorio() {
    mensagem.textContent = 'Carregando relatório...';

    try {
      const response = await fetch(`${API_BASE}/relatorios/leitores`);
      const data = await response.json().catch(() => []);

      if (!response.ok) {
        mensagem.textContent = data.error || 'Erro ao carregar relatório.';
        mensagem.style.color = '#f97373';
        return;
      }

      mensagem.textContent = '';
      tbody.innerHTML = '';

      if (!data.length) {
        mensagem.textContent = 'Nenhum leitor encontrado.';
        mensagem.style.color = '#e5e7eb';
        return;
      }

      data.forEach((linha) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td>${linha.ra}</td>
          <td>${linha.nome}</td>
          <td>${linha.livros_lidos}</td>
          <td>${linha.classificacao}</td>
        `;

        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error(error);
      mensagem.textContent = 'Erro de comunicação com o servidor.';
      mensagem.style.color = '#f97373';
    }
  }

  carregarRelatorio();
});
