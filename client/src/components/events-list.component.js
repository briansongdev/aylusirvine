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
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";
import FadeIn from "react-fade-in";

const func = (datee) => {
  let previousDate = moment(datee)._d;
  let currentDate = new Date();
  let diff = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
  if (diff >= 1) return true;
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
        {!func(props.event.date) ? (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            component={Link}
            to={"/processSignup/" + props.event._id + "/" + props.id}
          >
            Register or Check Status
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            component={Link}
            to={"/processSignup/" + props.event._id + "/" + props.id}
          >
            Check Status (past deadline)
          </Button>
        )}
        <Card.Text>
          <br />
          <SendIcon /> Posted{" "}
          {dateFormat(props.event.date, "h TT dddd, mmmm d, yyyy")}
          <span className="text-muted">
            {" "}
            (event will lock exactly 1 day after)
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
    if ("Notification" in window) {
      Notification.requestPermission();
    }
    if (Notification.permission !== "granted") Notification.requestPermission();
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
        {isMobile ? (
          <>
            <Row className="justify-content-center">
              <h6 style={{ color: " red" }}>
                Best viewed in horizontal or on a computer.
              </h6>
            </Row>
          </>
        ) : (
          <></>
        )}
        <h3>Welcome!</h3>
        <img
          src={require("../images/aylus-logo.png")}
          class="rounded mx-auto d-block"
          alt="..."
        />
        <Row className="p-4 justify-content-center">
          <p style={{ lineHeight: "200%" }}>
            <span style={{ fontWeight: "bold" }}>AYLUS Irvine</span> has an
            initiative of giving back to the community through service in
            multifaceted events for the betterment of society. We strive to
            cultivate a love for volunteering.
            <br />
            <br />
            <span style={{ fontWeight: "bold" }}>
              This is where you can access our current events (and sign up for
              them, check your hours, etc.).
            </span>
            <br />
            <br />
            The projects we do include{" "}
            <span style={{ color: "#ff0000" }}>h</span>
            <span style={{ color: "#fc0103" }}>e</span>
            <span style={{ color: "#fa0205" }}>l</span>
            <span style={{ color: "#f70308" }}>p</span>
            <span style={{ color: "#f5040a" }}>i</span>
            <span style={{ color: "#f2050d" }}>n</span>
            <span style={{ color: "#ef0610" }}>g</span>
            <span style={{ color: "#ed0712" }}> </span>
            <span style={{ color: "#ea0815" }}>o</span>
            <span style={{ color: "#e80917" }}>u</span>
            <span style={{ color: "#e5091a" }}>t</span>
            <span style={{ color: "#e20a1d" }}> </span>
            <span style={{ color: "#e00b1f" }}>a</span>
            <span style={{ color: "#dd0c22" }}>t</span>
            <span style={{ color: "#db0d24" }}> </span>
            <span style={{ color: "#d80e27" }}>s</span>
            <span style={{ color: "#d50f2a" }}>e</span>
            <span style={{ color: "#d3102c" }}>n</span>
            <span style={{ color: "#d0112f" }}>i</span>
            <span style={{ color: "#ce1231" }}>o</span>
            <span style={{ color: "#cb1334" }}>r</span>
            <span style={{ color: "#c81437" }}> </span>
            <span style={{ color: "#c61539" }}>c</span>
            <span style={{ color: "#c3163c" }}>e</span>
            <span style={{ color: "#c1173e" }}>n</span>
            <span style={{ color: "#be1841" }}>t</span>
            <span style={{ color: "#bb1944" }}>e</span>
            <span style={{ color: "#b91a46" }}>r</span>
            <span style={{ color: "#b61b49" }}>s</span>
            <span style={{ color: "#b41c4b" }}>,</span>
            <span style={{ color: "#b11c4e" }}> </span>
            <span style={{ color: "#ae1d51" }}>t</span>
            <span style={{ color: "#ac1e53" }}>e</span>
            <span style={{ color: "#a91f56" }}>a</span>
            <span style={{ color: "#a72058" }}>c</span>
            <span style={{ color: "#a4215b" }}>h</span>
            <span style={{ color: "#a1225e" }}>i</span>
            <span style={{ color: "#9f2360" }}>n</span>
            <span style={{ color: "#9c2463" }}>g</span>
            <span style={{ color: "#9a2565" }}> </span>
            <span style={{ color: "#972668" }}>y</span>
            <span style={{ color: "#94276b" }}>o</span>
            <span style={{ color: "#92286d" }}>u</span>
            <span style={{ color: "#8f2970" }}>n</span>
            <span style={{ color: "#8d2a72" }}>g</span>
            <span style={{ color: "#8a2b75" }}> </span>
            <span style={{ color: "#872c78" }}>s</span>
            <span style={{ color: "#852d7a" }}>t</span>
            <span style={{ color: "#822e7d" }}>u</span>
            <span style={{ color: "#7f2e80" }}>d</span>
            <span style={{ color: "#7d2f82" }}>e</span>
            <span style={{ color: "#7a3085" }}>n</span>
            <span style={{ color: "#783187" }}>t</span>
            <span style={{ color: "#75328a" }}>s</span>
            <span style={{ color: "#72338d" }}>,</span>
            <span style={{ color: "#70348f" }}> </span>
            <span style={{ color: "#6d3592" }}>s</span>
            <span style={{ color: "#6b3694" }}>e</span>
            <span style={{ color: "#683797" }}>r</span>
            <span style={{ color: "#65389a" }}>v</span>
            <span style={{ color: "#63399c" }}>i</span>
            <span style={{ color: "#603a9f" }}>n</span>
            <span style={{ color: "#5e3ba1" }}>g</span>
            <span style={{ color: "#5b3ca4" }}> </span>
            <span style={{ color: "#583da7" }}>a</span>
            <span style={{ color: "#563ea9" }}>t</span>
            <span style={{ color: "#533fac" }}> </span>
            <span style={{ color: "#5140ae" }}>l</span>
            <span style={{ color: "#4e41b1" }}>o</span>
            <span style={{ color: "#4b41b4" }}>c</span>
            <span style={{ color: "#4942b6" }}>a</span>
            <span style={{ color: "#4643b9" }}>l</span>
            <span style={{ color: "#4444bb" }}> </span>
            <span style={{ color: "#4145be" }}>f</span>
            <span style={{ color: "#3e46c1" }}>o</span>
            <span style={{ color: "#3c47c3" }}>o</span>
            <span style={{ color: "#3948c6" }}>d</span>
            <span style={{ color: "#3749c8" }}> </span>
            <span style={{ color: "#344acb" }}>b</span>
            <span style={{ color: "#314bce" }}>a</span>
            <span style={{ color: "#2f4cd0" }}>n</span>
            <span style={{ color: "#2c4dd3" }}>k</span>
            <span style={{ color: "#2a4ed5" }}>s</span>
            <span style={{ color: "#274fd8" }}>,</span>
            <span style={{ color: "#2450db" }}> </span>
            <span style={{ color: "#2251dd" }}>a</span>
            <span style={{ color: "#1f52e0" }}>n</span>
            <span style={{ color: "#1d53e2" }}>d</span>
            <span style={{ color: "#1a54e5" }}> </span>
            <span style={{ color: "#1754e8" }}>m</span>
            <span style={{ color: "#1555ea" }}>u</span>
            <span style={{ color: "#1256ed" }}>c</span>
            <span style={{ color: "#1057ef" }}>h</span>
            <span style={{ color: "#0d58f2" }}> </span>
            <span style={{ color: "#0a59f5" }}>m</span>
            <span style={{ color: "#085af7" }}>o</span>
            <span style={{ color: "#055bfa" }}>r</span>
            <span style={{ color: "#035cfc" }}>e</span>
            <span style={{ color: "#005dff" }}>.</span> Our events are mainly
            targeted at helping society while also allowing volunteers to gain
            more team and leadership experience. <br />
            <br /> We ARE active during COVID-19, and{" "}
            <span style={{ fontWeight: "bold" }}>everyone is welcome!</span>
          </p>
        </Row>
        <Row className="p-3 justify-content-center">
          <h5>
            To get started, <Link to="/register">register.</Link>
          </h5>
        </Row>
        <Row className="p-1 justify-content-center">
          <h6>
            For more info, consult our <Link to="/faq">FAQ.</Link>
          </h6>
        </Row>
      </Container>
    );
  }
  renderAdmin() {
    return this.state.events
      .slice()
      .reverse()
      .map((currentEvent) => {
        return (
          <FadeIn>
            <EventCard
              event={currentEvent}
              deleteEvent={this.deleteEvent}
              key={currentEvent._id}
              isAdministrator={true}
            />
          </FadeIn>
        );
      });
  }
  eventList() {
    const name = this.context.userData.user.name;
    let deviceType;
    if (isMobile) {
      deviceType = "Mobile";
    } else {
      deviceType = "Computer";
    }
    const logRequest = {
      actionType: "Viewed events page",
      name: name,
      time: new Date().toString(),
      deviceType: deviceType,
    };
    if (!this.state.hasLoggedListen) {
      axios.post("/api/log/post", logRequest);
      this.setState({ hasLoggedListen: "true" });
    }
    const userid = {
      _id: this.context.userData.user._id,
    };
    return this.state.events
      .slice()
      .reverse()
      .map((currentEvent) => {
        return (
          <FadeIn>
            <EventCard
              event={currentEvent}
              deleteEvent={this.deleteEvent}
              key={currentEvent._id}
              isAdministrator={false}
              id={userid._id}
            />
          </FadeIn>
        );
      });
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
            <Row className="p-3 justify-content-center">
              <h4 style={{ fontWeight: "bold" }}>Current Events</h4>
            </Row>

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
                  <h6 style={{ color: " red" }}>Best viewed in horizontal.</h6>
                </Row>
              </>
            ) : (
              <></>
            )}
            <Row className="p-3 justify-content-center">
              <h4 style={{ fontWeight: "bold" }}>Current Events</h4>
            </Row>

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
