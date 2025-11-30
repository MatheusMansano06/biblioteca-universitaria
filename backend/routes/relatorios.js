// backend/routes/relatorios.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ===============================
//   RELATÓRIO GERAL DE LEITORES
// ===============================
router.get('/leitores', (req, res) => {
  const sql = `
    SELECT
      a.ra,
      a.nome,
      COUNT(e.id) AS livros_lidos
    FROM alunos a
    LEFT JOIN emprestimos e
      ON e.ra = a.ra
     AND e.status = 'devolvido'
    GROUP BY a.ra, a.nome
    ORDER BY livros_lidos DESC, a.nome;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Erro ao gerar relatório de leitores:', err);
      return res.status(500).json({ error: 'Erro ao gerar relatório.' });
    }

    // adiciona classificação no Node
    const classificados = results.map((linha) => {
      const lidos = linha.livros_lidos || 0;
      let classificacao;

      if (lidos <= 5) classificacao = 'Leitor Iniciante';
      else if (lidos <= 10) classificacao = 'Leitor Regular';
      else if (lidos <= 20) classificacao = 'Leitor Ativo';
      else classificacao = 'Leitor Extremo';

      return {
        ra: linha.ra,
        nome: linha.nome,
        livros_lidos: lidos,
        classificacao
      };
    });

    res.json(classificados);
  });
});

module.exports = router;
