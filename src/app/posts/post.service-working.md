import {Post}from './post.model';
import {Injectable} from '@angular/core';


//This allows the service to be injected into other Components...
//it goes into app.module.ts and adds it as a provider... at the root
//A provider is something that can create or deliver a service, here it starts up this service to provide it
//Here it only makes one version of the service
@Injectable({providedIn:'root'})

export class PostService{
    //creating the subject as an object, pass list of posts
    private posts:Post[]=[];
    //get method
    getPosts(){
        //...makes it be able to returned in an array format needed
     return this.posts;
    }

  
    //post method
    addPost(title:string, content:string){
        const post:Post={title:title,content:content};
        //pushes into private post
        this.posts.push(post);
    }
}


/*To export this/ inject this service into other components use
1) import this class to the component 
2) add... the public postsService is injecting it
constructor(public postsService:PostService){
    }
2b) add PostService as a provider in app.module.ts
3) ngOnInit requires 
    ngOnInit(){
        
    }
*/








