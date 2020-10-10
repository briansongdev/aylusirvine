import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Button, CircularProgress } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import FadeIn from "react-fade-in";
import axios from "axios";
import UserContext from "../context/UserContext";
import moment from "moment";

const func = (datee) => {
  let previousDate = moment(datee)._d;
  let currentDate = new Date();
  let diff = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
  if (diff >= 1) {
    return true;
  } else {
    return false;
  }
};

class RegisterForEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      isSignedUp: "",
      hasLoggedListen: false,
      message: "",
      date: new Date(),
      description: "",
      isReady: false,
    };
  }
  processSignup = async () => {
    const l = "/api/events/addUser/" + this.props.match.params.id;
    const request = {
      userName: this.context.userData.user.name,
      email: this.context.userData.user.email,
      userId: this.context.userData.user._id,
    };
    const headers = {
      "x-auth-token": this.context.userData.token,
    };
    await axios
      .post(l, request, {
        headers: headers,
      })
      .catch((e) => alert(e));
    const name = this.context.userData.user.name;
    let deviceType;
    if (isMobile) {
      deviceType = "Mobile";
    } else {
      deviceType = "Computer";
    }
    const actionType = "Signed up for event: " + this.state.eventName;

    const logRequest = {
      actionType: actionType,
      name: name,
      time: new Date().toString(),
      deviceType: deviceType,
    };
    if (!this.state.hasLoggedListen) {
      axios.post("/api/log/post", logRequest);
      this.setState({ hasLoggedListen: "true" });
    }
    this.setState({
      isSignedUp: "",
      message:
        "Success, thank you! You may now go back to the home page. More instructions thru a follow-up email.",
    });
  };

  componentDidMount() {
    axios.get("/api/events/" + this.props.match.params.id).then((response) => {
      setTimeout(() => this.setState({ isReady: true }), 350);
      this.setState({
        eventName: response.data.title,
        date: response.data.date,
        duration: response.data.duration,
      });
    });
  }

  executeSignup() {
    if (this.state.isSignedUp == "") {
      const eventIdForSignup = this.props.match.params.id;
      const idForSignup = this.props.match.params.userId;
      axios
        .get(
          "/api/events/isUserSignedUp/" + eventIdForSignup + "/" + idForSignup
        )
        .then((response) => {
          if (response.data == "User is registered.") {
            this.setState({
              isSignedUp: "You have already registered for this event.",
            });
          } else {
            this.setState({
              isSignedUp:
                "Not registered yet. Registering is irreversible and if you no-show you MUST email in advance. You agree to adhere to event-specific instructions and will epitomize AYLUS qualities in your work.",
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  }

  render() {
    let user = this.context.userData;
    if (this.state.isReady) {
      return (
        <>
          <br />
          {user.user ? (
            <FadeIn>
              <Container
                className="p-5 text-center"
                style={{
                  width: "500px",
                  backgroundColor: "white",
                  borderRadius: "8px 8px 8px 8px",
                }}
              >
                {!func(this.state.date) ? (
                  <h5>
                    Confirm signup for{" "}
                    <span style={{ fontWeight: "bold", color: "#406ddd" }}>
                      {this.state.eventName}
                    </span>
                    ?
                  </h5>
                ) : (
                  <h5>
                    Deadline for{" "}
                    <span style={{ fontWeight: "bold", color: "#406ddd" }}>
                      {this.state.eventName}
                    </span>{" "}
                    has passed.
                  </h5>
                )}
                <Row className="p-3 justify-content-center">
                  <p>{this.state.duration} PVSA-credited hours</p>
                </Row>
                <Row className="p-1 justify-content-center">
                  {!func(this.state.date) ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      href="#"
                      onClick={this.processSignup}
                    >
                      Yes, sign me up!
                    </Button>
                  ) : (
                    <></>
                  )}
                </Row>
                {this.executeSignup()}
                <Row className="p-1 justify-content-center">
                  <span style={{ color: "#00ccff" }}>
                    {this.state.isSignedUp}
                  </span>
                </Row>
                <Row className="p-2 justify-content-center">
                  <span className="text-success">{this.state.message}</span>
                </Row>
              </Container>
            </FadeIn>
          ) : (
            <Container className="p-3 text-center">
              Hi! You've reached this page in error. Click one of the above
              links to go back home!
            </Container>
          )}
        </>
      );
    } else {
      return (
        <Row className="p-4 justify-content-center">
          <CircularProgress />
        </Row>
      );
    }
  }
}

RegisterForEvent.contextType = UserContext;
export default RegisterForEvent;
