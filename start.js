const ENVIRONMENT = process.env.NODE_ENV || 'development';
const dotEnv = require('dotenv');

if (ENVIRONMENT !== 'production') dotEnv.config();
const theFramework = require('the-framework');
const authenticationServices = require('./services/authentication-services');

const PORT = process.env.PORT || 8080;

theFramework.startServer({
  authenticationMethod: async (req, token) => authenticationServices.authenticateUser(req, token),
  apiDirectory: '/api',
  userTokenHeader: 'authorization',
  port: PORT,
});
