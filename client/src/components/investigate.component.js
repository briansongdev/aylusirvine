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
      eventIds: [],
    };
  }
  componentDidMount() {
    axios.get("/api/events/" + this.props.match.params.id).then((response) => {
      this.setState({
        eventName: response.data.title,
      });
    });
    axios
      .get("/api/events/joobidajoyce/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          eventNames: response.data.userList,
          eventIds: response.data.idList,
        });
      })
      .catch((err) => console.log(err));
  }
  deleteUser = (id) => {
    axios
      .post(
        "/api/events/removeUserFromEvent/" +
          this.props.match.params.id +
          "/" +
          id
      )
      .then((res) => {
        console.log(res.data);
        window.location = "/investigate/" + this.props.match.params.id;
      });
  };
  getUser = () => {
    let counter = -1;
    return this.state.eventNames.map((hi) => {
      counter += 1;
      return (
        <>
          <Row className="p-2 justify-content-center">{hi}</Row>
          <Row className="p-1 justify-content-center">
            {console.log(this.state.eventIds[counter])}
            <Button
              value={this.state.eventIds[counter]}
              onClick={(e) => this.deleteUser(e.target.value)}
            >
              Remove
            </Button>
          </Row>
        </>
      );
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
