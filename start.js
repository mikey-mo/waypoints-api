const ENVIRONMENT = process.env.NODE_ENV || "development";

if (ENVIRONMENT !== "production") require("dotenv").config();

const theFramework = require("the-framework");
const authenticationServices = require("./services/authentication-services");
const PORT = process.env.PORT || 8080;

theFramework.startServer({
  authenticationMethod: async (req, token) => {
    return await authenticationServices.authenticateUser(req, token);
  },
  apiDirectory: "/api",
  userTokenHeader: "authorization",
  port: PORT
});
