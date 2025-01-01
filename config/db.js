const mongoose = require("mongoose");

async function main() {
  //For production base code, we do not URL directly in the file instead of this we use .env file
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = main;