const express = require("express");

const app = express();

app.use(express.json()); //remplace body-parser devenu obsolète
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

const userRoutes = require("./routes/userRoutes");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use("/api/user", userRoutes);


module.exports = app;