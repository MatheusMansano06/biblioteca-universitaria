-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: biblioteca_universitaria
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(120) NOT NULL,
  `ra` varchar(20) NOT NULL,
  `curso` varchar(80) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `total_lidos` int NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ra` (`ra`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,'Matheus Mansano','25021808','Sistemas de Informação','matheus@example.com','19999999999',0,'2025-10-26 19:20:55'),(2,'Paulo','25023609','Sistema da Informação','paulo.rm5@puccampinas.edu.br','19997292504',0,'2025-10-26 19:24:18'),(3,'João','2502931','Engenharia Civil','joao.roberto@puccampinas.edu.br','1999453465',0,'2025-10-26 19:47:59'),(4,'Silvana Mansano','25071306','Direito','silvana.sm5@puccampinas.edu.br','19998470280',0,'2025-10-26 20:02:09'),(5,'Maria Eduarda','25021909','Contabil','maria.eduarda@puccampinas.edu.br','1994534573',0,'2025-10-26 20:09:56'),(6,'Renan Carrenho','25040506','Arquitetura e Urbanismo','renan.carrenho@puccampinas.edu.br','(19) 9123-4455',0,'2025-10-26 20:28:09'),(7,'João Teste','12345678','Engenharia Civil','joao@puccampinas.edu.br','(19) 99999-9999',0,'2025-10-26 20:30:59'),(8,'Professor','25453465','Medicina','professor.prof@puccampinas.edu.br','(19) 9945-5435',0,'2025-10-26 20:33:23'),(9,'Aurora','24543124','Arquitetura e Urbanismo','aurora.au@puccampinas.edu.br','(19) 99435-4364',0,'2025-10-26 20:41:27'),(10,'Maria Eduarda Silva Facchini','25018564','Ciências Contábeis','maria.esf@puccampinas.edu.br','(19) 9172-8844',0,'2025-10-31 22:35:42'),(11,'Pedro Henrique Facchini','25010203','Direito','pedro.fac@puccampinas.edu.br','(19) 9955-4433',0,'2025-11-01 00:05:00');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livros`
--

DROP TABLE IF EXISTS `livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(180) NOT NULL,
  `autor` varchar(120) DEFAULT NULL,
  `editora` varchar(120) DEFAULT NULL,
  `ano_publicacao` int DEFAULT NULL,
  `categoria` varchar(80) DEFAULT NULL,
  `exemplares_total` int NOT NULL DEFAULT '1',
  `exemplares_disponiveis` int NOT NULL DEFAULT '1',
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livros`
--

LOCK TABLES `livros` WRITE;
/*!40000 ALTER TABLE `livros` DISABLE KEYS */;
INSERT INTO `livros` VALUES (1,'Algoritmos: Teoria e Prática','Cormen, Leiserson, Rivest, Stein','MIT Press',2009,'Computação',5,3,'2025-10-26 19:50:00',NULL),(2,'Clean Code','Robert C. Martin','Prentice Hall',2008,'Computação',4,0,'2025-10-26 19:50:00',NULL),(3,'Banco de Dados: Projeto e Implementação','Elmasri & Navathe','Pearson',2016,'Banco de Dados',6,2,'2025-10-26 19:50:00',NULL),(4,'Estruturas de Dados e Algoritmos com JavaScript','Loiane Groner','Novatec',2019,'Computação',3,1,'2025-10-26 19:50:00',NULL),(5,'Engenharia de Software','Ian Sommerville','Pearson',2011,'Engenharia',2,2,'2025-10-26 19:50:00',NULL),(6,'Algoritmos: Teoria e Prática','Cormen, Leiserson, Rivest, Stein','MIT Press',2009,'Computação',5,3,'2025-10-31 23:58:48',NULL),(7,'Clean Code','Robert C. Martin','Prentice Hall',2008,'Computação',4,0,'2025-10-31 23:58:48',NULL),(8,'Banco de Dados: Projeto e Implementação','Elmasri & Navathe','Pearson',2016,'Banco de Dados',6,2,'2025-10-31 23:58:48',NULL),(9,'Estruturas de Dados e Algoritmos com JavaScript','Loiane Groner','Novatec',2019,'Computação',3,1,'2025-10-31 23:58:48',NULL),(10,'Engenharia de Software','Ian Sommerville','Pearson',2011,'Engenharia',2,2,'2025-10-31 23:58:48',NULL);
/*!40000 ALTER TABLE `livros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-31 21:16:52
