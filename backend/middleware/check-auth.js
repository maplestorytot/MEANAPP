const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // next will keep any fields created
    const decodedToken=jwt.verify(token, process.env.JWT_KEY,
    );
    req.userData={email:decodedToken.email,userId:decodedToken.userId}
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};

/*//check whether authenitcated or not
const jwt = require("jsonwebtoken");

//this is a middleware function that will be next if it passes
module.exports=(req,res,next)=>{
  //try to check if there's an error when spliting etc
  try{
  //this is an "extra" way of inputting tokens into requests
  //req.header.authorization is that in the request, we will attach a header to it
  //"Bearer fdsafsasdafdas usually will look like this... header"
  //.split takes awaay space between bearer and fadalksjfa and make an array and we taken index 1 for the token
  const token=req.header.authorization.split(' ')[1]

  //will error if it fails to verify
  jwt.verify(token,'secretthisshouldbelongerandrandom');
  //if verify doesn't fail do  next to continue in the middlewares
  next();
  } catch(error){
    res.status(401).json({message:'authentification failed'});
  }


  };
*/
