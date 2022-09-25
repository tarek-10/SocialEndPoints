const mongoose = require("mongoose");

const connection = async () => {
  return await mongoose
    .connect(process.env.CONNETCTION_URL)
    .then((result) => {
      console.log("Successfully To Connected DB ...!");
    })
    .catch((error) => {
      console.log("Fail To Connect DataBase");
    });
};

module.exports = connection;
