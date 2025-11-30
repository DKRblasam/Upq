CREATE DATABASE  IF NOT EXISTS `bzypyzfojxq906t97rwf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bzypyzfojxq906t97rwf`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: bzypyzfojxq906t97rwf-mysql.services.clever-cloud.com    Database: bzypyzfojxq906t97rwf
-- ------------------------------------------------------
-- Server version	8.4.2-2

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
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (1,'Ingeniería en Sistemas Computacionales','Carrera enfocada en el desarrollo de software y administración de sistemas','2025-11-18 23:52:40','2025-11-18 23:52:40'),(2,'Ingeniería Industrial','Carrera enfocada en la optimización de procesos productivos','2025-11-18 23:52:40','2025-11-18 23:52:40'),(3,'Licenciatura en Administración','Carrera enfocada en la gestión empresarial','2025-11-18 23:52:40','2025-11-18 23:52:40');
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `id_carrera` int NOT NULL,
  `cuatri` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_carrera` (`id_carrera`),
  KEY `idx_cuatri` (`cuatri`),
  KEY `idx_nombre` (`nombre`),
  CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cursos_chk_1` CHECK ((`cuatri` between 1 and 12))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Programación Básica','Fundamentos de programación',1,1,'2025-11-18 23:52:40','2025-11-18 23:52:40'),(2,'Base de Datos','Diseño y administración de bases de datos',1,3,'2025-11-18 23:52:40','2025-11-18 23:52:40'),(3,'Desarrollo Web','Creación de aplicaciones web',1,5,'2025-11-18 23:52:40','2025-11-18 23:52:40'),(4,'Cálculo Diferencial','Fundamentos de cálculo',2,1,'2025-11-18 23:52:40','2025-11-18 23:52:40'),(5,'Estadística','Análisis estadístico',2,2,'2025-11-18 23:52:40','2025-11-18 23:52:40');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos_maestros`
--

DROP TABLE IF EXISTS `cursos_maestros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos_maestros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_curso` int NOT NULL,
  `id_maestro` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_curso_maestro` (`id_curso`,`id_maestro`),
  KEY `idx_curso` (`id_curso`),
  KEY `idx_maestro` (`id_maestro`),
  CONSTRAINT `cursos_maestros_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cursos_maestros_ibfk_2` FOREIGN KEY (`id_maestro`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos_maestros`
--

LOCK TABLES `cursos_maestros` WRITE;
/*!40000 ALTER TABLE `cursos_maestros` DISABLE KEYS */;
INSERT INTO `cursos_maestros` VALUES (1,1,3,'2025-11-18 23:52:40'),(2,2,3,'2025-11-18 23:52:40'),(3,3,4,'2025-11-18 23:52:40'),(4,4,4,'2025-11-18 23:52:40');
/*!40000 ALTER TABLE `cursos_maestros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_codes`
--

DROP TABLE IF EXISTS `registration_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `role` enum('superadm','adm','teach','user') NOT NULL,
  `is_used` tinyint(1) DEFAULT '0',
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `registration_codes_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_codes`
--

LOCK TABLES `registration_codes` WRITE;
/*!40000 ALTER TABLE `registration_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `status` enum('abierto','pendiente','en_proceso','cerrado','vencido') DEFAULT 'abierto',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contenido` text COLLATE utf8mb4_unicode_ci,
  `id_curso` int NOT NULL,
  `id_maestro` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_curso` (`id_curso`),
  KEY `idx_maestro` (`id_maestro`),
  CONSTRAINT `unidades_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `unidades_ibfk_2` FOREIGN KEY (`id_maestro`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` VALUES (1,'Introducción a la Programación','Conceptos básicos de algoritmos y lógica de programación',1,3,'2025-11-18 23:52:40','2025-11-18 23:52:40'),(2,'Variables y Tipos de Datos','Declaración y uso de variables en programación',1,3,'2025-11-18 23:52:40','2025-11-18 23:52:40'),(3,'Estructuras de Control','If, else, switch y ciclos',1,3,'2025-11-18 23:52:40','2025-11-18 23:52:40'),(4,'Modelo Relacional','Conceptos del modelo relacional de bases de datos',2,3,'2025-11-18 23:52:40','2025-11-18 23:52:40'),(5,'SQL Básico','Consultas SELECT, INSERT, UPDATE, DELETE',2,3,'2025-11-18 23:52:40','2025-11-18 23:52:40');
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passw` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` enum('Superadm','adm','teach','User') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'User',
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `matricula` (`matricula`),
  UNIQUE KEY `matricula_2` (`matricula`),
  KEY `idx_usuario` (`usuario`),
  KEY `idx_rol` (`rol`),
  KEY `idx_activo` (`activo`),
  KEY `idx_matricula` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Super Administrador','superadmin','$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz','SA001','Superadm',1,'2025-11-18 23:52:40','2025-11-30 07:26:34'),(2,'Administrador','admin','$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz','ADM001','adm',1,'2025-11-18 23:52:40','2025-11-30 07:26:34'),(3,'Juan Pérez','jperez','$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz','MAE001','teach',1,'2025-11-18 23:52:40','2025-11-30 07:26:35'),(4,'María García','mgarcia','$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz','MAE002','teach',1,'2025-11-18 23:52:40','2025-11-30 07:26:35'),(5,'Estudiante Uno','estudiante1','$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz','EST001','User',1,'2025-11-18 23:52:40','2025-11-30 07:26:32'),(6,'Blasam Amador','Init','$2b$10$aSDsL1Ol1E2tjwy1fD/aleN14uEvyKAUlA7JdAkOCWzPXl92mrak.','EST002','User',1,'2025-11-30 07:06:55','2025-11-30 07:28:59'),(7,'Juancarlos Bodoque','Bodoque','$2b$10$EkMAMD.a2tma0r5AIjO4u./lmX7rnIoIHVsM8t./6ZE8YmlzvGFUq','000000012','User',1,'2025-11-30 09:51:52','2025-11-30 09:51:52'),(8,'Juaquincito','juqo1','$2b$10$EkMAMD.a2tma0r5AIjO4u./lmX7rnIoIHVsM8t./6ZE8YmlzvGFUq','000000013','Superadm',1,'2025-11-30 09:54:19','2025-11-30 09:54:19');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_cursos_completos`
--

DROP TABLE IF EXISTS `v_cursos_completos`;
/*!50001 DROP VIEW IF EXISTS `v_cursos_completos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_cursos_completos` AS SELECT 
 1 AS `id`,
 1 AS `curso_nombre`,
 1 AS `curso_descripcion`,
 1 AS `cuatri`,
 1 AS `carrera_id`,
 1 AS `carrera_nombre`,
 1 AS `num_maestros`,
 1 AS `num_unidades`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_maestros_cursos`
--

DROP TABLE IF EXISTS `v_maestros_cursos`;
/*!50001 DROP VIEW IF EXISTS `v_maestros_cursos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_maestros_cursos` AS SELECT 
 1 AS `maestro_id`,
 1 AS `maestro_nombre`,
 1 AS `maestro_usuario`,
 1 AS `curso_id`,
 1 AS `curso_nombre`,
 1 AS `carrera_nombre`,
 1 AS `cuatri`,
 1 AS `asignacion_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'bzypyzfojxq906t97rwf'
--

--
-- Dumping routines for database 'bzypyzfojxq906t97rwf'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_asignar_maestro_curso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u7u83cjswi037jk8`@`%` PROCEDURE `sp_asignar_maestro_curso`(
  IN p_id_curso INT,
  IN p_id_maestro INT
)
BEGIN
  DECLARE v_maestro_rol VARCHAR(20);
  DECLARE v_existe_asignacion INT;
  
  -- Verificar que el usuario es maestro
  SELECT rol INTO v_maestro_rol 
  FROM usuarios 
  WHERE id = p_id_maestro;
  
  IF v_maestro_rol != 'teach' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El usuario no tiene rol de maestro';
  END IF;
  
  -- Verificar si ya existe la asignación
  SELECT COUNT(*) INTO v_existe_asignacion
  FROM cursos_maestros
  WHERE id_curso = p_id_curso AND id_maestro = p_id_maestro;
  
  IF v_existe_asignacion > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El maestro ya está asignado a este curso';
  END IF;
  
  -- Insertar asignación
  INSERT INTO cursos_maestros (id_curso, id_maestro)
  VALUES (p_id_curso, p_id_maestro);
  
  SELECT 'Asignación creada exitosamente' AS mensaje;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `v_cursos_completos`
--

/*!50001 DROP VIEW IF EXISTS `v_cursos_completos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`u7u83cjswi037jk8`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_cursos_completos` AS select `c`.`id` AS `id`,`c`.`nombre` AS `curso_nombre`,`c`.`descripcion` AS `curso_descripcion`,`c`.`cuatri` AS `cuatri`,`ca`.`id` AS `carrera_id`,`ca`.`nombre` AS `carrera_nombre`,count(distinct `cm`.`id_maestro`) AS `num_maestros`,count(distinct `u`.`id`) AS `num_unidades` from (((`cursos` `c` join `carreras` `ca` on((`c`.`id_carrera` = `ca`.`id`))) left join `cursos_maestros` `cm` on((`c`.`id` = `cm`.`id_curso`))) left join `unidades` `u` on((`c`.`id` = `u`.`id_curso`))) group by `c`.`id`,`c`.`nombre`,`c`.`descripcion`,`c`.`cuatri`,`ca`.`id`,`ca`.`nombre` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_maestros_cursos`
--

/*!50001 DROP VIEW IF EXISTS `v_maestros_cursos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`u7u83cjswi037jk8`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_maestros_cursos` AS select `u`.`id` AS `maestro_id`,`u`.`nombre` AS `maestro_nombre`,`u`.`usuario` AS `maestro_usuario`,`c`.`id` AS `curso_id`,`c`.`nombre` AS `curso_nombre`,`ca`.`nombre` AS `carrera_nombre`,`c`.`cuatri` AS `cuatri`,`cm`.`id` AS `asignacion_id` from (((`usuarios` `u` join `cursos_maestros` `cm` on((`u`.`id` = `cm`.`id_maestro`))) join `cursos` `c` on((`cm`.`id_curso` = `c`.`id`))) join `carreras` `ca` on((`c`.`id_carrera` = `ca`.`id`))) where (`u`.`rol` = 'teach') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-30 12:00:51
