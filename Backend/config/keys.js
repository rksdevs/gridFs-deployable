let keys = {};
if (process.env.ENV === "DEV") {
  keys.email = process.env.DEV_EMAIL;
  keys.password = process.env.DEV_PASSWORD;
  keys.jwtPrivate = process.env.DEV_JWT_PRIVATE;
  keys.host = process.env.HOST_DEV;
  keys.db = process.env.LOCAL_DB;
} else {
  keys.email = process.env.PROD_EMAIL;
  keys.password = process.env.PROD_PASSWORD;
  keys.jwtPrivate = process.env.PROD_JWT_PRIVATE;
  keys.host = process.env.HOST_PROD;
  keys.db = process.env.PRODUCTION_DB;
}

module.exports = keys;
