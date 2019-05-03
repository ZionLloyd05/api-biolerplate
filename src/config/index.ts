import * as dotenv from "dotenv";

// Set the NODE_ENV to 'developement' by default
process.env.NODE_ENV = process.env.NODE_ENV || "developement";

const envFound = dotenv.config();
if (!envFound) {
  throw new Error(" Couldn't find .env file ");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   * @TODO Wait for it...
   */
  logs: {
    level: process.env.LOG_LEVEL
  }
};
