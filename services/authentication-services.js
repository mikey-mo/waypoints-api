const userServices = require('./user-services');

module.exports = {
  async authenticateUser(req, token) {
    return { user: userServices.verifyJwt(token) };
  },
};
