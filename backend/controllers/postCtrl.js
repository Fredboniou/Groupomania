const db = require("../dbconnect");

exports.createPost = (req, res) => {
    const userId = req.body.userId;
    const content = req.body.content;
    let image;

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        console.log(image);
    } else {
        image = null;
    }

    const sql = "INSERT INTO post VALUES (NULL, ?, ?, NOW(), 0, ?)";
    const values = [userId, content, image];

    db.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Erreur lors de la création du post !" })
        }
        res.status(201).json({ message: "Post créé !" })
    })

}

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    const sql = "DELETE FROM post WHERE id=?";
    db.query(sql, [postId], function(err, result) {
        if (err) {
            return res.status(400).json({ message: "Impossible de supprimer le post !" })
        }
        res.status(200).json({ message: "Post supprimé !" })
    });
};

exports.updatePost = (req, res) => {
    const postId = req.params.id;
    const content = req.body.content;
    let image;

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        console.log(image);
    } else {
        image = null;
    }

    const sql = "UPDATE post SET content=?, date=NOW(), image=? WHERE id=?"
    const values = [content, image, postId];

    db.query(sql, values, function(err, result) {
        if (err) {
            return res.status(400).json({ message: "Impossible de modifier le post !" })
        }
        res.status(201).json({ message: "Post modifié !" })
    });
};

exports.getAllPosts = (req, res) => {
    const sql = "SELECT post.id, userId, nom, prenom, content, DATE_FORMAT(post.date, 'le %d %b %Y à %H:%i') AS date, likes, post.image FROM user INNER JOIN post ON user.id = post.userId ORDER BY post.date DESC";

    db.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Impossible d'afficher le fil d'actualité !" })
        }
        res.status(200).json({ result })
    });
};

exports.getOnePost = (req, res) => {
    const postId = req.params.id;
    //const sql = "SELECT post.id, nom, prenom, content, date, DATE_FORMAT(date, 'le %d-%m-%Y à %H:%i') AS date, likes FROM user INNER JOIN post ON user.id = post.userId WHERE post.id=?";
    const sql = "SELECT content, image FROM post WHERE id=?"
    db.query(sql, [postId], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Impossible d'afficher ce post !" })
        }
        res.status(200).json({ result })
    })
}