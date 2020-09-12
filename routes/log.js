const router = require("express").Router();

let Log = require("../models/log.model");
let adminAuth = require("../middleware/adminAuth.js");

router.route("/post").post(async (req, res) => {
  const { actionType, name, time, deviceType } = req.body;
  try {
    const newLog = new Log({
      actionType,
      name,
      time,
      deviceType,
    });
    const successfulLog = await newLog.save();
    res.json(successfulLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/encryptedLogs", adminAuth, async (req, res) => {
  Log.find()
    .then((userAction) => {
      let userArray = [];
      for (const i in userAction) {
        const actionData = {
          actionType: userAction[i].actionType,
          name: userAction[i].name,
          time: userAction[i].time,
          deviceType: userAction[i].deviceType,
        };
        userArray.push(actionData);
      }
      res.json(userArray);
    })
    .catch((e) => res.json(e));
});

module.exports = router;
