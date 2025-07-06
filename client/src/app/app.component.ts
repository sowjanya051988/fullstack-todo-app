import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://todoapi'
          }
        }).subscribe({
          next: (token) => {
            localStorage.setItem('access_token', token);
            console.log('✅ Access token stored:', token);
            this.router.navigate(['/todos']);
          },
          error: (err) => {
            console.error('❌ Error getting access token:', err);
          }
        });
      }
    });
  }

  //testing azure deployments

  login(): void {
    this.auth.loginWithRedirect(); // only redirect
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
