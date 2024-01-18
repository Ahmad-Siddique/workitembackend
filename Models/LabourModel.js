const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const labour = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    specs: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const labourpr = mongoose.model("labour", labour);

module.exports = labourpr;
