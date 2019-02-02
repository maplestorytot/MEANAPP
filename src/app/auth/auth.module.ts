import { NgModule } from "../../../node_modules/@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "../../../node_modules/@angular/common";
import { FormsModule } from "../../../node_modules/@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
declarations:[
  LoginComponent,
    SignupComponent
],
imports:[
  AuthRoutingModule,
  AngularMaterialModule,
  // for ngif
  CommonModule,
  FormsModule
]
})

export class AuthModule{

}
