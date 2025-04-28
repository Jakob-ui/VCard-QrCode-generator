import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';
import { VCard } from '../../objects/VCard';
import QRCodeStyling from 'qr-code-styling';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  VCardData: VCard = {
    version: '4.0',
    firstName: '',
    middleName: '',
    lastName: '',
    organization: '',
    email: '',
    workPhone: '',
    cellPhone: '',
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
      custom: '',
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

  Logo: string = '../../../assets/o-Logo.png';
  QRLogo: string = '../../../assets/QR-Logo.svg';

  qrCodeImageUrl: string = '';

  WohnadressePrivat: boolean = false;
  WohnadresseArbeit: boolean = false;
  SocialMedia: boolean = false;
  menuOpen: boolean = false;

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
    const encode = (value: string | undefined): string =>
      value ? unescape(encodeURIComponent(value)) : '';

    const socialUrls = this.VCardData.socialUrls
      ? Object.entries(this.VCardData.socialUrls)
          .filter(([key, value]) => value)
          .map(([key, value]) => `URL;TYPE=${key}:${encode(value)}`)
          .join('\n')
      : '';

    return `
BEGIN:VCARD
VERSION:4.0
FN:${encode(this.VCardData.firstName)} ${encode(
      this.VCardData.middleName
    )} ${encode(this.VCardData.lastName)}
N:${encode(this.VCardData.lastName)};${encode(
      this.VCardData.firstName
    )};;${encode(this.VCardData.title ?? '')}
ORG:${encode(this.VCardData.organization)}
EMAIL:${encode(this.VCardData.email)}
TEL;TYPE=work,voice:${encode(this.VCardData.workPhone ?? '')}
TEL;TYPE=home,voice:${encode(this.VCardData.homePhone ?? '')}
ADR;TYPE=home:;;${encode(this.VCardData.homeAddress?.street ?? '')};${encode(
      this.VCardData.homeAddress?.city ?? ''
    )};${encode(this.VCardData.homeAddress?.stateProvince ?? '')};${encode(
      this.VCardData.homeAddress?.postalCode ?? ''
    )};${encode(this.VCardData.homeAddress?.countryRegion ?? '')}
ADR;TYPE=work:;;${encode(this.VCardData.workAddress?.street ?? '')};${encode(
      this.VCardData.workAddress?.city ?? ''
    )};${encode(this.VCardData.workAddress?.stateProvince ?? '')};${encode(
      this.VCardData.workAddress?.postalCode ?? ''
    )};${encode(this.VCardData.workAddress?.countryRegion ?? '')}
${socialUrls}
END:VCARD
  `.trim();
  }

  generateQrCode(): void {
    if (
      !this.VCardData.firstName ||
      !this.VCardData.lastName ||
      !this.VCardData.workPhone
    ) {
      alert(
        'Füllen Sie die benötigten Felder aus: \n\n -Vorname* \n -Nachname* \n -Telefonnummer*'
      );
      return;
    }
    const vCardData = this.generateVCard();

    const qrCode = new QRCodeStyling({
      width: 500,
      height: 500,
      type: 'canvas',
      data: vCardData,
      image: this.QRLogo,
      dotsOptions: {
        color: '#000',
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#fff',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5,
      },
    });

    // QR-Code als Data-URL generieren und speichern
    qrCode.getRawData('png').then((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.qrCodeImageUrl = reader.result as string;
      };
      if (blob instanceof Blob) {
        reader.readAsDataURL(blob);
      } else {
        console.error('Expected a Blob but received a different type.');
      }
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

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  resetForm(): void {
    // Setze alle Felder des VCard-Objekts zurück
    this.VCardData = {
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

    // Setze den QR-Code zurück
    this.qrCodeImageUrl = '';

    console.log('Form and QR Code have been reset.');
  }
}
