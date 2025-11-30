// totem/js/devolver.js

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-devolucao');
  const inputRA = document.getElementById('ra');
  const inputLivroId = document.getElementById('livroId');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    mensagem.textContent = 'Processando devolução...';
    mensagem.style.color = '#e5e7eb';

    const ra = inputRA.value.trim();
    const livroId = inputLivroId.value.trim();

    if (!ra || !livroId) {
      mensagem.textContent = 'Preencha o RA e o ID do livro.';
      mensagem.style.color = '#f97373';
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/emprestimos/devolver`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ra: ra,
          livro_id: Number(livroId)
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        mensagem.textContent = data.error || 'Erro ao registrar devolução.';
        mensagem.style.color = '#f97373';
      } else {
        mensagem.textContent = data.message || 'Devolução registrada com sucesso!';
        mensagem.style.color = '#4ade80';
        inputRA.value = '';
        inputLivroId.value = '';
      }
    } catch (error) {
      console.error(error);
      mensagem.textContent = 'Erro de comunicação com o servidor.';
      mensagem.style.color = '#f97373';
    }
  });
});
