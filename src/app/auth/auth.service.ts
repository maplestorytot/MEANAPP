import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject } from "../../../node_modules/rxjs";
import { Router } from "../../../node_modules/@angular/router";
import{environment} from'../../environments/environment';
import * as io from 'socket.io-client';
const BACKEEND_URL=environment.apiUrl+"/user/";
// keep here because could make more than 1 service
@Injectable({
  providedIn: "root"
})
export class AuthService {


  // could create another user model passed back from data base that contain namme last name etc...
  private userId: string;
  getUserId() {
    return this.userId;
  }
  private tokenTimer: any;
  private isAuthenticated = false;
  getIsAuth() {
    return this.isAuthenticated;
  }
  private token: string;
  //when refresh to keep token in the
  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken() {
    return this.token;
  }
  // inject http to do routing, router to renavigate
  constructor(private http: HttpClient, private router: Router) {}
  // values taken from login.component.ts
  createUser(email: string, password: string) {
    // create data
    const authData: AuthData = {
      email: email,
      password: password
    };
    // send data as a parameter and log the respones
    // make it into a observable somewhere else
    this.http
      .post(BACKEEND_URL+"signup", authData)
      .subscribe(() => {
        this.router.navigate(["/"]);
      },error=>{
        this.authStatusListener.next(false);
      });
  }

  login(email: string, password: string) {
    // create data
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(BACKEEND_URL+"login",
        authData
      )
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          //when get token, get the expire duration
          const expiresInDuration = response.expiresIn;
          //log out when timeout occurs milliseconds, save it to be in
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          // making a new date by adding the expires in time with the current time and then saving that data through method.
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(this.token, expirationDate, this.userId);
          // informs all that user is authethicated
          this.authStatusListener.next(true);
          // navigate back to homepage
          this.router.navigate(["/"]);
        }
      },error=>{
        this.authStatusListener.next(false);
      });
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    // make sure not autheticated any more and clear out everything
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.clearAuthData();
    // navigate back to hme back
    this.router.navigate(["/"]);
  }

  // local storage, storing token in case of refreshing page
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  // this is called on log out
  private clearAuthData() {
    //removing data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }
  //this is a private method to return the data if need to relog the user

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // log in the user and update front end
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.userId = authInformation.userId;
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    } /* autoAutoUser() {
    // get the information
    const authInformation = this.getAuthData();
    // if it doesn't exist then do nothing
    if (!authInformation) {
      return;
    }
    // check its a valid token not expired yet
    const now = new Date();
    // .getTime is in seconds since start of javascript
    const willExpire =
      authInformation.expirationDate.getTime() - now.getTime();
    // if it's in the future...
    if (willExpire > 0) {
      // setting the values again
      this.token = authInformation.token;
      this.isAuthenticated = true;
      // sending this to reset the toker timer
      this.setAuthTimer(willExpire / 1000);
      this.authStatusListener.next(true);
    }
  }*/
  }
  //
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    // if token and exp date exist create an object to return them autoAuthUser
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
  private socket = io('http://localhost:3000');

  socketSend(data:string){
    console.log(data);
    this.socket.emit('eee', data);
    this.socket.on('hey',function(){
      console.log('hi');
    })
  }
}
