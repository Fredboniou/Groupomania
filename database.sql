-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `image` text,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (4,23,7,'un premier commentaire','2021-12-27 18:43:11',NULL),(5,23,8,'* première','2021-12-28 08:34:30',NULL),(8,15,8,'Salut, bienvenue sur le forum','2021-12-28 09:57:05',NULL),(9,15,7,'Encore un commentaire','2021-12-28 09:58:17',NULL),(11,15,9,'Dans notre service aussi...','2022-01-06 15:29:22','http://localhost:3000/images/reunion1.jpg1641479362160.jpg');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `likes` int NOT NULL DEFAULT '0',
  `image` text,
  PRIMARY KEY (`id`),
  KEY `fk_userId` (`userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (5,14,'premier post modifié','2022-01-07 15:02:01',0,NULL),(7,14,'un autre post modifié pour vérifier que les commentaires sont toujours la','2022-01-07 15:03:05',0,NULL),(8,23,'Voila, je me décide, et je crée ma toute première publication sur le réseau pour souhaiter un grand bonjour à tous mes collègues !','2022-01-12 14:09:15',0,NULL),(9,23,'réunion d\'avant hier matin','2022-01-21 16:07:56',0,'http://localhost:3000/images/reunion.jpg1642760421559.jpg');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `date_naissance` date DEFAULT NULL,
  `bio` text,
  `ville` varchar(100) DEFAULT NULL,
  `ecole` varchar(100) DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (14,'valjean','jean','jv@groupomania.com','$2b$10$lYz6ELU2dEAtUCXZLnPWHe0F1TG6rWO3ADBospwQ5g6wgZxlhKuWS',0,'1972-02-05','','Paris','','http://localhost:3000/images/jean-valjean.jpg1641411499463.jpg'),(15,'Tournesol','Tryphon','tt@groupomania.com','$2b$10$Mk2I/4rB8JOsxrmRTY5je.Nup4YhQg11NzQneua50J2ZDUFtBRTu.',0,'1975-08-10','','','','http://localhost:3000/images/professeur-tournesol-250.jpg1641405117387.jpg'),(23,'boniou','frederic','f.boniou@gmail.com','$2b$10$ULNNuqWJpyT68C1EUnvWaeWu1FHhQCImx6tuu1.dtXdz1518dKp5e',1,'1985-08-10','en reconversion professionnelle','Ploudaniel','La Croix Rouge Brest','http://localhost:3000/images/homer-etonne.jpg1641404916479.jpg'),(24,'Doe','John','jd@groupomania.com','$2b$10$uwbnU.5EXDa8EO56dRVzs./uuP7xlyK9JdNRL8.tI5dOjsVpldIQW',0,'1983-11-08','Diplômé de l\'UPA je suis dans l\'entreprise depuis 6 ans','Pau','Université des Pyrénées Atlantiques ','http://localhost:3000/images/johndoe.jpg1641825113822.jpg'),(27,'Doe','Jane','jdoe@groupomania.com','$2b$10$y5K9t2EhEmHZevzG4yjO0u2ciVNV/8qStsNh8Y3fHF/gnqle1jFFG',0,NULL,NULL,NULL,NULL,NULL),(34,'boniou','francois','fb@gmail.com','$2b$10$oU5cdT1pejOhOPG70a283O3sNnw7pqBEVNNZ0dcnq9PFsjVP.1dDa',0,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-23 18:31:34
