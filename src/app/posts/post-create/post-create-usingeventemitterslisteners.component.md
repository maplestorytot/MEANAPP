//This is for a previous version... to use remove 2 from name
//Allows component decorator to be used
//Components are created by creating new class
import { Component, EventEmitter,Output } from '@angular/core';
import{Post} from '../post.model';
import{NgForm} from'@angular/forms';
//import { enterView } from '../../../../node_modules/@angular/core/src/render3/instructions';

//this is a decorator which allows angular to understand that it is a class
@Component({
    //allows this component to be used
    selector: 'app-post-create',
    //uses html file 
    templateUrl: './post-create.component.html',

    styleUrls: ['./post-create.component.css']



    //could make it like so
    // template:'<h1>Hey</h1>'

})

//Methods for exporting to other places eg post-create.component.html button clicking for forms
export class PostCreateComponent { 
    enteredTitle = '';
    enteredContent = '';
    @Output() postCreated = new EventEmitter<Post>();
    //variable to store post which is outputed in html
    /*older v1
    an item empty for quick display
    newPost={}
        onAddPost(postInput:HTMLTextAreaElement) {
            console.log(postInput);
            this.newPost = 'This users post: ' +postInput.value;
        }
        */
    /*  onAddPost() {
       this.newPost = 'This users post: ' +this.enteredValue;} */
   
   /* old v2
       onAddPost() {
        const post:Post = { title: this.enteredTitle, content: this.enteredContent };
        this.postCreated.emit(post);
    */
   onAddPost(form:NgForm) {
       if(form.invalid){
           return;
       }
    const post:Post = { title: form.value.title, content:form.value.content};
    this.postCreated.emit(post);
    }
}