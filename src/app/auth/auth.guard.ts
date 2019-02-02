import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "../../../node_modules/rxjs";
import { Injectable } from "../../../node_modules/@angular/core";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
  // using the service to know if true or false if authenticated
  // router to renavigate if you aren't authenticated
  constructor(private authService:AuthService, private router:Router){}
  //
  canActivate(
    route: ActivatedRouteSnapshot,
    // snapshop or router state
    state: RouterStateSnapshot
    // returns boolean or observerable/promise which yields a boolean
  ): boolean | Observable<boolean> | Promise<boolean> {
    // if accessible to continue with route
    const isAuth=this.authService.getIsAuth();
    // router to renavigate if you aren't authenticated
    if (!isAuth){
      this.router.navigate(['/login']);
    }
    // true lets you continue with the route
    return true;
  }
}

// Guards
// -they are services
// -they add interface which adds certains methods that adds methods that routers
// executes and check whether to proceed or load something else
// authguard is checking if you're not logged in you can't go to post something
