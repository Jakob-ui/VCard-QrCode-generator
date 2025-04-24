import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';
import { VCard } from '../../objects/VCard';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  testCard: VCard = {
    version: '4.0',
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    workPhone: '',
    homeAddress: {
      label: '',
      street: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      countryRegion: '',
    },
    socialUrls: {
      facebook: '',
      linkedIn: '',
    },
    workAddress: {
      label: '',
      street: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      countryRegion: '',
    },
  };

  qrCodeImageUrl: string = '';

  WohnadressePrivat: boolean = false;
  WohnadresseArbeit: boolean = false;
  SocialMedia: boolean = false;

  constructor() {
    // Überprüfen, ob sessionStorage verfügbar ist
    if (typeof window !== 'undefined' && sessionStorage) {
      this.WohnadressePrivat = JSON.parse(
        sessionStorage.getItem('WohnadressePrivat') || 'false'
      );
      this.WohnadresseArbeit = JSON.parse(
        sessionStorage.getItem('WohnadresseArbeit') || 'false'
      );
      this.SocialMedia = JSON.parse(
        sessionStorage.getItem('SocialMedia') || 'false'
      );
    }
  }

  generateVCard(): string {
    return `
BEGIN:VCARD
VERSION:4.0
FN:${this.testCard.firstName} ${this.testCard.lastName}
N:${this.testCard.lastName};${this.testCard.firstName};;${
      this.testCard.title ?? ''
    }
ORG:${this.testCard.organization}
EMAIL:${this.testCard.email}
TEL;TYPE=work,voice:${this.testCard.workPhone ?? ''}
TEL;TYPE=home,voice:${this.testCard.homePhone ?? ''}
ADR;TYPE=home:;;${this.testCard.homeAddress?.street ?? ''};${
      this.testCard.homeAddress?.city ?? ''
    };${this.testCard.homeAddress?.stateProvince ?? ''};${
      this.testCard.homeAddress?.postalCode ?? ''
    };${this.testCard.homeAddress?.countryRegion ?? ''}
END:VCARD
  `.trim();
  }

  generateQrCode(): void {
    const vCardData = this.generateVCard();
    QRCode.toDataURL(vCardData, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        console.error('Error generating QR Code', err);
        return;
      }
      this.qrCodeImageUrl = url;
    });
  }

  changebool(bool: boolean, saveinStorage: string): void {
    const newValue = !bool;

    // Überprüfen, ob sessionStorage verfügbar ist
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem(saveinStorage, JSON.stringify(newValue));
    }

    if (saveinStorage === 'WohnadressePrivat') {
      this.WohnadressePrivat = newValue;
    } else if (saveinStorage === 'WohnadresseArbeit') {
      this.WohnadresseArbeit = newValue;
    } else if (saveinStorage === 'SocialMedia') {
      this.SocialMedia = newValue;
    }

    console.log(`Updated ${saveinStorage} to ${newValue} in sessionStorage`);
  }
}
