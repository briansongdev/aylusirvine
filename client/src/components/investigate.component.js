import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";

class Investigate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventNames: [],
    };
  }
  componentDidMount() {
    axios.get("/api/events/" + this.props.match.params.id).then((response) => {
      this.setState({
        eventName: response.data.title,
      });
    });
    axios
      .get("/api/events/joobidajelly/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          eventNames: response.data,
        });
      })
      .catch((err) => console.log(err));
  }
  getUser = () => {
    return this.state.eventNames.map((hi) => {
      return <Row className="p-3 justify-content-center">{hi}</Row>;
    });
  };
  render() {
    let user = this.context.userData;
    return (
      <>
        {user.isAdmin ? (
          <Container className="p-3 text-center">
            <h5>Event: {this.state.eventName}</h5>
            {this.getUser()}
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

Investigate.contextType = UserContext;
export default Investigate;
