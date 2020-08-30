const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: false },
    userList: { type: [], default: [] },
    emailList: { type: [], default: [] },
    idList: { type: [], default: [] },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const event = mongoose.model("Events", eventSchema);

module.exports = event;
