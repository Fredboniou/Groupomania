const db = require("../dbconnect");

exports.createCom = (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const content = req.body.content;
    let image;

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        console.log(image);
    } else {
        image = null;
    }
    
    const sql = "INSERT INTO comment VALUES (NULL, ?, ?, ?, NOW(), ?)";
    const values = [userId, postId, content, image];

    db.query(sql, values, function (err, result) {
        if (err) {
            console.log(err);
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
    const postId = req.params.id;
    
    const sql = "SELECT comment.userId,comment.id, nom, prenom, comment.content, DATE_FORMAT(comment.date, '%d %b %Y %H:%i') AS date, comment.image, user.image AS userPic FROM comment INNER JOIN post ON post.id = comment.postId LEFT JOIN user on user.id = comment.userId WHERE post.id=? ORDER BY comment.date DESC";
    
    db.query(sql, [postId], function (err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Impossible d'afficher les commentaires !" })
        }
        res.status(200).json({ result })
    });
};