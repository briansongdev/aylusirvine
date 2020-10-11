import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Card } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import UserContext from "../context/UserContext";
import { isMobile } from "react-device-detect";
import axios from "axios";
import FadeIn from "react-fade-in";

export default function ViewFollowups() {
  let { id, userId } = useParams();

  const { userData } = useContext(UserContext);
  const [isSignedUp, setSignedUp] = useState(false);
  const [hasLogged, setLoggedStatus] = useState(false);
  const [followupArray, setFlup] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  });

  const checkUserRegistered = () => {
    const eventIdForSignup = id;
    const idForSignup = userId;
    axios
      .get("/api/events/isUserSignedUp/" + eventIdForSignup + "/" + idForSignup)
      .then((response) => {
        if (response.data == "User is registered.") {
          setSignedUp(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const grabFollowups = () => {
    const eventIdForSignup = id;
    axios.get("/api/events/followup/" + eventIdForSignup).then((response) => {
      setFlup(response.data);
    });
  };
  const printFollowups = () => {
    let a = 0;
    return followupArray.map((flupmsg) => {
      a++;
      return (
        <FadeIn>
          <Row className="p-1 justify-content-center">
            <Card style={{ width: "500px" }}>
              <Card.Body>
                <Card.Title>Followup #{a}</Card.Title>
                <Card.Text>{flupmsg}</Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </FadeIn>
      );
    });
  };
  const logFollowup = () => {
    const name = userData.user.name;
    let deviceType;
    if (isMobile) {
      deviceType = "Mobile";
    } else {
      deviceType = "Computer";
    }
    const logRequest = {
      actionType: "Checked followups",
      name: name,
      time: new Date().toString(),
      deviceType: deviceType,
    };
    if (!hasLogged) {
      axios.post("/api/log/post", logRequest);
      setLoggedStatus(true);
    }
  };
  if (isLoading) {
    return (
      <Row className="p-3 justify-content-center">
        <CircularProgress />
      </Row>
    );
  } else {
    return (
      <>
        {userData.user ? (
          <>
            {logFollowup()}
            {checkUserRegistered()}
            {isSignedUp ? (
              <Container className="p-3 text-center">
                {grabFollowups()}
                {printFollowups()}
                <br />
                <FadeIn>
                  <h5>If you have a question or issue, email me.</h5>
                </FadeIn>
              </Container>
            ) : (
              <Container className="p-3 text-center">
                You are not signed up for this event.
              </Container>
            )}
          </>
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
