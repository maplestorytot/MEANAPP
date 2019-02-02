import { NgModule } from "../../node_modules/@angular/core";
import { CommonModule } from "../../node_modules/@angular/common";
import { RouterModule } from "../../node_modules/@angular/router";
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {PostListComponent} from './post-list/post-list.component';
import { ReactiveFormsModule } from "../../node_modules/@angular/forms";
import { AngularMaterialModule } from "./angular-material.module";


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent],

    imports:[
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      AngularMaterialModule
    ]

})
export class PostsModule{

}
