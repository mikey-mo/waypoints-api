const theFramework = require("the-framework");
const constants = require("../constants");

theFramework.get("/version", [], {
    description: "Gets the version of the API",
    authRequired: true
}, async (params, user) => {
    return {
        message: `v${constants.VERSION}`
    };
});