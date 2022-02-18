Groupomania
P7 du parcours Dev Web chez OpenClassrooms

Pour commencer...
--------------------------------------------------------
- Vérifiez que NodeJS est installé sur votre machine :
    - Ouvrez l'invite de commande et tapez : node -v
        - Si NodeJS est installé, vXX.XX.X va apparaître. Il s'agit de la version de node qui est installée.

- Si NodeJS n'est pas installé :
    - Rendez-vous sur le site nodejs.org et installez la dernière version stable disponible (LTS).Cela va également installer NPM.

- Si vous ne l'avez pas, installez MySQL
    - Rendez vous sur https://dev.mysql.com/downloads/installer/ . Une fois le téléchargement terminé, installez MySQL.
    - Ouvrez la console MySQL et créez votre utilisateur ou connectez vous
    - Pour créer un utilisateur root (qui aura tous les droits administrateur) tapez la commande :
        - mysqladmin -u root password "votre mot de passe"
    - Créez la base de données en tapant : CREATE DATABASE choisissez-un-nom;

- Clonez le projet sur votre machine

- Rendez vous dans le dossier backend renommer le fichier .env.ex en .env puis ouvrez le.
    - DB_USER=votre nom d'utilisateur MySQL
    - DB_PASSWORD=votre mot de passe MySQL
    - DB_TOKEN=créez un token
    - DB_PORT=le port sur lequel tourne votre server
    - DB_NAME=le-nom-que-vous-avez-choisi
    
- Importez la base de données qui se trouve dans le dossier database.sql :
    - Ouvrez cmd, et naviguez dans le dossier ou l'app a été clonée,
    - tapez : mysql -u root -p"votre mot de passe" le-nom-que-vous-avez-choisi < database.sql (veillez à ne pas mettre d'espace entre '-p' et votre mot de passe)
    - Fermez puis redémarrez la console MySQL et reconnectez vous


Démarrer l'application...
---------------------------------------------------------
- Dans le terminal, naviguez jusqu'au dossier backend :
    - Installez les dépendances nécessaires au bon fonctionnement du projet :
        - Tapez npm install
    - Démarrez le serveur :
        - Tapez nodemon server

- Toujours dans le terminal, naviguez jusqu'au dossier frontend :
    - Installez les dépendances nécessaires
        - A nouveau, tapez npm install
        - Tapez npm run serve

Lancez l'application :
-----------------------------------------------------------
- ouvrez l'application en cliquant sur http://localhost:8080/

Utilisation...
------------------------------------------------------------
- Créez votre compte
- Accédez au fil d'actualité en vous identifiant
- Vous êtes connecté ! Vous n'avez plus qu'à naviguer dans l'application afin de la découvrir
