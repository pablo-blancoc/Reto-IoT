import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { LogoutComponent } from '../../components/logout/logout.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  entryComponents: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
