-----------------------------------------------------------------
Image Upload
-note: images are stored as urls through file reader found in how to image preview section



Remaking Forms using reactive
1) import { FormGroup,FormControl,Validators } from "@angular/forms";

form group is wrapper for formcontrol
form control are basically a form
validators are what will validate the input before submitting

2) import formgroup and create a form like so in the exports in ngoninit form:FormGroup;

  <this.form=new FormGroup({
      //null is empty input at beginning
      //validators is array of validators
      //required means must be inputted before submit
      'title':new FormControl(null,{validators:[
        Validators.required,
        Validators.minLength(3)
      ]}),
      'content':new FormControl(null,{validators:[Validators.required]})
    });

3) to connect this formgroup to the html form input
<form [formGroup]="form"  (submit)="onSavePost()" *ngIf="!isLoading">

add formgroup and the name of the form made

4) to connect form control to inputs texts
 <input matInput
            type="text"
            formControlName="'title'"
            placeholder="Enter Title"
            <!--Error messages first way-->
  
give it the formControlName made in the formGroup

5)
can do error checking like so 
<mat-error *ngIf="form.get('title').invalid"></mat-error>


How to make sure that react form displays editted post/How to set form values programmacticlly
1)   use setValue
<this.form.setValue({'title':this.edittedPost.title,'content':this.edittedPost.content});
        });


2) How to access form values
if (this.mode === "create") {
      //this is where the form controls' are going to be placed here.
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
3) how to reset the form
this.form.rest();



Creating the file upload button
1) this is using the button as the visual and input as the function can click it through #filePicker
 <div>
          <button mat-stroked-button type="button" (click)="filePicker.click()">
            Pick Image
          </button>
          //this is invisible
                    <input type="file" #filePicker(change)="onImagePicked($event)">

        </div>

2) change is that whenever the file is changed eg upload 1 or changes it...
3)onImagePicked($event)
  this method activates when it is clicked
  -event is that forward event to onImagePicked

3) <onImagedPicked(event:Event){
    //as tell event.target that it is a html input
    //get the first file
    const file=(event.target as HTMLInputElement).files[0];
    //patch value lets you set only a single control unlike setvalue which is all controls
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();

  }
  -    // inform angular that value is changed and should store it again and revalidate it

4) Add another form control to the formGroup
  -      'image':new FormControl(null,{validators:[Validators.required]})

in 3) when the 
<this.form.get('image').updateValueAndValidity();>
it is updating it there and now exists on the form



How to add image preview
1) create <img src> in html
2) create a image-preview:string,
which is the url or the image
3)Use file reader to read the file's content and convert it into a dataurl that can be accessed by the <img src='url'>

    //image previewing~~~~
    const reader= new FileReader();
    //when the reader is done loading it will perform this function
    reader.onload=()=>{
      this.imagePreview=reader.result;
    };
    //first the reader will read the file uploaded as a url
    //next it will take that result set it to imagePreview
    reader.readAsDataURL(file);
3) in html
          <!--If the image preview exists and it doesn't have a url of nothing then preview it using src-->
          <img src="image-preview" [alt]="form.value.title" *ngIf="imagePreview !=='' && imagePreview">
4) use css to style it


Creating an image validator if the file uploaded is eg jpeg png etc
1) <mimetype validator.ts> create it... it will return null: valid or true/false: invalid
2) <import {mimeType} from './mime-type.validator';
mimeType is the function name founnd in mimetypevalidator ts
3)   in the image control add the validator

   'image':new FormControl(null,{validators:[Validators.required],asyncValidators:[mimeType]})
4) now if invalid will do nothing
    //check if the ngFor m is without errors, then add the post to the postServices using its addPost method
      onSavePost() {
        if (this.form.invalid) {
          return;
        }
        //d


Uploading Images to the server backend/images 
1- npm install --save multer
  -like body parser that helps extract incoming files from a request
2- in </backendposts.js> use <multer>to help store file/images
3- it has two parts:
  destination: /backend/images folder
  filename: create a filename through uniq file type

        //acceptable file types for multer
        const MIME_TYPE_MAP={
          'image/png':'png',
          'image/jpeg':'jpeg',
          'image/jpg':'jpg'
        }
        //multer
        const multer=require('multer');
        // disk storage configures how multer stores things
        const storageMulter=multer.diskStore({

          //cb is where should you store it/write
          destination:(req,file,cb)=>{
            //error checking to see if
            const isValid=MIME_TYPE_MAP[file.mimetype];
            let error = new Error('Invalid mimetype');
            if(isValid){
              error=null;
            }

            //null is if found error
            //second is path relative to server.js
            cb(error,'backend/images');
          },
          //giving the file name
          filename:(req,file,cb)=>{
            //taking away white space, make all lowercase, join with dash, and
            //will have file extension
            const name=file.originalname.toLowerCase().split(' ').join('-');
            //getting the extension from the file through .mimetype
            const ext=MIME_TYPE_MAP(file.mimetype);
            //doing a call back to pass the information to multer
            // null means no error
            //this is a uniq
            cb(null, name+'-'+Date.now()+'.'+ext);
          }
        });

4- in router.post, can add multer as an attribute to use it by providing an image as a parameter  

        router.post('',multer(storageMulter).single('image'),(req,res,next)=>{



Uploading a picture to the backend/images:
1-   in postcreatecomponent.ts    <this.postsService.addPost(this.form.value.title, this.form.value.content,this.form.value.image);
  - this is getting the form control of image
2 -  addPost(title: string, content: string, image:File) {
   <const postData= new FormData;
    postData.append("title":title);
    postData.append("content":content);
    postData.append("image", image, title)

    -create a new postData item to be sent to back end with <FormData>
3-  <this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        postData
      )

    -pass postData as a parameter 
4-
.subscribe(responseData => {
        const post:Post={
          id:responseData.postId,title:title,content:content
        };
  -take the response back to create the new item into the front end to then be notified in the end
5- in the back end multer will put that image in the backend/images.





Uploading picture to the front end
since all the routes are set up basically just need to add a url for the images and add that into the post model and adjust accordingly
1)
  // first part of url is protocol checking if http https, get host is getting the server eg http:localhost:3000

 const imageurl=req.protocol + '://' +req.get("host");
  //obtaining the request body

  const post= new Post({
     title: req.body.title,
     content:req.body.content,
     //this is creating a image url 
     //http:localhost:3000/images/filename
     imagePath:imageurl + "/images/"+req.file.filename
      });
2) sending back a post when the get route is requested

res.status(201).json({
      message:"post added successfully",
//sending post back to be used in angular front end
      post:{
        id:createdPost._id,
        title:createdPost.title,
        content:createdPost.content,
        imagePath:createdPost.imagePath
      }

3) back in app service ts when posting it, also gets back the image path
this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe(responseData => {
        const post:Post={
          id:responseData.post.id,title:title,content:content,imagePath:responseData.post.imagePath
        };

4) when getting the post's back, will contain the image Path 
 getPosts() {
    
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")

      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath:post.imagePath
            };
          });
        })
      ) .subscribe(transformedPosts => {        this.postsUpdated.next([...this.posts]);


5)in html           <img [src]="postindex.imagePath" [alt]="postindex.title">
so when displaying that image, use the image path that is found within the posts that just got emitted before in 4)        this.postsUpdated.next([...this.posts]);


note need to do below to do images sharing
How to allow access to the back end's images
-only through routing with the correct url can you assess the image
in app.js add middleware
1-const path= require('path');
2- app.use("/images",express.static(path.join('backend/images')))


Theory on image storing>> 
- in the database we are storing the image's url/ path 
- but in the server we are storing the actual photo and uploading it in so it becomes easy to access
- think of it like each image is a separate page on the domain with it's own url/path and to use that image just take it from that path...
http://localhost:4200/backend/images/asf-1534900959139.png its a file now



Updating images post
1)  this is sending back the image's path to the form  as string

this.form.setValue({'title':this.edittedPost.title,'content':this.edittedPost.content,image:this.edittedPost.imagePath});

passing image
onSavePost() {
 else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.imagePath
2)  since can put in a file or be getting a string from 1) can be either
  updatePost(id: string, title: string, content: string, image:File|string) {

3) The next post data will be created based on if it was changed

 let postData:Post|FormData;
    //new post checking if uploading a file
    //this is a file/ object thus the picture was changed
    if(typeof(image) ==='object'){
     const postData= new FormData();
     postData.append("title":title);
    postData.append("content":content);
    postData.append("image", image, title)
   }
   //if not uploading a file eg just the editting image string path
   else{
//create a new post object, data gotton from post-create.component.html's form data
    const postData: Post = {
      id: id,
      title: title,
      content: content,
      //this is just a string since nothing was changed
      imagePath:image
    };
   }
4) in the router, the editted post is stored either as a file or a string a return it to the subscription in 3) which then will to emit it to the rest of the app the new file. before that multer saves it in the backend as a basically new route see last module to understand more on theory


  router.put('/:id',multer({storage:storageMulter}).single('image'),(req,res,next)=>{
  //default value is that taken from the request... eg not uploading new image
  let imagePath = req.body.imagePath;
      //if its a file, create a new url
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      //if new file make new url
      imagePath = url + "/images/" + req.file.filename
    }
    //    //otherwise just keep the post and reupdate it
    const updpost = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    });

5) Since when uploading images that may be of string now, in the mimetype validator add 'of' which allows you to send back an observable that is null meaning makes everything valid... for validation check 
import { Observable, Observer, of } from "rxjs";
 if(typeof(control.value)==='string'){
    return of(null);
  }

6)Finally when displaying that image, it will still have the new url and will be saved in the backend/images either in the first place that its already there or second place that its a new image
----------------------------------------------------------------------------


FAQ Difference between Multer and post.save user.save
 


1) post.save saves it to the mongodb
post.save().then(createdPost=>{
          console.log(post);
2) multer saves it to the server as a new route 
 <router.put('/:id',multer({storage:storageMulter}).single('image'),(req,res,next)=>{
