const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventLoadingSchema = new Schema(
  {
    eventName: String,
    eventHours: String,
  },
  { _id: false, strict: false }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    identification: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hours: {
      type: Number,
      default: "0",
    },
    events: {
      type: [eventLoadingSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
