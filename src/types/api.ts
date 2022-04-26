export interface Attributes {
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Datum {
  id: string;
  type: string;
}

export interface Parcels {
  data: Datum[];
}

export interface Rates {
  data: any[];
}

export interface AddressData {
  id: string;
  type: string;
}

export interface AddressTo {
  data: AddressData;
}

export interface AddressFrom {
  data: AddressData;
}

export interface Order {
  data?: any;
}

export interface Labels {
  data: any[];
}

export interface ConsignmentNoteProductClassData {
  id: number;
  name: string;
  code: string;
  subcategory_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ConsignmentNoteProductClass {
  data: ConsignmentNoteProductClassData;
}

export interface ConsignmentNotePackagingData {
  id: number;
  code: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface ConsignmentNotePackaging {
  data: ConsignmentNotePackagingData;
}

export interface Relationships {
  parcels: Parcels;
  rates: Rates;
  address_to: AddressTo;
  address_from: AddressFrom;
  order: Order;
  labels: Labels;
  consignment_note_product_class: ConsignmentNoteProductClass;
  consignment_note_packaging: ConsignmentNotePackaging;
}

export interface Data {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface IncludedAttributes {
  length: string;
  height: string;
  width: string;
  weight: string;
  mass_unit: string;
  distance_unit: string;
  name: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  reference?: any;
  province_code: string;
  contents?: any;
}

export interface Included {
  id: string;
  type: string;
  attributes: IncludedAttributes;
}

export interface Parcel {
  weight: number;
  distance_unit: string;
  mass_unit: string;
  height: number;
  width: number;
  length: number;
}

export interface CreateShipment {
  parcels: Parcel[];
  destinationPostalCode: string;
  originPostalCode: string;
}

export interface Shipment {
  data: Data;
  included: Included[];
}
