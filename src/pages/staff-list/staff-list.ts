import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { StaffDetailPage } from '../staff-detail/staff-detail';

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html'
})
export class StaffListPage {
  actionSheet: ActionSheet;
  staff: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.confData.getStaffs().subscribe((staff: any[]) => {
      this.staff = staff;
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }

  goToStaffDetail(staff: any) {
    this.navCtrl.push(StaffDetailPage, { staffId: staff.id });
  }

  goToStaffTwitter(staff: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${staff.twitter}`,
      '_blank'
    );
  }

  openStaffShare(staff: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + staff.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + staff.twitter);
            if ( (window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + staff.twitter
              );
            }
          }
        } as ActionSheetButton,
        {
          text: 'Share via ...'
        } as ActionSheetButton,
        {
          text: 'Cancel',
          role: 'cancel'
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  openContact(staff: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + staff.name,
      buttons: [
        {
          text: `Email ( ${staff.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + staff.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${staff.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + staff.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }
}
