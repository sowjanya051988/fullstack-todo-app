import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, TodoListComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev-otp6b0n1k3pcqelf.us.auth0.com',
      clientId: '7L2KCDF6kv2YTbeDa4VQZxtsh7YM9c5E',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://todoapi',
        scope: 'openid profile email'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})



export class AppModule { }
