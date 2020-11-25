import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import { LogoutComponent } from '../../components/logout/logout.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  codeReceived: boolean = false;

  constructor( private popoverCtrl: PopoverController, private authSvc: AuthService ) {}

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

}
