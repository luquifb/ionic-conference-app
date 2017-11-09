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
import { DelegationDetailPage } from '../delegation-detail/delegation-detail';

@Component({
  selector: 'page-delegations',
  templateUrl: 'delegations.html',
})
export class DelegationsPage {
  actionSheet: ActionSheet;
  delegations: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.confData.getDelegations().subscribe((delegations: any[]) => {
      this.delegations = delegations;
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }

  goToDelegationDetail(delegations: any) {
    this.navCtrl.push(DelegationDetailPage, { delegationId: delegations.id });
  }

}
