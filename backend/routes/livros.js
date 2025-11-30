// backend/routes/livros.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');


// ===============================
//   LISTAR TODOS OS LIVROS
// ===============================
router.get('/', (req, res) => {
  const sql = `
    SELECT id, titulo, autor, editora, ano_publicacao, categoria,
           exemplares_total, exemplares_disponiveis
    FROM livros
    ORDER BY titulo;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar livros:', err);
      return res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
    res.json(results);
  });
});


// ===============================
//   LISTAR LIVROS DISPONÍVEIS
// ===============================
router.get('/disponiveis', (req, res) => {
  const sql = `
    SELECT id, titulo, autor, editora, ano_publicacao, categoria,
           exemplares_total, exemplares_disponiveis
    FROM livros
    WHERE exemplares_disponiveis > 0
    ORDER BY titulo;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar livros disponíveis:', err);
      return res.status(500).json({ error: 'Erro ao buscar livros disponíveis.' });
    }
    res.json(results);
  });
});


// ===============================
//   BUSCAR UM LIVRO POR ID
// ===============================
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, titulo, autor, editora, ano_publicacao, categoria,
           exemplares_total, exemplares_disponiveis
    FROM livros
    WHERE id = ?
    LIMIT 1;
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar livro por ID:', err);
      return res.status(500).json({ error: 'Erro ao buscar livro.' });
    }

    if (!results.length) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    res.json(results[0]);
  });
});


// ===============================
//      CADASTRAR NOVO LIVRO
// ===============================
router.post('/', (req, res) => {
  const {
    titulo,
    autor,
    editora,
    ano_publicacao,
    categoria,
    exemplares_total,
    exemplares_disponiveis
  } = req.body;

  if (!titulo || !autor || exemplares_total == null || exemplares_disponiveis == null) {
    return res.status(400).json({
      error: 'Título, autor, exemplares totais e exemplares disponíveis são obrigatórios.'
    });
  }

  if (exemplares_disponiveis > exemplares_total) {
    return res.status(400).json({
      error: 'Exemplares disponíveis não podem ser maiores que o total.'
    });
  }

  const sql = `
    INSERT INTO livros (titulo, autor, editora, ano_publicacao, categoria,
                        exemplares_total, exemplares_disponiveis)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    titulo,
    autor,
    editora || null,
    ano_publicacao || null,
    categoria || null,
    exemplares_total,
    exemplares_disponiveis
  ];

  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error('❌ Erro ao cadastrar livro:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar livro.' });
    }

    return res.status(201).json({
      message: 'Livro cadastrado com sucesso!',
      id: result.insertId
    });
  });
});


// ===============================
//      ATUALIZAR LIVRO (PUT)
// ===============================
router.put('/:id', (req, res) => {
  const { id } = req.params;

  const {
    titulo,
    autor,
    editora,
    ano_publicacao,
    categoria,
    exemplares_total,
    exemplares_disponiveis
  } = req.body;

  if (!titulo || !autor || exemplares_total == null || exemplares_disponiveis == null) {
    return res.status(400).json({
      error: 'Título, autor, exemplares totais e exemplares disponíveis são obrigatórios.'
    });
  }

  if (exemplares_disponiveis > exemplares_total) {
    return res.status(400).json({
      error: 'Exemplares disponíveis não podem ser maiores que o total.'
    });
  }

  const sql = `
    UPDATE livros
    SET titulo = ?,
        autor = ?,
        editora = ?,
        ano_publicacao = ?,
        categoria = ?,
        exemplares_total = ?,
        exemplares_disponiveis = ?
    WHERE id = ?
  `;

  const valores = [
    titulo,
    autor,
    editora || null,
    ano_publicacao || null,
    categoria || null,
    exemplares_total,
    exemplares_disponiveis,
    id
  ];

  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error('❌ Erro ao atualizar livro:', err);
      return res.status(500).json({ error: 'Erro ao atualizar livro.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Livro não encontrado para atualização.' });
    }

    return res.json({ message: 'Livro atualizado com sucesso!' });
  });
});

// ===============================
//      EXCLUIR LIVRO (DELETE)
// ===============================
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM livros WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Erro ao excluir livro:', err);

      // caso tenha FK em emprestimos
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({
          error: 'Não é possível excluir livro com empréstimos registrados.'
        });
      }

      return res.status(500).json({ error: 'Erro ao excluir livro.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Livro não encontrado para exclusão.' });
    }

    return res.json({ message: 'Livro excluído com sucesso!' });
  });
});



module.exports = router;
