const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MURI;

const connection = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connection;
