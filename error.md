Error Handling

Signing up with an account already made
1) When creating a user errors, will use a subject authstatus listener to send out false
  Using the observable (next, error, compelete) using error now

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
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(() => {
        this.router.navigate(["/"]);
      },<error=>{
        this.authStatusListener.next(false);
      });
  }

2) When the subscribtion recieves that false, it will make is loading false and allow for it to continue meaning it will continue in the sign up page...
  private authStatusSub: Subscription;

   ngOnInit() {
    this.authStatusSub = this.authSerivce
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

3) however, it is a valid sign up then it will as in 1) go navigate back to the homepage



Creating an error interceptor/Error dialog box
Method 1) could add at bottom of html and add this to be visible thorugh ngIf
  <div *ngIf="iserror"></div>

Method 2) 
1) http reqeust is sent out.... but there's an error

2) in each post.js route it will do a .catch(err=>return message: "this is your error") or other messages

3) the error interceptor is put in to get that error from the error message that is sent back
<error-interceptor.ts> like muller
 intercepts http request and catches errors from the http response

    3b) add as a provider 
     {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],

4) in <error-interceptor.ts> since three was an error open up the dialog box angular material like so an pass in the error message as a data paramaeter
     
      this.dialog.open(ErrorComponent, {data:{message:errorMessage}});
        data allows to pass object to use within error component

5) in error/error.compoment.ts
  the html displays through a special injector getting that message 

    constructor(@Inject(MAT_DIALOG_DATA)public data:{message:string}){


