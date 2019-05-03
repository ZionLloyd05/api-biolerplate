import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

class Customer extends Typegoose {
  @prop({ required: true })
  firstname: string;

  @prop({ required: true })
  lastname: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;
}

const CustomerModel = new Customer().getModelForClass(Customer);

export default CustomerModel;
