const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const eventsRouter = require("./routes/events");
const userRouter = require("./routes/users");

app.use("/api/events", eventsRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("src/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/build/index.html"));
  });
}
