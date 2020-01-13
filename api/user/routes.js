const theFramework = require("the-framework");
const userServices = require("../../services/user-services");

theFramework.post(
  "/user/login",
  [
    {
      id: "password",
      type: theFramework.STRING,
      required: true,
      description: "User password"
    },
    {
      id: "email",
      type: theFramework.STRING,
      required: true,
      description: "User email"
    }
  ],
  {
    description: "Logs in a user",
    authRequired: false
  },
  async params => {
    console.log(params);
    return userServices.login(params.email, params.password);
  }
);

theFramework.post(
  "/user/register",
  [
    {
      id: "first_name",
      type: theFramework.STRING,
      required: true,
      description: "First name"
    },
    {
      id: "last_name",
      type: theFramework.STRING,
      required: true,
      description: "Last name"
    },
    {
      id: "email",
      type: theFramework.STRING,
      required: true,
      description: "Email"
    },
    {
      id: "password",
      type: theFramework.STRING,
      required: true,
      description: "Password"
    }
  ],
  {
    description: "Registers a user",
    authRequired: false
  },
  async params => {
    return userServices.register(
      params.first_name,
      params.last_name,
      params.email,
      params.password
    );
  }
);
