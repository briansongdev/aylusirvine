import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Row, ListGroup } from "react-bootstrap";
import { Button } from "@material-ui/core";
import axios from "axios";
import dateFormat from "dateformat";
import UserContext from "../context/UserContext";
import "../landing/App.css";

const EventCard = (
  props // event, not events
) => (
  <Container className="p-3">
    <Card>
      <Card.Body>
        <Card.Title>{props.event.title}</Card.Title>
        <Card.Text>
          {props.event.description} {props.event.duration} hours given to
          volunteers.
        </Card.Text>
        {/* Check if user has already been registred here and conditionally render*/}
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          component={Link}
          to={"/processSignup/" + props.event._id}
        >
          Sign up here
        </Button>
        {props.isAdministrator ? (
          <>
            <ListGroup variant="flush">
              <ListGroup.Item as={Link} to={"/edit/" + props.event._id}>
                Edit
              </ListGroup.Item>
              <ListGroup.Item
                as={Link}
                onClick={() => {
                  props.deleteEvent(props.event._id);
                }}
              >
                Delete
              </ListGroup.Item>
              <ListGroup.Item as={Link} to={"/flup/" + props.event._id}>
                Send follow up email
              </ListGroup.Item>
              <ListGroup.Item as={Link} to={"/post/" + props.event._id}>
                Post
              </ListGroup.Item>
              <ListGroup.Item as={Link} to={"/investigate/" + props.event._id}>
                Investigate participants
              </ListGroup.Item>
            </ListGroup>
          </>
        ) : (
          <></>
        )}
      </Card.Body>
      <Card.Body>
        <Card.Text>
          Published on {dateFormat(props.event.date, "dddd, mmmm dS yyyy")}
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
);

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [], people: [], reversed: false };
  }
  async componentDidMount() {
    await axios
      .get("/api/events/")
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((error) => {
        // empty catch
      });
  }

  deleteEvent = (id) => {
    axios.delete("/api/events/" + id).then((res) => console.log(res.data));
    this.setState({
      events: this.state.events.filter((el) => el._id !== id),
    });
  };

  notSignedIn() {
    return (
      <Container className="p-3 text-center">
        <h3>Welcome!</h3>
        <img
          src={require("../images/aylus-logo.png")}
          class="rounded mx-auto d-block"
          alt="..."
        />
        <Row className="p-4 justify-content-center">
          <h6>Let's get you on board. Register or login: </h6>
        </Row>
        <Row className="p-3 justify-content-center">
          <Button
            variant="outlined"
            size="large"
            color="primary"
            href="/register"
          >
            Register: New/Migrating Volunteers
          </Button>
        </Row>
        <Row className="p-3 justify-content-center">
          <Button
            variant="outlined"
            size="large"
            color="primary"
            href="/signin"
          >
            Login: Existing Volunteers
          </Button>
        </Row>
      </Container>
    );
  }
  renderAdmin() {
    if (!this.state.reversed) {
      this.setState({ reversed: !this.state.reversed });
      return this.state.events.reverse().map((currentEvent) => {
        return (
          <EventCard
            event={currentEvent}
            deleteEvent={this.deleteEvent}
            key={currentEvent._id}
            isAdministrator={true}
          />
        );
      });
    } else {
      return this.state.events.map((currentEvent) => {
        return (
          <EventCard
            event={currentEvent}
            deleteEvent={this.deleteEvent}
            key={currentEvent._id}
            isAdministrator={true}
          />
        );
      });
    }
  }
  eventList() {
    let user1 = this.context.userData;
    if (!this.state.reversed) {
      this.setState({ reversed: !this.state.reversed });
      return this.state.events.reverse().map((currentEvent) => {
        return (
          <EventCard
            event={currentEvent}
            deleteEvent={this.deleteEvent}
            key={currentEvent._id}
            isAdministrator={false}
            userName={user1.user.name}
          />
        );
      });
    } else {
      return this.state.events.map((currentEvent) => {
        return (
          <EventCard
            event={currentEvent}
            deleteEvent={this.deleteEvent}
            key={currentEvent._id}
            isAdministrator={false}
          />
        );
      });
    }
  }

  render() {
    let user = this.context.userData;

    if (user.token === undefined) {
      return <Container>{this.notSignedIn()}</Container>;
    } else {
      if (user.isAdmin) {
        return (
          <Container>
            <Row className="p-3 justify-content-center">
              <h4>Hi Brian!</h4>
            </Row>
            {this.renderAdmin()}
            <Row className="p-3 justify-content-center">
              You've reached the end of our events!
            </Row>
          </Container>
        );
      } else {
        <Row className="p-3 justify-content-center">
          <h4>Hi {user.user.name}!</h4>
        </Row>;
        this.eventList();
        <Row className="p-3 justify-content-center">
          You've reached the end of our events!
        </Row>;
      }
    }
  }
}

EventList.contextType = UserContext;

export default EventList;
