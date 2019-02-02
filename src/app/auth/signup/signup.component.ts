import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "../../../../node_modules/rxjs";
@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy{
  // injecting the authentification service
  constructor(public authSerivce: AuthService) {}
  private authStatusSub:Subscription;
  isLoading = false;
   ngOnInit(){
    this.authStatusSub=this.authSerivce.getAuthStatusListener().subscribe(authStatus=>{
      this.isLoading=false;
    })
  }

  // checking for validation
  onSignup(form: NgForm) {
    // if the username isn't unique then it will send an error and do nothing... unique: the error comes from the user.js route
    if (form.invalid) {
      return;
    } else {
      // create the user
      this.isLoading=true;
      this.authSerivce.createUser(form.value.email, form.value.password)
    }
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
