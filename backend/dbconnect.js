const mysql = require("mysql");

require("dotenv").config();

console.log("Connexion à la base de données...");

const db = mysql.createConnection({
    database: "foodly",
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.connect(function(error) {
    if(error) throw error;
    console.log("Connecté !");
});

module.exports = db;