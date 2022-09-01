const mongoose = require("mongoose");
const { db } = require("./keys");

const dbConnect = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      console.log(
        `DB connected, Host : ${db.connections[0].host} , Port: ${db.connections[0].port}, Database: ${db.connections[0].name} `
      );
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = dbConnect;
