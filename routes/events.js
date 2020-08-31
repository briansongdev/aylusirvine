const router = require("express").Router();
let Event = require("../models/events.model");
let adminAuth = require("../middleware/adminAuth");
let userAuth = require("../middleware/userAuth");

router.route("/").get((req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newEvent = new Event({
    title,
    description,
    duration,
    date,
  });

  newEvent
    .save()
    .then(() => res.json("Event added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/joobidajoyce/:id", async (req, res) => {
  await Event.findById(req.params.id).then((event) => {
    res.json(event.userList);
  });
});

router.get("/emailjelly/:id", async (req, res) => {
  await Event.findById(req.params.id).then((event) => {
    res.json(event.emailList);
  });
});

router.get("/idenjelly/:id", async (req, res) => {
  await Event.findById(req.params.id).then((event) => {
    res.json(event.idList);
  });
});

router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  // may be subject to vulnerability attacks
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("Event deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.post("/addUser/:id", userAuth, async (req, res) => {
  Event.findById(req.params.id).then((event) => {
    let uniq = true;
    for (const i in event.userList) {
      if (req.body.userName == event.userList[i]) uniq = false;
    }
    for (const i in event.emailList) {
      if (req.body.email == event.emailList[i]) uniq = false;
    }
    for (const i in event.idList) {
      if (req.body.userId == event.idList[i]) uniq = false;
    }

    if (uniq) {
      event.userList.push(req.body.userName);
      event.emailList.push(req.body.email);
      event.idList.push(req.body.userId);
    }
    event.save().then(() => res.json("Added person to event!"));
  });
});
router.post("/update/:id", adminAuth, async (req, res) => {
  await Event.findById(req.params.id)
    .then((event) => {
      event.title = req.body.title;
      event.description = req.body.description;
      event.duration = Number(req.body.duration);
      event.date = Date.parse(req.body.date);

      event
        .save()
        .then(() => res.json("Event updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
