//Allows component decorator to be used
//Components are created by creating new class
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";
import { Subscription } from "../../../../node_modules/rxjs";
import { AuthService } from "../../auth/auth.service";
//import { enterView } from '../../../../node_modules/@angular/core/src/render3/instructions';

//this is a decorator which allows angular to understand that it is a class
@Component({
  //allows this component to be used
  selector: "app-post-create",
  //uses html file
  templateUrl: "./post-create.component.html",

  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit , OnDestroy{
  private authStatusSub: Subscription;
  form: FormGroup;
  imagePreview: string;
  isLoading = false;
  enteredTitle = "";
  enteredContent = "";
  // default mode is create
  private mode = "create"; //to check which mode
  private postId: string; //to get the post's id that you want to edit
  edittedPost: Post; //to get the post's data
  // create the postsservice object

  constructor(public postsService: PostService, public route: ActivatedRoute,  private authService: AuthService
  ) {}

  ngOnInit() {
   this.authStatusSub= this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      // null is empty input at beginning
      // validators is array of validators
      // required means must be inputted before submit
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    // paramMap can take parameter from url
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // if has a url paramaters/parammap has a postid then in edit mode
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        // this.edittedPost = this.postsService.getPost(this.postId);
        // we get the post through a subscription that returns it
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.edittedPost = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          // override form control's values
          this.form.setValue({
            title: this.edittedPost.title,
            content: this.edittedPost.content,
            image: this.edittedPost.imagePath
          });
        });
      } else {
        // if not edit then make it create and continue with add post
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  // check if the ngFor m is without errors, then add the post to the postServices using its addPost method
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    // don't put false because will naviatiate away and when come back will still be false when created at the top;
    this.isLoading = true;
    // checking whether the mode is in create or edit then send for the post service accordingly
    if (this.mode === "create") {
      // this is where the form controls' are going to be placed here.
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
      this.form.reset();
    }
  }

  onImagePicked(event: Event) {
    //as tell event.target that it is a html input
    //get the first file
    const file = (event.target as HTMLInputElement).files[0];
    //patch value lets you set only a single control unlike setvalue which is all controls
    this.form.patchValue({ image: file });
    // inform angular that value is changed and should store it again and revalidate it
    this.form.get("image").updateValueAndValidity();

    //image previewing~~~~
    const reader = new FileReader();
    //when the reader is done loading it will perform this function
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    //first the reader will read the file uploaded as a url
    //next it will take that result set it to imagePreview
    reader.readAsDataURL(file);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
