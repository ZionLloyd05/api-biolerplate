import { CustomerRouter } from "./customer.route";
import { PingRouter } from "./ping";

export const ROUTERS = [new PingRouter(), new CustomerRouter()];
