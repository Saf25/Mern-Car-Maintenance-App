const express = require("express");
const middelware = require("../middelware/authMiddelware");
const {
  addPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const adminMiddelware = require("../middelware/adminMiddelware");
const Post = require("../models/postModel");
const router = express.Router();

// middelware can be called whenever we will need it
//never forget / before route it will geberate a big problem
router.get("/getposts", middelware, getPosts);
router.post("/newpost", middelware, addPost);
router.delete("/deletepost/:postId", middelware, deletePost);
router.delete("/deletepost/:postId", middelware, adminMiddelware, (req, res) =>
  Post.findByIdAndRemove(req.params.postId)
);
router.put("/updatepost/:postId", middelware, updatePost);
module.exports = router;

//houni bech tnajem t5ali koun l admin ya3mel post
//tji t7ot l adminMiddelware fel route ta3 new Post

//houni bech ynajem l admin ya3mel delet lazem nzid route jdida lel admin
//router.delete("/deletepost/:postId", middelware,adminMiddelware,(req,res)=>);
//fi west route hedh ayfasa5 lposte elli 7achtou bih
//matnajamch testa3mel delete
