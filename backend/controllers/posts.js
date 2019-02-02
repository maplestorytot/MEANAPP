//post model
const Post = require("../models/post");

exports.createPost=(req, res, next) => {
  // first part of url is protocol checking if http https, get host is getting the server eg http:localhost:3000
  const imageurl = req.protocol + "://" + req.get("host");
  //obtaining the request body
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    //this is creating a image url
    //http:localhost:3000/images/filename
    imagePath: imageurl + "/images/" + req.file.filename,
    //get creator through token by decoding it and getting the user.id
    creator: req.userData.userId
  });

  //saves to database
  //created post is the return from the post.save if its successful and contains the new post with the new id
  post.save().then(createdPost => {
    console.log(post);
    res.status(201).json({
      message: "post added successfully",
      //sending post back to be used in angular front end
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath
      }
    });
  })
  .catch(error=>{
    res.status(500).json({message:"Creating a post failed"})
  });
  //everything is okay, new resource created
}

exports.getPosts= (req, res, next) => {
  //2)when paginator does it stuff can send querys to get route to handle
  //eg http://localhost:4200/api/posts/pagesize=2&currentPage=1
  //+ converts then from string to numbers which can be used for math under
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  //posts that will be gotten back, documents
  let fetchedPosts;
  //3) if user does have queries, if not then send everything
  if (pageSize && currentPage) {
    //6)continues to .then and returns all though entries after being filterd
    postQuery
      //4) skip allows us to skip pages eg if on page 2 and each page has 10 posts, will do 10*(2-1)=10...thus first 10 will not be shown
      .skip(pageSize * (currentPage - 1))
      //5)limits amount of posts per page
      .limit(pageSize);
  }
  //return all entries
  //Post.find() will only occur when .then happens
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
      //sending back the count also
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched Successfully",
        posts: fetchedPosts,
        maxPosts: count
      });
    }).catch(error=>res.status(500).json({message:"Couldn't Fetch posts"}));
  //http://localhost:3000/api/posts?pagesize=1&page=4
  //the url used NEED ?
}


exports.deletePost=(req, res, next) => {
  //access to :id
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    result => {
      // req.userData.userId is the user that created the posts' id, _id is the post's id
      // the post won't update if both conditions aren't matched eg if you can't find a file with a post id made by somebody else
      if (result.n > 0) {
        res.status(200).json({
          message: "Delete Successful"
        });
      } else {
        res.status(401).json({ message: "Not authorized to delete" });
      }
    }
  ).catch(error=>res.status(500).json({message:"Couldn't delete post"}));
}

exports.editPost= (req, res, next) => {
  //default value is that taken from the request... eg not uploading new image
  let imagePath = req.body.imagePath;
  //if its a file, create a new url
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    //if new file make new url
    imagePath = url + "/images/" + req.file.filename;
  }
  //otherwise just keep the post and reupdate it
  const updpost = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  //updating one using Post model
  //taking the req query parameters and filtering it through tthat
  //second parameter is the new object that you want to store
  Post.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    updpost
  ).then(result => {
    // req.userData.userId is the user that created the posts' id, _id is the post's id
    // the post won't update if both conditions aren't matched eg if you can't find a file with a post id made by somebody else

    if (result.n > 0) {
      res.status(200).json({
        message: "Update Successful"
      });
    } else {
      res.status(401).json({ message: "Not authorized to edit" });
    }
  }).catch(error=>res.status(500).json({message:"Couldn't update post"}));
}

exports.getPost= (req, res, next) => {
  //return all entries
  //can query more through mongoose docs by narrowing it done
  Post.findById(req.params.id).then(post => {
    //if that post exists send it back
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found"
      });
    }
  }).catch(error=>res.status(500).json({message:"Couldn't fetch post"}));
}
