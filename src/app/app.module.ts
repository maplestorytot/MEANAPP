import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ErrorComponent } from "./error/error.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { AngularMaterialModule } from "./angular-material.module";
import { PostsModule } from "./posts.module";
import { ChatComponent } from "./chat/chat.component";
import { FormsModule } from "../../node_modules/@angular/forms";
// need to import nested components to add it in ng module declarations to be able to use them

// Angular thinks in modules/applcaitions, which define components of app

@NgModule({
  //declaring app component to register it with angular
  //App component is our root component, others are nested into it
  declarations: [AppComponent, HeaderComponent, ErrorComponent,ChatComponent],
  //imports more modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule

  ],
  // angular allows us to use this AuthIntecerptor for the regular http intercepter adding it
  // eg lets us use the interceptor
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  //Tell angular to search index html file, lets it find selectors

  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
