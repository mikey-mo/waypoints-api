const userServices = require('./user-services');

module.exports = {
  async authenticateUser(req, token) {
    const splitToken = token.split(' ');
    if (splitToken[0] !== 'Bearer') return null;
    const user = userServices.verifyJwt(splitToken[1]);
    if (!user) return null;
    return { ...user };
  },
};
