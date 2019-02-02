adding reference to model
1) relating the Posts with Users by having in post schema have a ref attribute to user/creator

  const postSchema = mongoose.Schema({
    //ref to which model it relates to
    creator:{type:mongoose.Schema.Types.ObjectId, required: true,ref:'User' },  

2) when users send a postservice.ts post route, it returns the creator
    //get creator through token by decoding it and getting the user.id
        creator:req.userData.userId
          });
3) in the posts.js, it receives the request and goes into the check-auth.js

4) there we decode the token and it it contains the user data such as the emil and user id

5) we can attach another req .userData so that in posts.js  it can return that user id to the 2) 

       const decodedToken=jwt.verify(token, "secret_this_should_be_longer");
    req.userData={email:decodedToken.email,userId:decodedToken.userId}
    next();
    



Authorization for editting and deleting if they're not urs u can't edit them
Update:/Delete
1) in the posts.js
1) a post created by userdata.userid has a _id... if they're not in the same object, then it's not validated to edit/delete, however if you are allowed...
2) result.n will be 1, if not will be 0... 
n is a variable found in the results...

Post.deleteOne({_id:req.params.id,creator:req.userData.userId}).then(result=>{
    // req.userData.userId is the user that created the posts' id, _id is the post's id
    // the post won't update if both conditions aren't matched eg if you can't find a file with a post id made by somebody else
    if(result.n>0){
      res.status(200).json({
        message:"Delete Successful"
        })
    } else{
      res.status(401).json({message:"Not authorized to delete"})
    }
  })



How to bring userId to the fron tend and know if you can post or not
1) in post-list.component.ts has a variable for userId, which when initilized will get it thorugh auth service
      this.userId=this.authService.getUserId();

2) Auth service also has a user id variable that when doing this.http.get for login route, will also return the user Id found from the database done in 4)


3)
  - this.saveAuthData(this.token, expirationDate,this.userId); will save the user Id within local storage
  - during refreshes:  autoauth user sets the userId through authInformation and getAuthData
    autoAuthUser() {
            this.userId=authInformation.userId;
  - in logout, userData is cleared from local storage with clearAuthData and logout

1) user.js: when you login, the login post route will return the userId taken from the token 

  res.status(200).json({
        token:token,
        //expires in 3600 seconds 1 hour
        expiresIn:3600,
        userId:fetchedUser._id

2) 



Attaching User Id to posts on the front end
1) in post model add creator
//forces objects to have like a class
export interface Post{
    id:string,
    title:string,
    content:string,
    imagePath:string,
    creator:string
}

2) when you get a post for postlistcomponent, in post service getPosts will get it from the database and the post will include creator


3)          <mat-action-row *ngIf='userIsAuthenticated && userId===postindex.creator'>
will only display if the current user online is the post's creator




