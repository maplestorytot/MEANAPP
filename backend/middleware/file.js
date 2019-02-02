//acceptable file types for multer
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
};
//multer
const multer = require("multer");
// disk storage configures how multer stores things
const storageMulter = multer.diskStorage({
  //cb is where should you store it/write
  destination: (req, file, cb) => {
    //error checking to see if
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mimetype");
    if (isValid) {
      error = null;
    }

    //null is if found error
    //second is path relative to server.js
    cb(error, "backend/images");
  },
  //giving the file name
  filename: (req, file, cb) => {
    //taking away white space, make all lowercase, join with dash, and
    //will have file extension
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    //getting the extension from the file through .mimetype
    const ext = MIME_TYPE_MAP[file.mimetype];
    //doing a call back to pass the information to multer
    // null means no error
    //this is a uniq
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


module.exports=multer({ storage: storageMulter }).single("image")
