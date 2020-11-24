import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {

  user$: Observable<User> = this.authSvc.afAuth.user;

  constructor( private popover: PopoverController, private authSvc: AuthService, private router: Router ) { }

  async onLogout() {
    try {
      this.authSvc.logout();
      /* this.router.navigate(['login']); */

    } catch( error ) {
      console.log("Error -> ", error)
    }
  }

}
