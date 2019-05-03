import { IHttpServer } from "./IhttpServer";
import * as restify from "restify";
import { Server, RequestHandler } from "restify";
import { ROUTERS } from "../routes/index";
import * as morgan from "morgan";
import * as mongoose from "mongoose";
import config from "../config";

export class ApiServer implements IHttpServer {
  private _restify: Server;

  public get(url: string, requestHandler: RequestHandler): void {
    this.addRoute("get", url, requestHandler);
  }
  public post(url: string, requestHandler: RequestHandler): void {
    this.addRoute("post", url, requestHandler);
  }
  public put(url: string, requestHandler: RequestHandler): void {
    this.addRoute("put", url, requestHandler);
  }
  public del(url: string, requestHandler: RequestHandler): void {
    this.addRoute("del", url, requestHandler);
  }

  private addRoute(
    method: "get" | "post" | "put" | "del",
    url: string,
    requestHandler: RequestHandler
  ) {
    this._restify[method](url, async (req, res, next) => {
      try {
        await requestHandler(req, res, next);
      } catch (e) {
        console.log(e);
        res.send(500, e);
      }
    });

    console.log(`Added route ${method.toUpperCase()}: ${url}`);
  }

  public start(port: number): void {
    this._restify = restify.createServer();
    this._restify.use(restify.plugins.bodyParser());
    this._restify.use(restify.plugins.queryParser());
    this._restify.use(morgan("dev"));

    this.addRoutes();

    this._restify.listen(port, () => {
      this.initDB();
    });

    const db = mongoose.connection;

    db.on("error", err => console.log(err));

    db.once("open", () => {
      console.log(`Server running on port ${port}`);
    });
  }

  private addRoutes(): void {
    ROUTERS.forEach(router => {
      router.initialize(this);
    });
  }

  private initDB(): void {
    mongoose.set("useFindAndModify", false);
    mongoose.connect(config.databaseURL, {
      useNewUrlParser: true
    });
  }
}
