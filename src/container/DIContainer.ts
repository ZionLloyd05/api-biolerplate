import { CustomerService } from "./../services/customer.service";
import { Container } from "inversify";

const DIContainer = new Container();
DIContainer.bind<CustomerService>(CustomerService).toSelf();

export default DIContainer;
