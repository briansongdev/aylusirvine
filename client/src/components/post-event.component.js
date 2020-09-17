import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";

// adds hours and "posts" event, deletes it from the server, and pushes an email to volunteers

class PostEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      eventName: "",
      newHour: "",
    };
  }
  componentDidMount() {
    axios
      .get("/api/events/idenjelly/" + this.props.match.params.id)
      .then((e) => {
        this.setState({
          ids: e.data,
        });
      })
      .catch((e) => {
        alert(e);
      });
    axios.get("/api/events/" + this.props.match.params.id).then((response) => {
      this.setState({
        eventName: response.data.title,
        newHour: response.data.duration,
      });
    });
  }

  postUser = async (e) => {
    e.preventDefault();
    for (const i in this.state.ids) {
      const us = {
        useriid: this.state.ids[i],
      };
      const postReq = {
        newHour: this.state.newHour,
        eventName: this.state.eventName,
      };
      await axios
        .post("/api/users/update/" + us.useriid, postReq)
        .catch((e) => console.log(e));
    }
    //delete event here
    await axios
      .delete("/api/events/" + this.props.match.params.id)
      .catch((e) => console.log(e));
    window.location = "/";
  };

  render() {
    let user = this.context.userData;
    return (
      <>
        {user.isAdmin ? (
          <Container className="p-3 text-center">
            <Button variant="success" onClick={this.postUser}>
              Post {this.state.eventName} event
            </Button>
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

PostEvent.contextType = UserContext;
export default PostEvent;
