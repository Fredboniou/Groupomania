const db = require("../dbconnect");

exports.createCom = (req, res) => {
    const userId = req.params.userId;
    const content = req.body.content;
    
    const sql = "INSERT INTO comment VALUES (NULL, ?, ?, ?, NOW())";
    const values = [userId, content];

    db.query(sql, values, function (err, result) {
        if (err) {
            return res.status(400).json({ message: "Création du commentaire impossible !" })
        }
        res.status(201).json({ message: "Commentaire créé !" })
    });
};

exports.deleteCom = (req, res) => {
    const commentId = req.params.id;

    const sql = "DELETE FROM comment WHERE id=?";

    db.query(sql, [commentId], function (err, result) {
        if (err) {
            return res.status(400).json({ message: "Suppression du commentaire impossible !" })
        }
        res.status(200).json({ message: "Commentaire supprimé !" })
    });
};

exports.updateCom = (req, res) => {
    const commentId = req.params.id;
    const content = req.body.content;

    const sql = "UPDATE comment SET content=?, date=NOW() WHERE id=?";
    const values = [content, commentId];

    db.query(sql, values, function (err, result) {
        if (err) {
            return res.status(400).json({ message: "Modification du commentaire impossible !" })
        }
        res.status(200).json({ message: "Commentaire modifié !" })
    });
};

exports.getAllCom = (req, res) => {
    const sql = "SELECT nom, prenom, content, date, DATE_FORMAT(date, '%d-%m-%Y %H:%i') AS date FROM user INNER JOIN comment ON user.id = comment.userId";

    db.query(sql, function (err, result) {
        if (err) {
            return res.status(400).json({ message: "Impossible d'afficher les commentaires !" })
        }
        res.status(200).json({ result })
    });
};