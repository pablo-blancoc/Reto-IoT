import { Component, OnInit } from '@angular/core';
import { ActionSheetController, PopoverController} from '@ionic/angular';
import { LogoutComponent } from '../../components/logout/logout.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/user.interface';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  codeReceived: boolean = false;

  constructor( private popoverCtrl: PopoverController, private authSvc: AuthService, private ActionSheetCtrl: ActionSheetController, private router: Router ) {}

  user$: Observable<User> = this.authSvc.afAuth.user;

  qrData: string = "";
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  ngOnInit() {
  }

  getQrCode( uid: string ) {
    this.qrData = uid;
    this.codeReceived = true;
  }

  async onPopover( event: any ) {
    const popover = await this.popoverCtrl.create({
      component: LogoutComponent,
      cssClass: 'pop-over-style',
      event: event,
    });
    return await popover.present();
  }

  async onActionSheet() {
    const actionSheet = await this.ActionSheetCtrl.create({
      header: '¿Serguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cerrar sesión',
          role: 'destructive',
          handler: () => {
            try {
              this.authSvc.logout();
              this.router.navigate(['login']);
            } catch( error ) {
              console.log("Error -> ", error)
            }
          }
        }, 
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  onLogs( uid: string ) {

    let navigationExtras: NavigationExtras = { state: { user: uid } };
    this.router.navigate(['logs'], navigationExtras);

  }

}
