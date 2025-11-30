
CREATE DATABASE IF NOT EXISTS biblioteca_universitaria
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE biblioteca_universitaria;

-- Tabela: ALUNOS
CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  ra   VARCHAR(20)  NOT NULL UNIQUE,
  curso VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  total_lidos INT NOT NULL DEFAULT 0,
  data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: LIVROS
CREATE TABLE IF NOT EXISTS livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  autor  VARCHAR(120),
  editora VARCHAR(120),
  ano_publicacao INT,
  categoria VARCHAR(80),
  exemplares_total INT NOT NULL DEFAULT 1,
  exemplares_disponiveis INT NOT NULL DEFAULT 1,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- (Opcional, para o Totem) Tabela: EMPRESTIMOS
CREATE TABLE IF NOT EXISTS emprestimos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_aluno INT NOT NULL,
  id_livro INT NOT NULL,
  data_retirada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_devolucao TIMESTAMP NULL,
  status ENUM('EM_ABERTO','DEVOLVIDO') DEFAULT 'EM_ABERTO',
  INDEX (id_aluno),
  INDEX (id_livro)
  -- Descomente se quiser FKs e seu MySQL permitir:
  -- ,FOREIGN KEY (id_aluno) REFERENCES alunos(id)
  -- ,FOREIGN KEY (id_livro)  REFERENCES livros(id)
);

-- Seeds (leves) --------------------------------------
INSERT INTO alunos (nome, ra, curso, email, telefone, total_lidos)
VALUES
('Matheus Mansano', '25021808', 'Sistemas de Informação', 'matheus@puccampinas.edu.br', '(19) 99999-9999', 0)
ON DUPLICATE KEY UPDATE nome=VALUES(nome);

INSERT INTO livros (titulo, autor, editora, ano_publicacao, categoria, exemplares_total, exemplares_disponiveis) VALUES
('Algoritmos: Teoria e Prática', 'Cormen, Leiserson, Rivest, Stein', 'MIT Press', 2009, 'Computação', 5, 3),
('Clean Code', 'Robert C. Martin', 'Prentice Hall', 2008, 'Computação', 4, 0), -- indisponível
('Banco de Dados: Projeto e Implementação', 'Navathe', 'Pearson', 2016, 'Banco de Dados', 6, 2),
('Estruturas de Dados e Algoritmos com JavaScript', 'Loiane Groner', 'Novatec', 2019, 'Computação', 3, 1),
('Engenharia de Software', 'Ian Sommerville', 'Pearson', 2011, 'Engenharia', 2, 2)
ON DUPLICATE KEY UPDATE titulo=VALUES(titulo);
