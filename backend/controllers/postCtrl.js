const db = require("../dbconnect");

exports.createPost = (req, res) => {
    const userId = req.body.userId;
    const content = req.body.content;

    const sql = "INSERT INTO post VALUES (NULL, ?, ?, NOW(), 0)";
    const values = [userId, content];

    db.query(sql, values, function(err, result) {
        if (err) {
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
        res.status(201).json({ message: "Post supprimé !" })
    });
};

exports.updatePost = (req, res) => {
    const postId = req.params.id;
    const content = req.body.content;

    const sql = "UPDATE post SET content=?, date=NOW() WHERE id=?"
    const values = [content, postId];

    db.query(sql, values, function(err, result) {
        if (err) {
            return res.status(400).json({ message: "Impossible de modifier le post !" })
        }
        res.status(201).json({ message: "Post modifié !" })
    });
};

exports.getAllPosts = (req, res) => {
    const sql = ""
}