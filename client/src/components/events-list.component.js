import React, { Component, PureComponent } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Card, Row, ListGroup } from "react-bootstrap";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, Button, Paper, CircularProgress } from "@material-ui/core";
import axios from "axios";
import dateFormat from "dateformat";
import UserContext from "../context/UserContext";
import "../landing/App.css";

import { isMobile } from "react-device-detect";
import Linkify from "react-linkify";
import moment from "moment";
import FadeIn from "react-fade-in";
import LockIcon from "@material-ui/icons/Lock";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { AlertTitle } from "@material-ui/lab";

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
        {/* Check if user has already been registred here and conditionally render*/}
        {!func(props.event.date) ? (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            component={Link}
            to={"/processSignup/" + props.event._id + "/" + props.id}
          >
            Register
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            component={Link}
            to={"/followups/" + props.event._id + "/" + props.id}
          >
            Registration has ended for this event. Check followups here
          </Button>
        )}
        <Card.Text className="text-muted">
          <br />
          First time attending one of our events? You'll need to fill out our
          waiver <a href="https://forms.gle/XKfsXEpXpWPKTUUf9"> here.</a>
        </Card.Text>
        <Card.Text>
          <br />
          <Row
            className="justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            <AccessTimeIcon /> <pre> </pre>
            {props.event.duration} PVSA hrs.<pre> </pre> <LockIcon />
            <pre> </pre>
            Locks{" "}
            {dateFormat(
              moment(props.event.date).add(1, "day").format("LLL"),
              "h TT dddd, mmmm d"
            )}
            .
          </Row>
        </Card.Text>
        {props.isPartAdmin ? (
          <>
            <ListGroup variant="flush">
              <ListGroup.Item as={Link} to={"/flup/" + props.event._id}>
                Send followup
              </ListGroup.Item>
              <ListGroup.Item as={Link} to={"/investigate/" + props.event._id}>
                Participant List
              </ListGroup.Item>
            </ListGroup>
          </>
        ) : (
          <></>
        )}
        {props.isAdministrator ? (
          <>
            <ListGroup variant="flush">
              <ListGroup.Item as={Link} to={"/edit/" + props.event._id}>
                Edit
              </ListGroup.Item>
              <ListGroup.Item
                as={Link}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this event?"
                    )
                  )
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
      isReady: false,
      isOpen: true,
    };
  }
  async componentDidMount() {
    await axios
      .get("/api/events/")
      .then((response) => {
        setTimeout(() => this.setState({ isReady: true }), 250);
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
    let deviceType, city, state, actionModifiedType;
    if (isMobile) {
      deviceType = "Mobile";
    } else {
      deviceType = "Computer";
    }
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        city = data.city;
        state = data.region;
        actionModifiedType = "Viewed landing screen - " + city + " - " + state;
        const logRequest = {
          actionType: actionModifiedType,
          name: "anon",
          time: new Date().toString(),
          deviceType: deviceType,
        };
        axios.post("/api/log/post", logRequest);
      })
      .catch((error) => {
        console.log(error);
      });

    return (
      <Container className="p-3 text-center">
        <FadeIn>
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
            <br />
            <br />
            <span style={{ fontWeight: "bold" }}>
              Our platform lets you seamlessly check your current hours,
              register for upcoming events, and much more.
            </span>
          </Row>
          <Row className="p-3 justify-content-center">
            <h5>
              If you want to volunteer with us, all you have to do is{" "}
              <Link to="/register">register</Link>! You'll unlock access to all
              of our current and upcoming events, and you can sign up
              immediately.{" "}
              <span style={{ fontWeight: "bold" }}>
                We welcome all volunteers from everywhere. Join us through the
                above link or sidebar!
              </span>
            </h5>
          </Row>
          <Row className="p-1 justify-content-center">
            <h6>
              For more info, consult our <Link to="/faq">FAQ.</Link>
            </h6>
          </Row>
        </FadeIn>
      </Container>
    );
  }
  renderAdmin() {
    return this.state.events
      .slice()
      .reverse()
      .map((currentEvent) => {
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
  renderAdmin1() {
    return this.state.events
      .slice()
      .reverse()
      .map((currentEvent) => {
        return (
          <EventCard
            event={currentEvent}
            deleteEvent={this.deleteEvent}
            key={currentEvent._id}
            isPartAdmin={true}
          />
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
  render() {
    let user = this.context.userData;
    if (this.state.isReady) {
      if (user.token === undefined) {
        return <Redirect to="https://aylusirvine.herokuapp.com" />;
        // return <Container>{this.notSignedIn()}</Container>;
      } else {
        if (user.isAdmin) {
          return (
            <Container>
              <FadeIn>
                <br />
                <Row className="p-1 justify-content-center">
                  <h4 style={{ fontWeight: "bold" }}>Current Events</h4>
                </Row>
                {isMobile ? (
                  <>
                    <Row className="p-2 justify-content-center">
                      <h6 style={{ color: "red" }}>
                        Best viewed in horizontal.
                      </h6>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
                <Alert severity="info">
                  <AlertTitle>Welcome!</AlertTitle>
                  To stay updated on current events, install our new Windows
                  desktop app{" "}
                  <a
                    href="https://drive.google.com/file/d/1dVCsXV8UJFLGgNW4_0P0Rq_MFzqWLezC/view?usp=sharing"
                    target="_blank"
                  >
                    here
                  </a>
                  !
                </Alert>
                {this.renderAdmin()}
                <Row className="p-3 justify-content-center">
                  You've reached the end of our events! (Old events are
                  automatically deleted.)
                </Row>
              </FadeIn>
            </Container>
          );
        } else {
          return <Redirect to="https://aylusirvine.herokuapp.com" />;
          // return (
          //   <Container>
          //     <FadeIn>
          //       <br />
          //       <Row className="p-1 justify-content-center">
          //         <h4 style={{ fontWeight: "bold" }}>Current Events</h4>
          //       </Row>
          //       {isMobile ? (
          //         <>
          //           <Row className="p-2 justify-content-center">
          //             <h6 style={{ color: " red" }}>
          //               Best viewed in horizontal.
          //             </h6>
          //           </Row>
          //         </>
          //       ) : (
          //         <></>
          //       )}
          //       <Alert severity="info">
          //         <AlertTitle>Welcome!</AlertTitle>
          //         To stay updated on current events, install our new Windows
          //         desktop app{" "}
          //         <a
          //           href="https://drive.google.com/file/d/1dVCsXV8UJFLGgNW4_0P0Rq_MFzqWLezC/view?usp=sharing"
          //           target="_blank"
          //         >
          //           here
          //         </a>
          //         !
          //       </Alert>
          //       {this.eventList()}
          //       <Row className="p-3 justify-content-center">
          //         You've reached the end of our events! (Old events are
          //         automatically deleted.)
          //       </Row>
          //     </FadeIn>
          //   </Container>
          // );
        }
      }
    } else {
      if (localStorage.getItem("done") != "yes") {
        return <Redirect to="https://aylusirvine.herokuapp.com" />;
      } else {
        return (
          // <Row className="p-3 justify-content-center">
          //   <CircularProgress />
          <Container className="text-center">
            {/* <Paper elevation={0} style={{ marginTop: "2em", height: "500px" }}>
            <br />
            <br />
            <div className="loading">
              <div className="loading__letter">L</div>
              <div className="loading__letter">o</div>{" "}
              <div className="loading__letter">a</div>{" "}
              <div className="loading__letter">d</div>{" "}
              <div className="loading__letter">i</div>
              <div className="loading__letter">n</div>
              <div className="loading__letter">g</div>
              <div className="loading__letter">.</div>
              <div className="loading__letter">.</div>
              <div className="loading__letter">.</div>
            </div> */}
            <CircularProgress color="secondary" />
            {/* </Paper> */}
          </Container>
          // </Row>
        );
      }
    }
  }
}

EventList.contextType = UserContext;

export default EventList;
