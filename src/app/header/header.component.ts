import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "../../../node_modules/rxjs";

@Component({
  //allows this component to be used
  selector: "app-header",
  //uses html file
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy{
   userIsAuthenticated=false;
  private authListenerSubs:Subscription;
  constructor(private authService:AuthService){}

  ngOnInit(){

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{

      this.userIsAuthenticated=isAuthenticated;
    });
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }
}
