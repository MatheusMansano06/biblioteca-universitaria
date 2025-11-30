const express = require('express');
const router = express.Router();
const db = require('../config/db');


// ===============================
//   REGISTRAR RETIRADA DE LIVRO
// ===============================
router.post('/retirar', (req, res) => {
  const { ra, livro_id } = req.body;

  if (!ra || !livro_id) {
    return res.status(400).json({ error: 'RA e ID do livro são obrigatórios.' });
  }

  // 1. Verificar se o aluno existe
  const sqlAluno = 'SELECT * FROM alunos WHERE ra = ? LIMIT 1';
  db.query(sqlAluno, [ra], (err, alunoResult) => {
    if (err) return res.status(500).json({ error: 'Erro ao consultar aluno.' });
    if (alunoResult.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    // 2. Verificar se o livro existe
    const sqlLivro = 'SELECT * FROM livros WHERE id = ? LIMIT 1';
    db.query(sqlLivro, [livro_id], (err2, livroResult) => {
      if (err2) return res.status(500).json({ error: 'Erro ao consultar livro.' });
      if (livroResult.length === 0) {
        return res.status(404).json({ error: 'Livro não encontrado.' });
      }

      const livro = livroResult[0];

      if (livro.exemplares_disponiveis <= 0) {
        return res.status(400).json({ error: 'Livro indisponível para retirada.' });
      }

      // 3. Registrar empréstimo
      const sqlEmprestimo = `
        INSERT INTO emprestimos (ra, livro_id, status)
        VALUES (?, ?, 'emprestado')
      `;
      db.query(sqlEmprestimo, [ra, livro_id], (err3) => {
        if (err3) {
          console.error('💥 Erro no INSERT em emprestimos:', err3);
          return res.status(500).json({
            error: 'Erro ao registrar empréstimo.',
            detalhe: err3.sqlMessage || err3.message
          });
        }

        // 4. Atualizar disponibilidade do livro
        const sqlUpdateLivro = `
          UPDATE livros
          SET exemplares_disponiveis = exemplares_disponiveis - 1
          WHERE id = ?
        `;
        db.query(sqlUpdateLivro, [livro_id], (err4) => {
          if (err4) {
            console.error('💥 Erro ao atualizar livro:', err4);
            return res.status(500).json({
              error: 'Erro ao atualizar disponibilidade do livro.',
              detalhe: err4.sqlMessage || err4.message
            });
          }

          return res.json({ message: 'Empréstimo registrado com sucesso!' });
        });
      });
    });
  });
});




// ===============================
//      REGISTRAR DEVOLUÇÃO
// ===============================
router.post('/devolver', (req, res) => {
  const { ra, livro_id } = req.body;

  if (!ra || !livro_id) {
    return res.status(400).json({ error: 'RA e ID do livro são obrigatórios.' });
  }

  // 1. Buscar o empréstimo em aberto
      const sqlBusca = `
    SELECT * FROM emprestimos
    WHERE ra = ? AND livro_id = ? AND status = 'emprestado'
    ORDER BY id DESC
    LIMIT 1
  `;


  db.query(sqlBusca, [ra, livro_id], (err, results) => {
    if (err) {
      console.error('💥 Erro ao buscar emprestimo para devolução:', err);
      return res.status(500).json({ error: 'Erro ao buscar empréstimo para devolução.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Nenhum empréstimo em aberto encontrado para este RA e livro.' });
    }

    const emprestimo = results[0];

    // 2. Atualizar o empréstimo para devolvido
    const sqlDevolucao = `
      UPDATE emprestimos
      SET status = 'devolvido',
          data_hora_devolucao = NOW()
      WHERE id = ?
    `;

    db.query(sqlDevolucao, [emprestimo.id], (err2) => {
      if (err2) {
        console.error('💥 Erro ao atualizar empréstimo na devolução:', err2);
        return res.status(500).json({ error: 'Erro ao registrar devolução.' });
      }

      // 3. Devolver 1 exemplar ao estoque
      const sqlUpdateLivro = `
        UPDATE livros
        SET exemplares_disponiveis = exemplares_disponiveis + 1
        WHERE id = ?
      `;

      db.query(sqlUpdateLivro, [livro_id], (err3) => {
        if (err3) {
          console.error('💥 Erro ao atualizar livro na devolução:', err3);
          return res.status(500).json({ error: 'Erro ao atualizar disponibilidade do livro na devolução.' });
        }

        return res.json({ message: 'Devolução registrada com sucesso!' });
      });
    });
  });
});

module.exports = router;
