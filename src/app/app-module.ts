import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Posts } from './posts/posts';
import { Navbar } from './navbar/navbar';
import { UserData } from './posts/user-data/user-data';
import {CreatePost} from './create-posts/create-posts';
import { Login } from './login/login';
import { Signup } from './signup/signup';

@NgModule({
  declarations: [
    App,
    Posts,
    Navbar,
    UserData,
    CreatePost,
    Login,
    Signup,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
