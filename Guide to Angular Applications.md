Basics:


Installing angular cli and nodejs
1) install node.js
2) angular.cli 
3)npm install -g @angular/cli
4) ng new-project-name
5) cd new-project-name
6) ng serve


How is Angular Started up:
1) main.ts has ngmodules which start up @NgModule in <app.module.ts>
2) @NgModule creates App Component, PostCreateComponent 


Architechture of Angular: 
1) When it starts up, angular searches for start point which is src/index.html
2) index.html contains <app-root></app-root> which connects to <app.component.ts>
3) <app.component.ts> contains @Component and a selector, which was in step 2) <app-root> used to be accessed
4) @Component contains other components, <app.component.html> and <app.component.ts> and <app.component.css>


How Components are put together
1) Within index.html --> <app.component.html> --> can add other components by adding their selector 
eg. <app-post-create></app-post-create> (Note: must first add the component in @ngModule declaration)
2) Angular works in components eg HTML files
3) Angular can be split up into components (found in app folder) and can be put together eg into a webpage
 It is basically deconstructing an html into smaller parts that can reused. 

            such as 
            header.html  <app-header>
            paragraphs.html <app-navigation-items>
            footer.html <app-features>
                        <app-features-searchbar>
                        <app-anything>

How to Add Components to App Component(main)
 Can add created components to index.html by adding its selector  
 Need to go to 
 -app.module.ts
 -import the new component
 -adding to ngmodule
 -adding to declarations
Add this to app.module.ts <import{PostCreateComponent} from './posts/post-create/post-create.component';>


How to Create a Component (example at /src/app/posts)
1)/src create app folder
2) Create components, follow naming pattern
3) in <post-create.component.ts> insert <import { Component } from '@angular/core';>
4) Create a selector name which is used in How Components are put together
5) add @Component class which includes the <post-create.component.html> and css
6) in <post-create.component.html> can begin coding front end


How to create events (Events in <post-create.components.ts>)
 1) create methods within exports class in <post-create.components.ts>
 2) in <post-create.component.html> create the event that accesses the method such as button clicking in  <button (click)="onAddPost(postInput)">Save Post</button>


 How to access specific html elements/get value of elements/forms #
 1) add  #name as attribute of the element eg. <textarea rows="6" [value]="newPost" #postInput></textarea>
 2) can then be used as a parameter in <button (click)="onAddPost(postInput)">Save Post</button>
 3) make sure to add parameters like in <post-create.component.ts> export method 
 <onAddPost(postInput:HTMLTextAreaElement)>
 4) in <post-create.component.ts> in exports method can get value of within postInput.value
 


How to Quickly Display Information
1) <post-create.component.ts> in exports method, can create a new variable <newPost> with a default value
2) when the method is called get value of within postInput.value and set it as that value
3) then can post that <p>{{newPost}}</p>... it is accessing the <post-create.component.ts> exports methods and getting that value that was just set in step 2


Another Way to Display information
1) Add to <app.module.ts> <import{FormsModule} from '@angular/forms';>
2) add in imports: [
    
    FormsModule
  ],
3) Add as an attribute to element in<post-create.component.html> [(ngModel)]
4) [(ngModel)] is two directional binding, it is a directive
5) [(ngModel)] listens to user input and emits that data and saves that data in the text area output
6) [(ngModel)]="enteredValue" 
7) enteredValue is a variable in <post-create.component.ts> in exports method

STYLING

First method: 
Angular Material
1) ng add @angular/material
2) What does it do:
    -add dependcies in package.json
    -angular.json added default style theme
    -For STYLING: nodemodule/angular/materials/prebuilt-themes
    -app.module.ts added browser animations module
    -index got changed a little
3) To add angular material into program <import {MatInputModule}from '@angular/material';
4) add MatInputModule into importants in <app.module.ts>
5) in <post-create.component.html> add attribute <matInput> in 
<textarea matInput rows="6" [(ngModel)] = "enteredValue" ></textarea>

Second Method:
1) add a custom style.css <post-create.component.css>
2) add it in <post-create.component.ts in @component <    styleUrls:['./post-create.component.css']>


How to Create a header Component? (look at header folder)
1) Create the component
2) use <mat-toolbar color="primary">
3) colors available are warn = red, accent = secondary theme color, primary = main theme color


How to Create post create tab (look at posts folder)
1) Create the component
2) use <mat-card> 
    <mat-form-field>

How to Create posts
1) Create the component
2) 


Adding Posts
1) in <post-create.component.ts ><onAddPost>, create a const object for a post
<const post = { title: this.enteredContent, content: this.enteredContent };>
2) TO EMIT DATA:
need to emit event import EventEmitter
3) create a new item <postCreated= new EventEmitter();>
4) in <onAddPost>, add <this.postCreated.emit(post)>
5) import Output //allows onAddPost event to be 
6) @Output() postCreated //this allows postcreated to be called in direct parent component<post-create.component>
7) TO LISTEN TO DATA:
Create storedPosts=[];
  onPostAdded(post){
    this.storedPosts.push(post);
  }
  This is a stored data that will push the data receieved from $event step 9 into an array
8) import Input in post-list.component.ts     @Input() posts=[];

9) Change it to this     <app-post-create (postCreated)="onPostAdded($event)"></app-post-create>
    when <app-post-create> is called, it will call <postCreated>, and will call<onPostedAdded($event)>, $event is the data within postCreated passed as a parameter

10)  Change it to    <app-post-list [posts]="storedPosts"></app-post-list>
    when it called, posts array from post-list.component.ts will take storedPosts as a array, then will render it all
Summary:<app-post-create (postCreated)="onPostAdded($event)"></app-post-create>
    <app-post-list [posts]="storedPosts"></app-post-list>
    1)postCreated emits itself which contains a new post
    2)onPostAdded takes that data in $event, and adds it to storedPosts in PARENT Class
    3)posts array becomes storedPosts, which then goes onto display all that through <post-list.component.html>'s <*ngFor> forloop


Creatng a post model
    1) create <post.model.ts>
    2) in it create an interface, that defines instance variables that define what an object should have and its  datatypes
    3) make it exportable <export interface name {
        nameofdata:datatype,
        nameofdata:datatype
    }>
    4) can now export to files that work with posts
    5) eg. in <post-create.component.ts> can edit new EventEmitter<Post>(); and     const post:Post
     in <post-list.component.ts> posts:Post[]=[]; makes it be an array of posts
     in <app.components.ts>  storedPosts:Post[]=[];


How to Create Forms

1) button attribute type=symbol
2) will trigger the submit in form
3) <form (submit)="onAddPost(postForm)" #postForm="">
    which function to activate
    #postForm is its own local reference to use in the html
    "ngForm" creates a form object that can manipulated
4) add ngModel to input field within form, also add a name
 ngModel registers the input field as a part of the entire overlying form
5) in onAddPost(form:NgForm){}; this allows the form object to be used as a parameter
6) can access ngModel values... eg form.value.content
7) html5 validation: add as attribute to the input 
    -required: checks if input is valid
    -minlength="3";
    use form.invalid to check if should return;
8) to reset form form.resetForm when called in the submit onaddpost

Form Error Handling
1)  place this under the input you want to check         <mat-error *ngIf="title.invalid"></mat-error> use angular material
2) in the input attribute add #title="ngModel" to have it be accessed by the html


Creating a Service
1) <post.service.ts> stores the real data of the <post array>
2) can create get statements in the post
3) can create methods to edit that  <post array>


How to inject a service
1) create a constructor in another location eg.<post-creat.component.ts>
2)  constructor(public postsService:PostService){
    }
    ngOnInit(){
        
    }
3)How to make a service injectable
@Injectable({providedIn:'root'}); 
//This allows the service to be injected into other Components...
//it goes into app.module.ts and adds it as a provider... at the root
//A provider is something that can create or deliver a service, here it starts up this service to provide it
//Here it only makes one version of the service


How to call methods from services  (lifecycle hooks)
1) Services are basically a collection of variables/methods that can be injected into other places to be used
1) import oninit <import{Component, Input,OnInit} from '@angular/core';>
2) add it to the export class like so <export class PostListComponent implements OnInit{

3) use the method ngoniit < ngOnInit(){
        this.post=this.postsService.getPosts();
    }


Rxjs Observables Observer Subject Subscribe...
Set Up:
1) in post.service.ts <import {Subject} from 'rxjs'; <Subject > is an event emitter
2) creating the subject as an object, pass list of posts
    <private postsUpdated = new Subject<Post [] >();>
3) in addPost method, <this.postsUpdated.next([...this.posts]);>, this is emitting the posts array, look at 2)
4) listening to the subject:
    
    getPostUpdateListener(){
        //returns an object that can be listened to but cannot emit
        return this.postsUpdated.asObservable();
    }
5) 



Overview: with only Angular
1) Server calls index.html, connects that to <app-root> found in <app.component.ts>

2) <app.component.ts> calls <app.component.html> which is comprised of <post-create.html> and <post-list.component>

2b) Interior Setup: 
    -<post.model.ts> is what a post object should look like, it is a class
    -<post.service.ts> is a service that is injected into <post-create.component.ts>  and <post-list.component.ts>, done thorugh the <constructor> 
        -contains the actual <posts[]> array
        -

3) <post-create.html>: When the submit button is clicked, 
    <form (submit)="onAddPost(postForm)" #postForm="ngForm">
    -this calls a function imported from <post-create.component.ts>, passing the form itself as a parameter, letting us access its values eg title and content

3b) <post.service.ts> injected into <post-create.component.ts>
    -<onAddPost(postForm)> uses the <post.service.ts>'s function <.addPost> which adds it onto the main posts list
    -it does this through rxjs, <Subject> which is an event emitter that uses next function to add it into the main array of posts

4) <post-list.component.html>: Used to display the posts through a for loop
    -uses posts array made in <post-list.component.ts> checking if its empty or not

4b) -<post.service.ts> injected into  <post-list.component.html>
    -<onInit> means when the component created <ngOninit> will be used
    - <getPostUpdateListener(){> is used to 

4c) <import{Subscription} from 'rxjs';>:
    -subscripton object allows .subscribe to be used
    -.subscribe is using the next function which is updating the main list of posts with the new value of new posts
    - subscription object allows the new data eg. w
       


MAIN IDEA: Emitting data and listening to data in other places/components through subscriptions       
Emitted data is connected to other places through subscriptions, not listeners...
1) <post.sevice.ts> creates a <subject>/observable
2) when addPost function is called, the <subject> <emits> data which is the main list of posts
3)  Immediately After in <post-list.component.ts>, the listener/observer obtains that data through 
        -<this.postsService.getPostUpdateListener().subscribe((posts: Post[])=>{this.posts=posts;});
        -a) .subscribe means that it is connecting itself to the subject/observable...
        -b) it connects through using the <next> function here... which is taking the emitted data <posts:Post[]>, and then.... setting the posts array in <post-list.component.ts> to be that... finally will be displayed throught ngFor loop in <post-list.component.html>

Theory: Observable/Subject: is the data that is able to be sent... 
            -Observable is used with event handlers containing next error complete
            -Subjects can use next error complete, which means automatically emits data
        
        The data emitted is connected through subscriptions

        Observer: creates the subscription with the observable and takes the data through the next error complete and does something with it. 






-------------------------------------------------------------------------
Server: Node and Express: how they're connected to angular
1) Node App serves Angular Singular page application
    -node express handles incoming requests
    -requests targeting '/' path return angular spa
2) Two separated servers
    -node express handles incoming requests
    -angular spa is served by another host... 
        -This means that all the html css ts is servered by this host


Creating server
Setup:
1) create server.js
2) terminal node server.js to run it
3) npm install --save express
What is needed:
1)<const http= require('http');
2)servers need a port
3)<server.listen(port)> allows your server to be listening for requests


app.js
Setup:
1)const express= require('express');
2)const app = express();
3)include any middleware through <app.use(req,res,next=>{my middleware...})
4)end it through sending a resposne eg. res.send("hey")
5)To export it, <module.exports=app;>


Server.js vs app.js
1) the server is initially run through server.js
2) when it is created, <const server= http.createServer(app)>pass the express <app> as a parameter, and it will create the server using the express app
3)in server.js <app.set("port", port);


Adding nodemon
1)npm install --save-dev nodemon
2)in <package.json>     "start:server":"nodemon server.js"
3) npm run start:server


Simple Routing
1)<app.use('/api/posts',(req,res,next)=>{res.status(200).json(posts:posts)>
    -'/api/posts' is the url
    -res is sending a response of the posts in json format


How to make Angular http Client
1) in <app.module.ts> import{HttpClientModule} from '@angular/common/http';
2) add it to imports

in this routing, <app.use('/api/posts',(req,res,next)> how do i fetch posts from angular?
1) in post.service.ts


How to display the posts from a database in the angular browser
1)<post-list.component.ts> when it is <ngonit> it calls <this.postsService.getPosts();> found in posts service
2)  getPosts method uses HttpClientModule
    - it does a get request to a route /api/posts
    - subscribe itself to the this.http.get because it returns a value of type <{message:string, posts:Post[]}>
    - returnedgetdata.subscribe(next function that is using the data for stuff)
3)//inject the httpclient after importing it
    constructor(private http:HttpClient){}
    //get method
    getPosts(){
        //get method gets the data from the url and EMITS that data...
        //{message:string, posts:Posts[]} is the type of that data... 
        //immediately subscribing to it allows listen/immediately get that emitted data
        //a next function to take that data and change up variables in this component...
        //final line: a subject emitting the new data to rest of the app to let the app know of the new changes.
        this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/api/posts').subscribe((postData)=>{
            //makes main posts be the posts data that was gotten from the http request
            this.posts=postData.posts;
            //a subject that is emitting out new changes for other observers in the app
            this.postsUpdated.next([...this.posts]);
        });
    }


Cross Origin Resource Sharing eg sharing data between two servers
1) Since Angular is on port 4200 while node is on 3000, need to send data through CORS
2) setting middleware/headers allows CORS in server side code app.js 
3) check app.js 


Posting data through servers
1) npm install --save body-parser
2)in app.js const bodyParser=require('body-parser');
3) app.use(bodyParser.json()); - this is applying the middleware to all urls of server
//app.use(bodyParser.urlencoded({extended:false}));
4) create a post route app.post('url',(req,res,next)=>{
    const mydata=req.body;
    response - do what every you want to do with mydata now
})
5) in angular, when you add a post... how to use that route...         
<this.http.post<{message:string}>('http://localhost:3000/api/posts',post).subscribe((responseData)=>{
    console.log(responsedata);

    it will post a post of type message:string, and will listen to the response of that route emitted, which is a success message...



Summary: 
1) Create a server...
2) in the app.js that is connected to the server... make
    a) middleware eg body parser
    b) routes: with specific '/url/here'
        -get route: emits all of the posts from the database
        -post route: contains information in a body parser and responses with a response
3) in the angular app...
    a) diff get route: since observable information is emitted by the get route at the url, can subscribe to that observable to get that information and display it to the rest of the observers in the angular app
        -        this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/api/posts').subscribe((postData)=>{

    b) diff post route: one of the parameters is the post that is collected in the angular post-create.component.ts form... app.js will recieve the post. since a request... can subscribe to use that response data eg a success or error code but not very important. 
        -        this.http.post<{message:string}>('http://localhost:3000/api/posts',post).subscribe((responseData)=>{



-------------------------------------------------------------------
Database MONGODB


Sql vs noSql
-MongoDb doesn't require a schema 
-when wanting to add records/document that are different eg when a store chooses to have a different model for a product such as images, can have new and old records in the table/collection
-no relationship/columns of name age sex...


Why don't connect angular to mongodb
-insecure because all of database can be accessed through browser
-use node because it would reside on a different server


Setting up a database mongoatlas
1) mongoatlas
    -maplestorytot@gmail.com
    -chamberoflife123!
2) create a cluster...
3) create a user which is able to access data base
    -: username ryan ... pass SEYF2IITUY18JTkC
4) create ip address eg whitelist... only ip address from there can access the database.
    -for finish project use ip address of the server


Using Mongoose to create a schemea - found in /backend/models/post.js
1) npm install --save mongoose
2) mongoose used to access your mongodb easier because it allows you to apply a schema easier to find data
3) mongoose.schema to create an schema of types and field of objects
4) create the model:  mongoose.model('Post',postSchema); //first is name of model, second is schema


Applying schema to app.js
1) in the post route can take information from the post request and create an object from the schema
2)const Post=require('./models/post'); requiring the post model
3)app.post('/api/posts',(req,res,next)=>{
    const post= new Post({
       title: req.body.title,
       content:req.body.content
        });
4) to save this after doing stuff below:
    -post.save()
    -will be saved in posts... eg the model name + s and lowercase


Connecting mongodb to node
1) in app.js add 
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://ryan:SEYF2IITUY18JTkC@cluster0-sqr57.mongodb.net/test?retryWrites=true", { useNewUrlParser: true } ).then(()=>{
    console.log("connected to database");
    })
    .catch(()=>{
        console.log('connection failed');
    });
 make sure to take out <>
 - the bottom part is just checking if theres an error or not
 - switch test to a new name

 - 


 Checking database through terminal
 1) in mongo atlas install mongo db shell, its in this folder
 2) follow instructions eg
 mongo "mongodb+srv://cluster0-sqr57.mongodb.net/test" --username ryan
 show collections
 db.posts.find() to check whats in it...


 Fetching data from mongodb
 1) in the get route use Post.find().then((documents)=>res.json(res.status(200).json({
        message:'Posts fetched Successfully',
        posts:documents
    });});))
    -the Post.find gives you the documents which is all of the data entries
    -they can be used to be sent back in the response eg sending it to the angular app to be displayed
    

Making id become _id- post.service.ts
1)   //change posts above to type any
        //pipe allows to use operators such as map
        //taking the postData's posts and use map
        //map changes the array elements into a new element and store back into the new array
        .pipe(map((postData.posts)=>{
            return postData.posts.map(post=>{
                //replacing every post with a new javascript obeject
                return{
                    title:post.title,
                    content:post.content,
                    id:post._id
                };
            });
        }))


How to Delete Posts
1) Creating the delete route in the app.js

    -app.delete("/api/posts/:id",(req,res,next)=>{
    //access to :id
    console.log(req.params.id);
    Post.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
res.status(200).json({
        message:"Post Deleted"});
    })
    
});

2) In the <post-list.component.html> make the  (click)="onDelete(postindex.id)" that sends
    a parameter based on the post id
3) in the <post-list.component.ts> make the onDelete function by making it call the post.service.ts function
    onDelete(postId:string){
        this.postsService.deletePost(postId);
    }
4) this http routes to the delete route made in the 1)... by subscribing when can update the front end

 deletePost(postId:string){
        this.http.delete("http://localhost:3000/api/posts/"+ postId)
        .subscribe(()=>{
            //updating front end when deleting
            //filter returns on a subset of the posts array based on the postId
            const updatedPosts=this.posts.filter(post=>post.id!==postId);
            //making this the new posts and then emittinging it out to be accessed once again
            this.posts=updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

5) step 4) connects to step 1) where it deletes it from the databse

Summary:
The on click method sends a method through the postlistcomponent to the postservicets. The service's method routes to the delete route, which on click will then go send that delete request, thereby activiating the delete request found in step 1). afterwards, by subscribing in 4), only then are we able to actually send the request. 


How to put the create _ID from the database into the id in the front end
1) in app.js when routing for the post route... 
    - post.save().then(createdPost=>{
            console.log(post);
res.status(201).json({
        message:"post added successfully",
        postId:createdPost._id
    })
    -this takes the createdPost, which is basically the result of doing the save and also passes the createdPost's id as a response
2) in post service.ts
    - this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts',post).subscribe((responseData)=>{
            const newId=responseData.postId;
            post.id=newId;
    -this is taking the postId as astring and then changing the post.id by switching with the responsedata.postId, which is the real id made from the database







FAQ:
1) 
        Why do we need html.get.subscribe()=>{
            stuff
        }
        for the next function when there isn't any actual data being sent?
        it is so that the get request is actually sent!



--------------------------------------------------
New Changes:


More Pages through Routing
1) Create app-routing.module.ts - logic for routing 
2) add it to app.module.ts -main logic by importing to imports
3) in it create routes which are basically which url present which app components
4) in <app.component.html>  put in   <router-outlet></router-outlet> which Tells where routes can be rendered
5) in <header.component.html> can create links <a routerLink="/create"> Instead of sending a http request href... routerLink just rerenders the page based on the url



Serving side vs client side routing
These routes are different from the ones on app.js...

server
app.js handling requests sending data through url routes

client
app-routing.module.ts is rerendering the page through url routes



Editting Posts

How to get the old post's data into the create/edit form
1)  in <app-routing.module.ts,{ path: "edit/:postId", component: PostCreateComponent }
  -we will use the post create component in a different route, taking in the postId as a parameter for query
2) in <post-create.component 
  <constructor(public postsService: PostService, public route: ActivatedRoute) {}
add in activated route which allows use of paramsmap
3) use ngoninit, so that when the post is created, stuff happens
4) parammaps can be subscribed to because can take the paramaeters in the url eg "edit/:postId"
5) if has a url paramaters/parammap has a postid then in edit mode
      <if (paramMap.has("postId"))
6) create
<private mode = "create";> to check which mode
  <private postId: string;> to get the post's id that you want to edit
  <edittedPost:Post;
7) create in <post.service.ts>  a get Post method to find through the array of current posts the post that we need to display and return back to <edittedPost>
Now we have the post that we are looking for...
8)Fill the form with <edittedPost data>
9) on the edit button, make a  [routerLink]="['/edit',postindex.id]"
    new type of router Link that has individual segnments that we want to look to 
          rerender the new page, here passing the post's id that we're looping through
10) Use two way binding to display the form data: 
  <post-create.component.html>
   [ngModel]="edittedPost.title"
  this works because...   #title="ngModel"
What it does it that edittedPost's title becomes what is on the text box
11)when submitting create update route in the post.service.ts which creates a route to app.js
                      //to edit a post
                        updatePost(id: string, title: string, content: string) {
                          //create a new post object, data gotton from post-create.component.html's form data
                          const post: Post = {
                            id: id,
                            title: title,
                            content: content
                          };

                          console.log(post);

                          //send this post through a put request which will update that post in the server's database
                          this.http
                            .put("http://localhost:3000/api/posts/" + id, post)
                            .subscribe(response => {
                              const updatedPosts = [...this.posts];
                              const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
                              updatedPosts[oldPostIndex] = post;
                              this.posts = updatedPosts;
                              this.postsUpdated.next([...this.posts]);
                            });
                        }
                      }


12) in app.js create a put request to update the existing database document/entry.
                        //editting put or patch -update existing resource with new data
                        app.put('/api/posts/:id',(req,res,next)=>{
                        
                          const updpost= new Post({
                            _id:req.body.id,
                            title:req.body.title,
                            content:req.body.content
                          })
                        //updating one using Post model
                          //taking the req query parameters and filtering it through tthat
                          //second parameter is the new object that you want to store
                            Post.updateOne({_id:req.params.id},updpost).then(result=>{
                            console.log(result);
                            res.status(200).json({
                              message:"Update Successful"
                            })
                          })
                        });

13) when the save button is clicked in <post-create.component.ts> check if the mode is in create then send the create method from post service... if in edit send the update method in post service. 
                      //check if the ngFor m is without errors, then add the post to the postServices using its addPost method
              onSavePost(form: NgForm) {
                
                if (form.invalid) {
                  return;
                }
                //checking whether the mode is in create or edit then send for the post service accordingly
                if (this.mode === "create") {
                  this.postsService.addPost(form.value.title, form.value.content);
                  form.resetForm();
                } else {
                  this.postsService.updatePost(
                    this.postId,
                    form.value.title,
                    form.value.content
                  );
                }
              }
            }


How to make sure that when page is refreshed that the info in the edit /create page is still there
1a)
//when the page is saved, it will immediately update the edit page and keep the posts being updated still in the page
 this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {
        // when refereshing will still have the data in the fields in edit zone
        // storing the updated post
        const updatedPosts = [...this.posts];
        // storing the updated post's index through .findIndex
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        // putting back the post before any editts where made
        updatedPosts[oldPostIndex] = post;
        // emitting new posts to entir program
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
1) when the page is refereshed, the <post-create.component.ts > ngOnint occurs
//ng onit calls for the edittedpost still we're still in edit mode and takes it from 3)
4)   this.postsService.getPost(this.postId).subscribe((postData)=>{
            this.edittedpost={id:postData._id,title:postData.title,content:postData.content}
        });
3)
  getPost(searchId: string) {
    //This sends gets the post from 2)... and when that occurs, 4) takes that data and updates the editted post
    return this.http.get<{_id:string, title:string, content:string}>("http://localhost:3000/api/posts/" + id);
  }
2) //get request for a single post
app.get('/api/posts/:id',(req,res,next)=>{
  //return all entries
  //can query more through mongoose docs by narrowing it done
  Post.findById(req.params.id).then(post=>{
      if(post){
  res.status(200).json(
      post);}
      else{
        res.status(404).json({
          message:"Post not found"
        })
      }

  });});



Elvis ???
            [ngModel]="edittedPost?.title"
checks if edittedPost actually exists , if not will not read for title 



New Routing...
1) find in /backend/routes/posts.js
2) to create an express router
const express= require('express');
//same app
const router=express.Router();
3) take app.js routes and switch to here
4) export it into app.js
5) app.js can import it through 
const postRoutes=require('./routes/posts');
app.use('/api/posts',postRoutes);
6) by putting /api/posts in first, routes in posts.js don't need it anymore...




Sending user through links
method1: is making them click html href links

method2:
1) in post serve.ts
  -  constructor(private http: HttpClient, private router:Router) {}
2)         this.router.navigate(['/']);
use navitage router to move to the main page



How to add spinning bar
1)
MatProgressSpinnerModule imort in app modoule.ts
2) make a bool for is loading and put it before and after the place u want to get data
this.isLoading=true; 
        this.postsService.getPost(this.postId).subscribe((postData)=>{  this.isLoading=false;
            this.edittedPost={id:postData._id,title:postData.title,content:postData.content}
3) display whichever based on the bool isloading
<mat-spinner *ngIf="isLoading"></mat-spinner>
<form *ngIf="!isLoading" (submit)="onSavePost(postForm)" #postForm="ngForm">



