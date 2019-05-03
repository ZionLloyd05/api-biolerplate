import { IService } from "./IService";
import { ICustomerDTO } from "../interfaces/ICustomer";
import CustomerModel from "../models/Customer";
import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export class CustomerService implements IService<ICustomerDTO> {
  public async save(customer: ICustomerDTO): Promise<ICustomerDTO> {
    // console.log("in route");
    if (!customer.id) {
      return this.create(customer);
    } else {
      return this.update(customer.id, customer);
    }
  }

  private async create(customer: ICustomerDTO): Promise<ICustomerDTO> {
    const newCustomer = new CustomerModel({
      ...customer
    });
    return await newCustomer.save();
  }

  private async update(
    id: string,
    customer: ICustomerDTO
  ): Promise<ICustomerDTO> {
    const customerInDb = await CustomerModel.findOneAndUpdate(
      {
        _id: id
      },
      customer,
      { new: true }
    );
    if (!customer) {
      return null;
    }
    return customerInDb;
  }

  public async delete(id: string): Promise<boolean> {
    const customer = await CustomerModel.findOneAndRemove({ _id: id });
    if (!customer) {
      return false;
    }
    return true;
  }
  public async getOne(id: string): Promise<ICustomerDTO> {
    const customer = await CustomerModel.findOne({ _id: id });
    if (!customer) {
      return null;
    }
    return customer;
  }
  public async getAll(): Promise<ICustomerDTO[]> {
    const customers = await CustomerModel.find();
    return customers;
  }
}
