import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [],
  exports: [
    LogoutComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}