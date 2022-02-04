const Post = require("../models/postModel");

////@ desc add a new post
//route GET/api/post/newpost
//@access private-user

const addPost = async (req, res) => {
  try {
    //req.userId will be called via middelware since it was created in Middelware

    const userId = req.userId;
    const { Car_Manufacturer, Model, Engine_capacity, Horse_Power } = req.body;

    //userid here is to identify id of the user creating the post

    const newPost = await Post.create({
      Car_Manufacturer,
      Model,
      Engine_capacity,
      Horse_Power,
      owner: userId,
    });
    return res.json(newPost);
  } catch (error) {
    res.status(500).json({ msg: `something went wrong ${error}` });
  }
};

////@ desc get all Posts
//route GET/api/post/getposts
//@access public

const getPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const posts = await Post.find();
    const myposts = await posts.filter((o) => String(o.owner._id) === userId);
    //populate will generate the infos of the owner and - except password

    //houni fama astuce psk ne7ina l _id welli houa 7chtna bih fel front fel POstcard
    //dc raja3neh heka a3lech 9olna bch nesta79ouh fel front
    //houa rja3li objet toul hedha bech nest7a9ou fel front dc man3louch - lel _id

    return res.json([...myposts]);
  } catch (error) {
    res.status(500).json({ msg: `something went wrong ${error}` });
  }
};

////@ desc delete Post by Id
//route POST/api/post/deletepost/:postId
//@access PRIVATE - owner

const deletePost = async (req, res) => {
  try {
    //houni appel lel post bkolou
    //1.bech yal9a l post eli bel id elli je fel params
    //2. w yraja3li les infos ta3 l post
    //3. elli bidhom fehom l owner
    const post = await Post.findByIdAndRemove(req.params.postId);
    const posts = await Post.find();
    return res.json(...posts);
  } catch (error) {
    res.status(500).json({ msg: `something went wrong ${error}` });
  }
};

////@ desc update Post by Id
//@route PUT/api/post/updatepost/:postId
//@access PRIVATE - owner

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    ////l'etape hedhi juste pr vérifier elli bch ybadel post authorized or not

    if (String(post.owner._id) !== req.userId)
      return res
        .status(401)
        .json({ msg: "you are not authorized to update this post" });
    await Post.findByIdAndUpdate(req.params.postId, { ...req.body });
    res.json({ msg: "Post has been updated succesfully" });
  } catch (error) {
    res.status(500).json({ msg: `something went wrong ${error}` });
  }
};

module.exports = { addPost, getPosts, deletePost, updatePost };
