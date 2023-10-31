import * as Hapi from "@hapi/hapi";
import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import * as Jwt2 from "hapi-auth-jwt2";
const db = require("./db").db;
import _ from "ramda";
import Path from "path";
const Inert = require("@hapi/inert");

// import all the routers
import AuthenticationRouter from "./authentication/router";
import UserRouter from "./user/router";
import BookRouter from "./books/router";

// import all handlers
import authenticationHandler from "./authentication/handler";
import { UserHandler } from "./user/handler";
import { BookHandler } from "./books/handler";

export const init = async (config) => {
  // Hapi JS server initialization
  const server = Hapi.server({
    port: config.PORT,
    host: "0.0.0.0",
    routes: {
      files: { relativeTo: Path.join(__dirname, "..", "user-media") },
      cors: { origin: ["*"] },
    },
  });

  // Swagger configuration
  const swaggerOptions = {
    info: {
      title: "Hapi API Documentation",
      version: "0.0.1",
    },
    schemes: ["http", "https"],
    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [{ jwt: [] }],
  };

  // Hapi js plugins
  let sharedPlugins = [Inert, Vision, { plugin: Jwt2 }, { plugin: HapiSwagger, options: swaggerOptions }];

  // register hapi plugins
  await server.register(sharedPlugins);
  const env = { config: config };

  // Handlers
  const authenticationHandlerObj = authenticationHandler(env);
  const userHandler = new UserHandler();
  const bookHandler = new BookHandler();

  // Authentications
  server.auth.strategy("jwt", "jwt", {
    key: config.JWT_SECRET,
    validate: authenticationHandlerObj.validateJWTToken,
  });

    
  server.auth.default("jwt");

  // Setup router
  AuthenticationRouter(server, authenticationHandlerObj);
  UserRouter(server, userHandler);
  BookRouter(server, bookHandler);

  await server.initialize();
  return {
    server,
    handlers: {
      authHandler: authenticationHandlerObj,
      userHandler,
      bookHandler,
    },
  };
};
