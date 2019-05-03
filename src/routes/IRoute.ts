import { IHttpServer } from "../server/IhttpServer";

export interface IRoute {
  initialize(router: IHttpServer): void;
}
