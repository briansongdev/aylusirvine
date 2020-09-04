import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import UserContext from "../context/UserContext";
import axios from "axios";

class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      duration: 0,
      date: new Date(),
      masterKey: "",
    };
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  componentDidMount() {
    axios
      .get("/api/events/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async onSubmit(e) {
    e.preventDefault();
    const event = {
      title: this.state.title,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    let adminToken = "";
    if (this.context.userData.isAdmin) {
      adminToken = "ashdkajsdhaskdhaskdha";
    }
    const headers = {
      "x-auth-token": this.context.userData.token,
      "admin-Token": adminToken,
    };
    await axios
      .post("/api/events/update/" + this.props.match.params.id, event, {
        headers: headers,
      })
      .then(() => {
        alert("Event Updated!");
        window.location = "/";
      });
  }

  render() {
    let user = this.context.userData;
    return (
      <Container className="p-3">
        {user.isAdmin ? (
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formBasicText">
              <Form.Label>Title of Event</Form.Label>
              <Form.Control
                type="text"
                placeholder="New Event: Poster-making for Exercise Awareness"
                value={this.state.title}
                onChange={this.onChangeTitle}
              />
            </Form.Group>

            <Form.Control
              as="textarea"
              rows="4"
              placeholder="Lorem ipsum dolor sit amet, vis malorum repudiare argumentum an, qui ex lucilius argumentum. Mea ad ullum scripta consulatu, ei diam salutandi sea. Et falli accumsan signiferumque vel. Euismod feugiat usu ex. Vix purto populo persecuti cu, ea nec esse nominavi appareat. Submit by 10 o' clock tonight."
              value={this.state.description}
              onChange={this.onChangeDescription}
            />

            <Form.Group controlId="formBasicDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="2"
                value={this.state.duration}
                onChange={this.onChangeDuration}
              />
              <Form.Text className="text-muted">
                2 stands for 2 hours of community service.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Edit Event
            </Button>
          </Form>
        ) : (
          <>
            <Container className="p-3 text-center">
              Hi! You've reached this page in error. Click one of the above
              links to go back home!
            </Container>{" "}
          </>
        )}
      </Container>
    );
  }
}

EditEvent.contextType = UserContext;
export default EditEvent;
