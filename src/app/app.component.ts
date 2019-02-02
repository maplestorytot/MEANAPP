import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

//import{Post} from './posts/post.model';
//This connects to app.component.css/html
//selector is how index.html accesses these files a tag
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//this allows it to be imported into other classes
export class AppComponent implements OnInit {
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.autoAuthUser();
  }
}
