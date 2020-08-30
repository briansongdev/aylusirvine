import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";

class RegisterForEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
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
    await axios.post(l, request, {
      headers: headers,
    });
    window.location = "/";
  };

  componentDidMount() {
    axios.get("/api/events/" + this.props.match.params.id).then((response) => {
      this.setState({
        eventName: response.data.title,
      });
    });
  }
  render() {
    let user = this.context.userData;
    return (
      <>
        {user.user ? (
          <Container className="p-3 text-center">
            <h5>
              Are you sure you would like to sign up for this event:{" "}
              {this.state.eventName}?
            </h5>
            <Row className="p-3 justify-content-center">
              <Button variant="success" onClick={this.processSignup}>
                Yes, sign me up!
              </Button>
            </Row>
            <span className="text-muted">
              Read our <Link to="/faq">one strike policy</Link> before
              registering. You will sent back to the home screen. If you have
              already signed up, this won't do anything.
            </span>
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
