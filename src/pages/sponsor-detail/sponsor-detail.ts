import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-sponsor-detail',
  templateUrl: 'sponsor-detail.html',
})
export class SponsorDetailPage {
  sponsor: any;

  constructor(public dataProvider: ConferenceData,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.sponsors) {
        for (const sponsor of data.sponsors) {
          if (sponsor && sponsor.id === this.navParams.data.sponsorId) {
            this.sponsor = sponsor;
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
