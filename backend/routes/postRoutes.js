const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/postCtrl");

router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;