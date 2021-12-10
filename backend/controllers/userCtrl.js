const db = require("../dbconnect"); //connexion bdd
const bcrypt = require("bcrypt"); //sécurisation mdp
const jwt = require("jsonwebtoken"); //création token authentification


exports.signup = (req, res) => {
    const name = req.body.name;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10) //le mdp est hashé 10 fois, suffisant pour la version développement    
    .then(hash => {
            const sql = "INSERT INTO user VALUES (Null, ?, ?, ?, ?, 0)"; //on peut passer NULL pour l'id, MySQL va l'incrémenter automatiquement
                                                                         //le ? est la manière la plus sûre de se protéger contre les attaques par injection
            const values = [name, firstname, email, hash];

            db.query(sql, values, function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Une erreur s'est produite lors de l'inscription" }); //400: erreur utilisateur, bad request
                }
                res.status(201).json({ message: "Utilisateur enregistré" }); //201: création réussie
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err }) //500: erreur serveur
        })
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password  = req.body.password;
    const sql = "SELECT * FROM user WHERE email=?";

    db.query(sql, [email], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(password, result[0].password) //on cherche la correspondance mdp et mdp crypté enregistré dans la bdd
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ message: "Mot de passe incorrect !" });
                }
                res.status(200).json({ //si il y a une correspondance, on génère un token d'authentification
                    userId: result[0].id,
                    token: jwt.sign(
                        {userId: result[0].id},
                        process.env.DB_TOKEN,
                        {expiresIn: "24h"}
                    )

                });
            });
    });
};

exports.delete = (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM user WHERE id=?";

    db.query(sql, [userId], function(err, result) {
        if (err) {
            return res.status(500).json({ err })
        }
        res.status(201).json({ message: "Utilisateur supprimé !" })
    })
}