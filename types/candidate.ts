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
  address: Address;
  status: "contact" | "dialog" | "interview" | "offer" | "hired" | "ended";
}
