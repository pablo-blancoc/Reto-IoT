import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordValid: boolean = true;

  constructor( private authSvc: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  async onLogin(email, password) {
    try { 
      const user = await this.authSvc.login(email.value, password.value);
      if( user ) {
        const isVerified = this.authSvc.isEmailVerified( user );
        this.redirectUser( isVerified );
      } else {
        this.passwordValid = false;
      }
    } catch( error ) {
      this.passwordValid = false;
    }
    
  }
  
  private redirectUser( isVerified: boolean ): void {
    if(isVerified == true) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
