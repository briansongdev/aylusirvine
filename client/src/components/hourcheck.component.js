import React, { useState, useContext } from "react";
import { Container, ProgressBar, Row } from "react-bootstrap";
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import UserContext from "../context/UserContext";
import { isMobile } from "react-device-detect";
import axios from "axios";
import moment from "moment";
import FadeIn from "react-fade-in";

export default function HourCheck() {
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [hasAlreadyChecked, setChecked] = useState(false);
  const [desc, setDesc] = useState("");
  const [hours, setHours] = useState(0);
  const [hasLogged, setLoggedStatus] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const calcHours = () => {
    if (userData.user.events.length != 0) {
      const link = "/api/users/obtainUpdatedAt/" + userData.user._id;
      axios
        .get(link)
        .then((res) => {
          let events = userData.user.events;
          let date1 = moment(res.data)._d;
          let date2 = new Date();
          let diff = (date2 - date1) / (1000 * 60 * 60 * 24);
          if (diff <= 2) {
            setOpen(true);
            setDesc(events[events.length - 1].eventName);
            setHours(events[events.length - 1].hours);
          } else {
            setOpen(false);
          }

          setChecked(true);
        })
        .catch((e) => alert(e));
    }
  };
  const emptyFunc = () => {};

  const userEventList = () => {
    const name = userData.user.name;
    let deviceType;
    if (isMobile) {
      deviceType = "Mobile";
    } else {
      deviceType = "Computer";
    }
    const logRequest = {
      actionType: "Checked hours",
      name: name,
      time: new Date().toString(),
      deviceType: deviceType,
    };
    if (!hasLogged) {
      axios.post("/api/log/post", logRequest);
      setLoggedStatus(true);
    }
    return userData.user.events.map((currentEvent) => {
      return (
        <Container className="p-2">
          {currentEvent.eventName} for {currentEvent.hours} hours
        </Container>
      );
    });
  };

  const showMessage = () => {
    if (userData.user.hours.$numberDecimal <= 15) {
      return (
        <h6 style={{ color: "#406ddd" }}>
          You got this! You're at the beginning of an epic journey!
        </h6>
      );
    } else if (userData.user.hours.$numberDecimal <= 30) {
      return (
        <h6 style={{ color: "#406ddd" }}>
          Nice job so far! 15+ hours is awesome!
        </h6>
      );
    } else {
      return <h6 style={{ color: "#406ddd" }}>Breezing! Excellent job!</h6>;
    }
  };

  return (
    <>
      {userData.user ? (
        <Container className="p-3 text-center">
          <FadeIn>
            <h3 className="p-1">Welcome {userData.user.name}!</h3>
            <h5 className="p-3">
              You currently have{" "}
              <span style={{ color: "#406ddd" }}>
                {console.log(userData.user.hours.$numberDecimal)}
                {userData.user.hours.$numberDecimal}
              </span>{" "}
              hours. Goal: 50+ hours!
            </h5>
            <Row className="p-3 justify-content-center"> {showMessage()}</Row>
            <Row className="justify-content-center">
              <ProgressBar
                style={{ width: "400px" }}
                animated
                now={userData.user.hours.$numberDecimal * 2}
              />
            </Row>
            <h5 className="p-3">
              Here are the events you have volunteered for so far:
            </h5>
            <Container>{userEventList()}</Container>
            {!hasAlreadyChecked ? calcHours() : emptyFunc()}
            <Dialog
              disableBackdropClick={true}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Great news!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  An event you have signed up for,{" "}
                  <span style={{ fontWeight: "bold" }}>{desc}</span>, has been
                  recently posted and you have earned{" "}
                  <span style={{ fontWeight: "bold" }}>{hours}</span> hour(s)!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Nice!
                </Button>
              </DialogActions>
            </Dialog>
          </FadeIn>
        </Container>
      ) : (
        <Container className="p-3 text-center">
          Hi! You've reached this page in error. Click one of the above links to
          go back home!
        </Container>
      )}
    </>
  );
}
