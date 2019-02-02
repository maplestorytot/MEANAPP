import { Post } from "./post.model";
import { Injectable } from "@angular/core";
//an event emitter
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {Router}from "@angular/router";
import{environment} from'../../environments/environment';
const BACKEEND_URL=environment.apiUrl+"/posts/";
//This allows the service to be injected into other Components...
//it goes into app.module.ts and adds it as a provider... at the root
//A provider is something that can create or deliver a service, here it starts up this service to provide it
//Here it only makes one version of the service
@Injectable({ providedIn: "root" })
export class PostService {
  //creating the subject as an object, pass list of posts
  private posts: Post[] = [];
  //tells all listening that there is an update and to rerun itself .subscribe and also post counts
  private postsUpdated = new Subject<{posts:Post[],postCount:number}>();

  //inject the httpclient after importing it
  constructor(private http: HttpClient, private router:Router) {}


  //get method
  getPosts(postsPerPage:number,currentPage:number) {

    //two backticks allows cool features
    //creating the url queries
    const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
    //take the post's count in max posts
      .get<{ message: string; posts: any, maxPosts:number }>(BACKEEND_URL+queryParams)

      .pipe(
        map(postData => {
          //Returning the posts and maxPosts
          //transformedPostData.posts;
          return {
          posts:postData.posts.map(post => {
            //replacing every post with a new javascript obeject
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath:post.imagePath,
              creator:post.creator
            };
          }),
          //returning the max number of posts also from the data passed to the subscribe
          maxPosts:postData.maxPosts};
        })
      )
      //transformed is the array put back through .map
      .subscribe(transformedPostData => {
        //makes main posts be the posts data that was gotten from the http request
        this.posts = transformedPostData.posts;
        //a subject that is emitting out new changes for other observers in the app
        this.postsUpdated.next({posts:[...this.posts],postCount:transformedPostData.maxPosts});
      });
  }

  getPostUpdateListener() {
    //returns an object that can be listened to but ca nnot emit
    return this.postsUpdated.asObservable();
  }
  //post method
  addPost(title: string, content: string, image:File) {
    // const post: Post = { id: null, title: title, content: content };
    // instead of posting a post now, we're gonna post a form, which allows text and files values
    const postData= new FormData;
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image", image, title);
    //post is adding the new post const made above as a parameter be sent
    this.http
      .post<{ message: string; post: Post }>(
        BACKEEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }


  deletePost(postId: string) {
   return this.http
      .delete(BACKEEND_URL + postId);

      /*
      .subscribe(() => {
        //updating front end when deleting
        //filter returns on a subset of the posts array based on the postId
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        //making this the new posts and then emittinging it out to be accessed once again
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      }); */
  }
  //for editting
  getPost(searchId: string) {
    //search through each post p in the arrayif the id is equal to the id searching for to edit
    //return { ...this.posts.find(p => p.id === searchId) };
    return this.http.get<{_id:string, title:string, content:string, imagePath:string,
      creator:string}>(BACKEEND_URL + searchId);
  }

  //to edit a post
  //since can put in a file or be getting a string from 1) can be either
  updatePost(id: string, title: string, content: string, image:File|string) {
    let postData:Post|FormData;
    //new post checking if uploading a file
    if(typeof(image) ==='object'){
      postData= new FormData();
      postData.append('id',id)
     postData.append("title",title);
     postData.append("content",content);
     postData.append("image", image, title)
    }else{
    //if not uploading a file eg just the editting image string path

//create a new post object,  data gotton from post-create.component.html's form data
      postData = {
      id: id,
      title: title,
      content: content,
      imagePath:image,
      creator:null
    };
   }
    // send this post through a put request which will update that post in the server's database
    this.http
      .put(BACKEEND_URL + id, postData)
      .subscribe(response => {
     /*  // when refereshing will still have the data in the fields in edit zone
        // storing the updated post
        const updatedPosts = [...this.posts];
        // storing the updated post's index through .findIndex
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post:Post={
          id: id,
      title: title,
      content: content,
      imagePath:''
        };
        // putting back the post before any editts where made
        updatedPosts[oldPostIndex] = post;
        // emitting new posts to entir program
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        //send the person back to homepage after updating or add
     */   this.router.navigate(["/"]);

      });

  }
}
