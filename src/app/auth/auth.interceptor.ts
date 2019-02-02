import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}

/*import { HttpInterceptor, HttpRequest, HttpHandler } from "../../../node_modules/@angular/common/http";
import { Injectable } from "../../../node_modules/@angular/core";
import { AuthService } from "./auth.service";


// allows services to be injected into this other service
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService:AuthService){};
  // it is like a middleware that intercepts outgoing requests
  // next allows it to continue
  intercept(req:HttpRequest<any>, next:HttpHandler){
    const authToken=this.authService.getToken;

    // set just adds on to existing header Authorization is from check-auth.js
    // this is making a new object within the header of authorization which check-auth.js will use to verify
    const authRequest=req.clone({headers:req.headers.set('Authorization',"Bearer "+ authToken)});
    // lets request continue
    return next.handle(req);
  }
}
*/
