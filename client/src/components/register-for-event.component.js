import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import axios from "axios";
import UserContext from "../context/UserContext";

class RegisterForEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      isSignedUp: "",
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
    const actionType = "Signed up for event " + this.state.eventName;
    const logRequest = {
      actionType: actionType,
      name: name,
      time: new Date().toString(),
    };
    if (!this.state.hasLoggedListen) {
      axios.post("/api/log/post", logRequest);
      this.setState({ hasLoggedListen: "true" });
    }
    alert("Success! Thank you for registering!");
    window.location = "/";
  };

  componentDidMount() {
    axios.get("/api/events/" + this.props.match.params.id).then((response) => {
      this.setState({
        eventName: response.data.title,
      });
    });
  }

  executeSignup() {
    const eventIdForSignup = this.props.match.params.id;
    const idForSignup = this.props.match.params.userId;
    axios
      .get("/api/events/isUserSignedUp/" + eventIdForSignup + "/" + idForSignup)
      .then((response) => {
        if (response.data == "User is registered.") {
          this.setState({
            isSignedUp: "You have already registered for this event.",
          });
        } else {
          this.setState({
            isSignedUp: "You have not yet registered for this event.",
          });
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    let user = this.context.userData;
    return (
      <>
        <br />
        {user.user ? (
          <Container
            className="p-5 text-center"
            style={{
              width: "500px",
              backgroundColor: "white",
              borderRadius: "8px 8px 8px 8px",
            }}
          >
            <h5>
              Confirm registration for{" "}
              <span style={{ fontWeight: "bold", color: "#406ddd" }}>
                {this.state.eventName}
              </span>
              ?
            </h5>
            <Row className="p-3 justify-content-center">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="#"
                onClick={this.processSignup}
              >
                Yes, sign me up!
              </Button>
            </Row>
            {this.executeSignup()}
            <span>{this.state.isSignedUp}</span>
          </Container>
        ) : (
          <Container className="p-3 text-center">
            Hi! You've reached this page in error. Click one of the above links
            to go back home!
          </Container>
        )}
      </>
    );
  }
}

RegisterForEvent.contextType = UserContext;
export default RegisterForEvent;
