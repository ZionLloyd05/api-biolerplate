import { IHttpServer } from "../server/IhttpServer";
import { IRoute } from "./IRoute";

export class PingRouter implements IRoute {
  public initialize(httpServer: IHttpServer): void {
    httpServer.get("/ping", (req, res) => res.send(200, "hello"));
  }
}
