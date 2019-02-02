// defining app logic in a different file

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// add components that want to add to each route w/o ts
import { PostListComponent } from "./post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { AuthGuard } from "./auth/auth.guard";
// routes are objects of type routes that allow url to have components to be presented
const routes: Routes = [
  // empty path is main page
  { path: "", component: PostListComponent },
  //localhost:4200/create
  { path: "create", component: PostCreateComponent,canActivate:[AuthGuard] },
  { path: "edit/:postId", component: PostCreateComponent,canActivate:[AuthGuard]},
  // this is loading the children from auth routing module ts
  {path:'auth',loadChildren:"./auth/auth.module#AuthModule"}
];

// allows use of imports  and allows one to send out exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}


//  more on routes
/*
These routes are different from the ones on app.js...

app.js handling requests sending data through url routes

app-routing.module.ts is rerendering the page through url routes


*/
