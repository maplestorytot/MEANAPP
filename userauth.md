Creating login component html

1) look at them to make them
2) to make links to go to them, in header        <a mat-button routerLink="/login" routerLinkActive="mat-accent">
3) to make the router link, in <app-routing.module.ts>
  {path: 'login',component:LoginComponent}
4) on styling to make list item be side by side without dotes 
        ul{
          /*no dot*/
          list-style: none;
          padding:0;
          margin:0;
            /*make list items next to each other*/
          display:flex;

        }


How to use other form way
<form (submit) ='onLogin(loginForm)' #loginForm ='ngForm' *ngIf="!isLoading">

<input type="password" name="password" ngModel #passwordInput="ngModel" matInput placeholder="Password" required >

  How to use other form way

  to submit - (submit) ='onLogin(loginForm)'
    need in login.component.ts
     onLogin(form:NgForm){
    console.log('form.value');
  }
  to access form values
    console.log('form.value');

    
  to target each other-
  for inputs
  name="password" ngModel #passwordInput="ngModel"

  forforms
  #loginForm ='ngForm'

  validators
  required email
   *ngIf="passwordInput.invalid"



Saving New Users

1) first create a user model /backend/models/user.js
2) create routes in /backend/routes/user.js    user.save is how it works to go save to db

3) Create an auth service.ts
    -it contains the this.http.post route
    -it uses auth-datamodel.ts as a data model
4) inject auth service.ts to signup.component.ts
<constructor(public authSerivce: AuthService) {}
5) in sign up component ts
if (form.invalid) {
      return;
    } else {
      // create the user
      this.authSerivce.createUser(form.value.email, form.value.password);
    }
    
    -this is to see if it's valid or not


Login/User Authentification
1) in backend/routes/user.js 
 create the route for the login route...it is a post route because will be sending information
  -in it, it will check if the password is correct 
  -if it is correct, it will create a token that allows for authentification
2) send the token to the backend
    res.status(200).json({
        token:token
      })
3) create in postsservice the login method  login(email:string, password:string){
      it will reach for that token through a this.http.post route
      and it will get the token through the response... store the token as a variable

4) create in login.component.ts onLogin to send the data from the forms to the 3) login method.


5) connected to 3)... create auth.interceptor which basically intercepts the request and ads the token into the request as a header 
so that when in the route checks it with check-auth.js middleware it will be correct

6)     res.setHeader('Access-Control-Allow-Headers','Origin,X-Request-With,Content-Type,Accept,Authorization') ;
  - lets us use the interceptor
7)  in app module.ts 
// angular allows us to use this AuthIntecerptor for the regular http intercepter 
  // eg lets us use the interceptor
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],



How to check if the user has the token ie is logged on SERVERSIDE MIDDLEWARE TOKEN AUTH
1)create a middleware that checks if the request routes have the correct pass and user within the request header check-auth.js 
2) in posts.js, attach the middleware by importing it and attaching it like so... if it passes it will allow you to continue ie it does next and continues done the method, if not it errors out

router.delete("/:id",checkAuth,(req,res,next)=>{

3)do it only for the one's that you want to be protected. 



Summary on how login /user auth works...
Setup :
Users are stored in the database with a email and password and _id

Users can sign up by passing this data into the db

Users can login by submitting email and pass...
    1) click login... login.component.ts gets the form values
    2) passes it to the auth service which does a route to login check routes/user
    3) if the login is successful it returns a token to the front end

Users can posts/delete/edit with the token
    1) click submit post pass to post which when they send out a http request
    2) the intercept  auth.intercept takes that request and adds a header which contains the token
    3) in app.js routes when they intake a request, have a middle ware check-auth.js
    4) this checks if the tokens is correct and if it does, will post/edit/delete from the database working normally




How to tell the Angular when move throughing pages that you're logged in: since shouldn't have some functions if you're not logged in
FOR HEADER LOGIN SIGNUP
1) auth service create a subject that will emit true or false after getting the token
private authStatusListener= new Subject<boolean>();
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
2) at header component...
  in   ngOnInit(){
 subscribe to the subject and obtain that true or false

3) in their html at *ngIf true or false

FOR EDIT POST AND DELETE
1) auth service create a getisAuth that will be true if you get a token
2)      this.userIsAuthenticated= this.authService.getIsAuth();
3) use this one instead for html instead of subscribing



Logout
1) create onclick method for logout button
2) the method will call the service
3) the service's method is nullifying the token and then emmiting that user is not authenticated eg false

To redirect use router.navigate




Guards 
1) Create authGuard.ts
2) implement it in app-routing.module 
3) on the paths you want to use it on add it as an attribute


Timeout

1) take the expired time from the response when logining in and getting your token

login(email:string, password:string){
    // create data
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post<{token:string, expiresIn:number}>('http://localhost:3000/api/user/login',authData)
    .subscribe(response=>{
        this.token=response.token;
        console.log(this.token);
      if(this.token){
        //when get token, get the expire duration
        const expiresInDuration=response.expiresIn;
        //log out when timeout occurs milliseconds, save it to be in 
        this.tokenTimer=setTimeout(()=>{
          this.logout();
        },expiresInDuration*1000)
        this.isAuthenticated=true;
        //informs all that user is authethicated
        this.authStatusListener.next(true);
        // navigate back to homepage
        this.router.navigate(['/']);
      }

2) in logout when you do logout make  
 1)   clearTimeout(this.tokenTimer); this clears the timer so that when you get the token again its restarted






Storing token in local storage so refreshing works
1) use local storage to save expiration date and token and to clear it when log out


 //local storage, storing token in case of refreshing page
  private saveAuthData(token:string, expirationDate: Date){
    localStorage.setItem('token',expirationDate.toISOString());
  }

  // this is called on log out
  private clearAuthData()
{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationData');

}}

2)
// making a new date by adding the expires in time with the current time and then saving that data through method.
        const now=new Date();
        const expirationDate=new Date (now.getTime() +expiresInDuration * 1000);
        this.saveAuthData(this.token,expirationDate);
3) creaete a timer that logs out after a duration
private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }


     autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }


4) Import it when the app component/everything loads then it will check if already have token and if do then just display that you're logged in

export class AppComponent implements OnInit {
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.autoAutoUser();
  }
}
