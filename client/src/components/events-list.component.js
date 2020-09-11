import React, { Component, PureComponent } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Row, ListGroup } from "react-bootstrap";
import { Button } from "@material-ui/core";
import axios from "axios";
import dateFormat from "dateformat";
import UserContext from "../context/UserContext";
import "../landing/App.css";
import { isMobile } from "react-device-detect";
import Linkify from "react-linkify";
import moment from "moment";

const func = (datee) => {
  let previousDate = moment(datee)._d;
  let currentDate = new Date();
  let diff = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
  if (diff >= 2) return true;
  return false;
};

const EventCard = (
  props // event, not events
) => (
  <Container className="p-3">
    <Card>
      <Card.Body>
        <Card.Title style={{ fontWeight: "bold" }}>
          {props.event.title}
        </Card.Title>
        <Card.Text>
          <Linkify>
            {props.event.description.split("\n").map(function (item) {
              return (
                <span>
                  {item}
                  <br />
                </span>
              );
            })}
          </Linkify>
        </Card.Text>
        <Card.Text style={{ fontWeight: "bold" }}>
          {props.event.duration} PVSA-certified hour(s) given to volunteers.
        </Card.Text>
        {/* Check if user has already been registred here and conditionally render*/}
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          disabled={func(props.event.date)}
          component={Link}
          to={"/processSignup/" + props.event._id + "/" + props.id}
        >
          Sign up! {/* Priority: add the isDisabled prop here later */}
        </Button>
        <Card.Text>
          <br />
          📬 {dateFormat(props.event.date, "h TT dddd, mmmm d, yyyy")}
          <span className="text-muted">
            {" "}
            (event will lock exactly 2 days after)
          </span>
        </Card.Text>
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
                Participant List
              </ListGroup.Item>
            </ListGroup>
          </>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  </Container>
);

class EventList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      hasLoggedListen: false,
    };
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
          <h6>We're so glad you're here! Make an account or login. </h6>
        </Row>
        {isMobile ? (
          <>
            <Row className="justify-content-center">
              <h6 style={{ color: "red" }}>Best viewed in horizontal.</h6>
            </Row>
          </>
        ) : (
          <></>
        )}
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
    const name = this.context.userData.user.name;
    const logRequest = {
      actionType: "Viewed events page",
      name: name,
      time: new Date().toString(),
    };
    if (!this.state.hasLoggedListen) {
      axios.post("/api/log/post", logRequest);
      this.setState({ hasLoggedListen: "true" });
    }
    const userid = {
      _id: this.context.userData.user._id,
    };
    if (!this.state.reversed) {
      this.setState({ reversed: !this.state.reversed });
      return this.state.events.reverse().map((currentEvent) => {
        return (
          <EventCard
            event={currentEvent}
            deleteEvent={this.deleteEvent}
            key={currentEvent._id}
            isAdministrator={false}
            id={userid._id}
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
            id={userid._id}
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
            {isMobile ? (
              <>
                <Row className="p-2 justify-content-center">
                  <h6 style={{ color: "red" }}>Best viewed in horizontal.</h6>
                </Row>
              </>
            ) : (
              <></>
            )}
            {this.renderAdmin()}
            <Row className="p-3 justify-content-center">
              You've reached the end of our events!
            </Row>
          </Container>
        );
      } else {
        return (
          <Container>
            {isMobile ? (
              <>
                <Row className="p-2 justify-content-center">
                  <h6 style={{ color: "red" }}>Best viewed in horizontal.</h6>
                </Row>
              </>
            ) : (
              <></>
            )}
            {this.eventList()}
            <Row className="p-3 justify-content-center">
              You've reached the end of our events!
            </Row>
          </Container>
        );
      }
    }
  }
}

EventList.contextType = UserContext;

export default EventList;
