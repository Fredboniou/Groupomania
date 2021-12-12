const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const commentCtrl = require("../controllers/commentCtrl");

router.get("/", auth, commentCtrl.getAllCom);
router.post("/", auth, multer, commentCtrl.createCom);
router.delete("/:id", auth, commentCtrl.deleteCom);
router.update("/:id", auth, commentCtrl.updateCom);

module.exports = router;