const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: false },
    userList: { type: Array, default: [] },
    emailList: { type: Array, default: [] },
    idList: { type: Array, default: [] },
    followupList: { type: Array, default: [] },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const event = mongoose.model("Events", eventSchema);

module.exports = event;
