export const Status = {
  contact: "contact",
  dialog: "dialog",
  interview: "interview",
  offer: "offer",
  hired: "hired",
  ended: "ended",
} as const;

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface Candidate {
  id: string;
  name: string;
  age: number;
  email: string;
  address?: Address;
  status: keyof typeof Status;
}
