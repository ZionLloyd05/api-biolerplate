import { CustomerService } from "../services/customer.service";
import { ICustomerDTO } from "../interfaces/ICustomer";
import { inject, injectable } from "inversify";

@injectable()
export class CustomerController {
  protected _cusService: CustomerService;

  constructor(@inject(CustomerService) customerService: CustomerService) {
    this._cusService = customerService;
  }

  public async saveCustomer(
    customerInputDTO: ICustomerDTO
  ): Promise<ICustomerDTO> {
    console.log("in controller");
    const customer = await this._cusService.save(customerInputDTO);
    return customer;
  }
}
