export interface Customerdatainterface {
    // your existing properties
    id: number;
    name: string;
    state: string;
    // add the following property
    customerDetails?: Customerdatainterface[];
  }
  