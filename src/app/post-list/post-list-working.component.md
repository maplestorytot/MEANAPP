
import{Component,OnInit} from '@angular/core';
import{Post}from '../posts/post.model';
import{PostService} from '../posts/post.service';
@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit  {
    //temp list of post
/*    posts=[
        {title:'First Post',content:'first post content'},
        {title:'Second Post',content:'second post content'},
        {title:'third Post',content:'third post content'}

    ];*/
    //makes posts be a list of Post
    /*@Input()*/
    posts:Post[]=[];
//Injecting Post Service
//postsService is the name, PostService is the type after importing it
    constructor(public postsService:PostService){
    }
    ngOnInit(){
        this.posts=this.postsService.getPosts();
        //listener to the subject...subscribes
        //arguments: next, error,complete
     
    }
    
}
// Oninit allows us to use the service's methods 
