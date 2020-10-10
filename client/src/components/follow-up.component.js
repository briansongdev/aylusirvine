import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";
import axios from "axios";
import emailjs from "emailjs-com";

class FollowUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      emails: [],
    };
  }
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  componentDidMount() {
    axios
      .get("/api/events/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onSubmit = async (e) => {
    e.preventDefault();
    // function to get all emails
    await axios
      .get("/api/events/emailjelly/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ emails: response.data });
      })
      .catch((err) => console.log(err));
    // function to add flup text
    const flup = {
      flupmsg: this.state.description,
    };
    await axios
      .post("/api/events/createflup/" + this.props.match.params.id, flup)
      .then((res) => console.log(res.data));
    // emailJs function. Send ONLY to EMAILS SIGNED UP FOR THE EVENT
    const templateParams = {
      emailName: this.state.emails.join(),
      eventName: this.state.title,
      eventDescription: this.state.description,
    };
    // await emailjs
    //   .send(
    //     "gmail",
    //     "send_followup_email",
    //     templateParams,
    //     "user_7ramHducqnduQpv2RNhBj"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    window.location = "/";
  };
  render() {
    let user = this.context.userData;
    return (
      <>
        {user.isAdmin ? (
          <Container className="p-3">
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="followBasicText">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={this.state.title} readOnly />
              </Form.Group>
              <Form.Group controlId="followBasicDesc">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  placeholder="Lorem ipsum dolor sit amet, vis malorum repudiare argumentum an, qui ex lucilius argumentum. Mea ad ullum scripta consulatu, ei diam salutandi sea. Et falli accumsan signiferumque vel. Euismod feugiat usu ex. Vix purto populo persecuti cu, ea nec esse nominavi appareat. Submit by 10 o' clock tonight."
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
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

FollowUp.contextType = UserContext;
export default FollowUp;
