import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DelegationDetailPage } from './delegation-detail';

@NgModule({
  declarations: [
    DelegationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DelegationDetailPage),
  ],
})
export class DelegationDetailPageModule {}
