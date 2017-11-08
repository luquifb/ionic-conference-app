import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffsPage } from './staffs';

@NgModule({
  declarations: [
    StaffsPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffsPage),
  ],
})
export class StaffsPageModule {}
