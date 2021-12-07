const db = require("../dbconnect"); //connexion bdd
const bcrypt = require("bcrypt"); //sécurisation mdp
const jwt = require("jsonwebtoken"); //création token authentification

exports.signup = (req, res) => {
    const nom = req.body.name;
    const prenom = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10) //le mdp est hashé 10 fois, suffisant pour la version développement
        .then(hash => {
            const sql = "INSERT INTO user VALUES (Null, ?, ?, ?, ?, 0)"; //on peut passer NULL pour l'id, MySQL va l'incrémenter automatiquement

            const values = [nom, prenom, email, hash];

            db.query(sql, values, function(err, res) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Une erreur s'est produite lors de l'inscription" }); //400: erreur utilisateur
                }
                res.status(201).json({ message: "Utilisateur enregistré" }); //201: création réussie
            });
        })
        .catch((err) => {
            res.status(500).json({ err }) //500: erreur serveur
        })
};