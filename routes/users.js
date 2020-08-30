const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let auth = require("../middleware/auth.js");
let User = require("../models/users.model");

router.route("/add").post(async (req, res) => {
  try {
    const { name, identification, email, hours, events } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const existingName = await User.findOne({ name: name });
    if (existingName) {
      return res
        .status(400)
        .json({ msg: "An account with this name already exists." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(identification, salt);

    const newUser = new User({
      name,
      identification: passwordHash,
      email,
      hours,
      events,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, identification } = req.body;
    // we validate here
    if (!email || !identification) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "There is no one registered with this email." });
    }

    const isMatch = await bcrypt.compare(identification, user.identification);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json("error");
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user);
});

router.get("/extractEmails", async (req, res) => {
  const arr = await User.find();
  let finalEmailArray = [];
  for (i in arr) {
    finalEmailArray.push(arr[i].email);
  }
  res.json(finalEmailArray);
});

router.post("/update/:id", async (req, res) => {
  // req will contain newHours, eventName.
  const { newHour, eventName } = req.body;
  await User.findById(req.params.id)
    .then((user) => {
      user.hours = parseInt(user.hours) + parseInt(newHour);
      user.events.push({ eventName: eventName, hours: newHour });
      console.log(user.events);
      // make sure to use add function , not initialize function
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
