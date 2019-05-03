import { IHttpServer } from "../server/IhttpServer";
import { IRoute } from "./IRoute";
import { CustomerController } from "../controllers/customer.ctrl";
import "reflect-metadata";
import * as restify from "restify";
import DIContainer from "../container/DIContainer";

export class CustomerRouter implements IRoute {
  protected _cusController: CustomerController = DIContainer.resolve<
    CustomerController
  >(CustomerController);

  public initialize(router: IHttpServer): void {
    router.post("/customers", this.saveCustomer.bind(this));
    // router.get("customers/:id", );
    // router.post("customers", );
    // router.put("customers/:id", );
    // router.del("customers/:id", );
  }

  private async saveCustomer(
    req: restify.Request,
    res: restify.Response
  ): Promise<void> {
    const customer = await this._cusController.saveCustomer(req.body);
    res.send(200, customer);
  }
}
