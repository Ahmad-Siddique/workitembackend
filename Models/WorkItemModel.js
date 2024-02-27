const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workitem = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    materials: [
      {
        material: {
          type: Schema.Types.ObjectId,
          ref: "material",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    labour: [
      {
        labour: {
          type: Schema.Types.ObjectId,
          ref: "labour",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    equipment: [
      {
        equipment: {
          type: Schema.Types.ObjectId,
          ref: "equipment",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    generalitems: [
      {
        generalitems: {
          type: Schema.Types.ObjectId,
          ref: "generalitems",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("workitem", workitem);

module.exports = Project;
