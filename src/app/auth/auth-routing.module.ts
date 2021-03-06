import { NgModule } from "../../../node_modules/@angular/core";
import { Routes, RouterModule } from "../../../node_modules/@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes=[
  {path: 'login',component:LoginComponent},
  {path: 'signup',component:SignupComponent}

]
@NgModule({
imports:[
  //register child routes which will be merge with root route eventually
  RouterModule.forChild(routes)
],
exports:[
 RouterModule
]
})
export class AuthRoutingModule{

}
