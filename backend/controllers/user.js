
const User = require("../models/user");
const bycrpt = require("bcryptjs"); //npm install --save bcryptjs
//can hash but can't unhash
const jwt = require("jsonwebtoken");

//different way of exporting a function
exports.createUser= (req, res, next) => {
  //this is encrypting our password from the request
  //the second is salt0r ground which higher number means longer but more safer
  //the result of then is the hash encrypted...
  bycrpt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      //storing email from req
      email: req.body.email,
      //don't store passwords like this
      //npm install --save bcrypt
      password: hash
    });
    //this stores the user in the database and then returns the result  if it suceeded or if there was an error
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "user created",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({message:'Invalid Authentification credentials!'});

      });
  });
}

exports.loginUser= (req, res, next) => {
  let fetchedUser;
  //figuring out of if email exists in database
  //then returns the user if could find an email with the request email submitted..
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        //404 couldn't find or 401 auth denied DO RETURN BECAUSE YOU want it to go back not continue
        return res.status(404).json({ message: "Authentification Failed" });
      }
      fetchedUser=user;
      //if there is a user, take it and compare to the req.body.password by hashing it also
      return bycrpt.compare(req.body.password, user.password);
    })
    //since returns a promise can now take the result true or false
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Authentification Failed" });
      }
      //if the result if false or null or if he just failed to enter the correct password
      //npm install --save jsonwebtoken
      //helps create tokens
      const token = jwt.sign(
        //based on input data of your choice which will be encrypted
        { email: fetchedUser.email, userId: fetchedUser._id },
        //this is the extra piece of randomfyer to token
        process.env.JWT_KEY,
        //when it should expire
        { expiresIn: "1h" }
      );
      //sending a response with the token inside it, its a string
      res.status(200).json({
        token:token,
        //expires in 3600 seconds 1 hour
        expiresIn:3600,
        userId:fetchedUser._id
      });
    })
    //may return an error
    .catch(err => {
      return res.status(404).json({ message: 'Invalid Authentification credentials!' });
    });
}
