const router = require("express").Router();
let Event = require("../models/events.model");
let adminAuth = require("../middleware/adminAuth");
let userAuth = require("../middleware/userAuth");

router.route("/").get((req, res) => {
  Event.find()
    .then((events) => {
      let eventArray = [];
      for (const i in events) {
        const eventData = {
          _id: events[i]._id,
          title: events[i].title,
          description: events[i].description,
          duration: events[i].duration,
          date: events[i].date,
          createdAt: events[i].createdAt,
          updatedAt: events[i].updatedAt,
        };
        eventArray.push(eventData);
      }
      res.json(eventArray);
    })
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
    const eventData = {
      userList: event.userList,
      idList: event.idList,
    };
    res.json(eventData);
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

// GET request to see if user is in the event

router.get("/isUserSignedUp/:eventId/:userId", async (req, res) => {
  await Event.findById(req.params.eventId).then((event) => {
    const signedUpList = event.idList;
    let check = false;
    for (const i in signedUpList) {
      if (signedUpList[i] == req.params.userId) {
        check = true;
      }
    }
    if (check) {
      res.json("User is registered.");
    } else {
      res.json("User is not registered.");
    }
  });
});

router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((events) => {
      const eventData = {
        title: events.title,
        description: events.description,
        duration: events.duration,
        date: new Date(events.date),
      };
      res.json(eventData);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("Event deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.post("/removeUserFromEvent/:id/:userId", async (req, res) => {
  await Event.findById(req.params.id).then((response) => {
    for (const i in response.idList) {
      if (response.idList[i] == req.params.userId) {
        response.idList.splice(i, 1);
        response.emailList.splice(i, 1);
        response.userList.splice(i, 1);
      }
    }
    response
      .save()
      .then(() => {
        res.json("User successfully deleted");
      })
      .catch((e) => console.log(e));
  });
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
    event
      .save()
      .then(() => res.json("Added person to event!"))
      .catch((e) => console.log(e));
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
