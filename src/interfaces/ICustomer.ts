export interface ICustomer {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  salt: string;
}

export interface ICustomerDTO {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
