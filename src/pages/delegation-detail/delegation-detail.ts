import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-delegation-detail',
  templateUrl: 'delegation-detail.html',
})
export class DelegationDetailPage {
  delegation: any;

  constructor(public dataProvider: ConferenceData,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.delegations) {
        for (const delegation of data.delegations) {
          if (delegation && delegation.id === this.navParams.data.delegationId) {
            this.delegation = delegation;
            break;
          }
        }
      }
    });

  }

  goToSessionDetail(session: any) {
    this.navCtrl.push('SessionDetailPage', { sessionId: session.id });
  }
}
