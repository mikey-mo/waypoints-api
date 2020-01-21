# waypoints api

backend for the waypoints front end.  the api will act as a layer to communicate to various clients and services associated with the app

# api setup

- clone repo
- `npm i` to install node modules
- set up a local postgres database
- create env variables `LOCAL_DB_USERNAME`, `LOCAL_DB_PASSWORD`, and `DEFAULT_DB_NAME` (`.env` support is initially available outside of `PRODUCTION`)
- run `knex migrate:latest` to run database migrations
- run `knex seed:run` to execute seed files (if exist)
- run `npm run dev` to run service on default port `8080` in the `DEVELOPMENT` environment
- ping `localhost:8080` to check if service is running / receive a list of routes and their descriptions

# framework

the waypoints api is built off of `the-framework`; any clarification on its use can be found: https://www.npmjs.com/package/the-framework
