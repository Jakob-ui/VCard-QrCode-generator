export interface VCard {
  version: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  namePrefix?: string;
  nameSuffix?: string;
  nickname?: string;
  gender?: string;
  organization: string;
  title?: string;
  role?: string;
  workPhone?: string;
  homePhone?: string;
  cellPhone?: string;
  pagerPhone?: string;
  workFax?: string;
  homeFax?: string;
  email: string;
  workEmail?: string;
  url?: string;
  workUrl?: string;
  birthday?: string;
  anniversary?: string;
  note?: string;
  homeAddress: Address;
  workAddress: Address;
  socialUrls: SocialUrls;
}

export interface Address {
  label: string;
  street?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  countryRegion: string;
}

export interface SocialUrls {
  facebook?: string;
  linkedIn?: string;
  twitter?: string;
  skype?: string;
  flickr?: string;
  custom?: string;
}
