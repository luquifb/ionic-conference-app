import { Component } from '@angular/core';
import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { SponsorDetailPage } from '../sponsor-detail/sponsor-detail';

@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {
  actionSheet: ActionSheet;
  sponsors: any[] = [];

  constructor(public actionSheetCtrl: ActionSheetController,
      public navCtrl: NavController,
      public confData: ConferenceData,
      public config: Config,
      public inAppBrowser: InAppBrowser
    ) {}

    ionViewDidLoad() {
      this.confData.getSponsors().subscribe((sponsors: any[]) => {
        this.sponsors = sponsors;
      });
    }

    goToSessionDetail(session: any) {
      this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
    }

    goToSponsorDetail(sponsors: any) {
      this.navCtrl.push(SponsorDetailPage, { sponsorId: sponsors.id });
    }

  }
