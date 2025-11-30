// totem/js/retirar.js

const API_BASE = 'http://localhost:3000'; // mesma porta do seu backend

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-retirada');
  const inputRA = document.getElementById('ra');
  const inputLivroId = document.getElementById('livroId');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // evita recarregar a página

    mensagem.textContent = 'Processando retirada...';
    mensagem.style.color = '#e5e7eb';

    const ra = inputRA.value.trim();
    const livroId = inputLivroId.value.trim();

    if (!ra || !livroId) {
      mensagem.textContent = 'Preencha o RA e o ID do livro.';
      mensagem.style.color = ' #f97373';
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/emprestimos/retirar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ra: ra,
          livro_id: Number(livroId)
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        mensagem.textContent = data.error || 'Erro ao registrar retirada.';
        mensagem.style.color = '#f97373';
      } else {
        mensagem.textContent = data.message || 'Retirada registrada com sucesso!';
        mensagem.style.color = '#4ade80';

        // limpa os campos
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
