// intercepts http request and catches errors from the http response
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "../../node_modules/rxjs/operators";
import { throwError } from "../../node_modules/rxjs";
import { Injectable } from "../../node_modules/@angular/core";
import { MatDialog } from "../../node_modules/@angular/material";
import { ErrorComponent } from "./error/error.component";


//injecting service into a service must do this
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog){}
  // it is like a middleware that intercepts outgoing requests
  // next allows it to continue
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(catchError((error:HttpErrorResponse)=>{
      let errorMessage="An unknown error has occurred!";

      if(error.error.message){
        errorMessage=error.error.message;
      }
      console.log(errorMessage);
      // data allows to pass object to use within error component
      this.dialog.open(ErrorComponent, {data:{message:errorMessage}});
      // returning the error because later on in the path will need the error object
      return throwError(error);
    }))
  }
}
