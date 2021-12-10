const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/postCtrl");

router.post("/", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.updatePost);

module.exports = router;