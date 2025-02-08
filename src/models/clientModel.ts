import { Gender } from './enums';
import { Sale } from './saleModel';

export interface Client {
  // Identification
  id: number;
  name: string;
  cpf: string;
  rg?: string;

  // Contact Information
  phoneNumber1?: string;
  phoneNumber2?: string;
  phoneNumber3?: string;
  emailAddress?: string;

  // References
  referenceName1?: string;
  referencePhone1?: string;
  referenceName2?: string;
  referencePhone2?: string;
  referenceName3?: string;
  referencePhone3?: string;

  // Personal Information
  bornDate: string; // DateOnly em C# -> string ISO 8601 no TypeScript
  gender: Gender;
  fatherName?: string;
  motherName?: string;
  spouseName?: string;

  // Employment Information
  company?: string;
  ocupation?: string;

  // Address
  street?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  cep?: string;
  addressComplement?: string;

  // Status and Observations
  negativated: boolean;
  observation?: string;

  // Relations
  sales?: Sale[];
}

export interface ClientPayload {
  name: string;
  cpf: string;
  rg?: string;
  phoneNumber1: string;
  phoneNumber2?: string;
  phoneNumber3?: string;
  emailAddress?: string;
  referenceName1: string;
  referencePhone1: string;
  referenceName2?: string;
  referencePhone2?: string;
  referenceName3?: string;
  referencePhone3?: string;
  bornDate: string;
  gender: Gender;
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  company?: string;
  ocupation?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  cep?: string;
  addressComplement?: string;
  negativated: boolean;
  observation?: string;
}

export interface ClientList {
  data: Client[];
}