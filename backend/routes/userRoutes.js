const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");
const userCtrl = require("../controllers/userCtrl");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", auth, userCtrl.delete);
//router.post("/:id", auth, userCtrl.update);
router.post("/profile", userCtrl.update);
router.get("/profile/:id", auth, userCtrl.getProfile);

module.exports = router;