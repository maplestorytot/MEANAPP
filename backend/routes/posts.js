const express = require("express");
//same app
const router = express.Router();

const PostController=require('../controllers/posts')
//multer portion means looking for a single file from the request,
//authorization middleware
const checkAuth = require("../middleware/check-auth");

const extractFile = require("../middleware/file");

//looking for image req body... storaging that image
router.post(
  "",checkAuth,extractFile, PostController.createPost
);

//1)a get request for data from server
//must use this url to reach this code
router.get("",PostController.getPosts);

//query through :id, dynamically passed id
///api/posts/someid
router.delete("/:id", checkAuth, PostController.deletePost);

//editting put or patch -update existing resource with new data
router.put(
  "/:id", checkAuth,extractFile,PostController.editPost);

//get request for a single post
router.get("/:id",PostController.getPost);

module.exports = router;
