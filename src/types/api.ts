export interface Attributes {
  status: string;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface ConsignmentNoteProductClass {
  data: ConsignmentNoteProductClassData;
}

export interface ConsignmentNotePackagingData {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
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

export interface ParcelAttributes {
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
  created_at?: string;
  updated_at?: string;
  reference?: any;
  province_code: string;
  contents?: any;
}

export interface RateAttributes {
  created_at: string;
  updated_at: string;
  amount_local: string;
  currency_local: string;
  provider: string;
  service_level_name: string;
  service_level_code: string;
  service_level_terms?: any;
  days: number;
  duration_terms?: any;
  zone?: any;
  arrives_by?: any;
  out_of_area: boolean;
  out_of_area_pricing: string;
  total_pricing: string;
  is_ocurre: boolean;
}

export type IncludedAttributes = ParcelAttributes | RateAttributes;

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

export interface LabelAttributes {
  created_at: string;
  updated_at: string;
  status?: any;
  tracking_number: string;
  tracking_status?: any;
  label_url: string;
  tracking_url_provider: string;
  rate_id: number;
}

export interface LabelData {
  id: string;
  type: string;
  attributes: LabelAttributes;
}

export interface Label {
  data: LabelData;
}
