import "reflect-metadata";
import { ApiServer } from "./server/index";
import config from "./config";

const server = new ApiServer();
server.start(config.port);
