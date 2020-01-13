const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const databaseServices = require('./database-services');
const { USERS_TABLE } = require('./database/types');

const CLEAN_FIELDS = ['id', 'first_name', 'last_name', 'email'];
const SALT_SIZE = 10;

module.exports = {
  async register(firstName, lastName, email, password) {
    const existingUser = await databaseServices.queryForOne(USERS_TABLE, {
      email,
    });

    if (existingUser) throw Error('Email already registered');

    const user = await databaseServices.insert(USERS_TABLE, {
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: this.hashPassword(password),
    });

    const cleanUser = this.cleanUser(user);

    return {
      user: cleanUser,
      token: this.createJwt(cleanUser),
    };
  },
  async login(email, password) {
    const user = await databaseServices.queryForOne(
      USERS_TABLE,
      {
        email: email.toLowerCase(),
      },
      'Invalid email address',
    );

    if (!this.checkPassword(password, user.password)) {
      throw new Error('Invalid password');
    }

    const cleanUser = this.cleanUser(user);

    return {
      user: cleanUser,
      token: this.createJwt(cleanUser),
    };
  },
  hashPassword(password) {
    return bcrypt.hashSync(password, SALT_SIZE);
  },
  checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
  cleanUser(user) {
    const cleanUser = {};

    CLEAN_FIELDS.forEach((cleanField) => {
      cleanUser[cleanField] = user[cleanField];
    });

    return cleanUser;
  },
  createJwt(user) {
    const newUser = { ...user, service_identifier: process.env.JWT_SERVICE_IDENTIFIER };
    return jwt.sign(newUser, process.env.JWT_SECRET);
  },
  verifyJwt(token) {
    console.log(token);
    try {
      const userToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(userToken);
      if (
        !userToken.service_identifier
        || userToken.service_identifier !== process.env.JWT_SERVICE_IDENTIFIER
      ) {
        return null;
      }

      return userToken;
    } catch (e) {
      return null;
    }
  },
};
