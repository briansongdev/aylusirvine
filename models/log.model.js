const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema({
  actionType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
