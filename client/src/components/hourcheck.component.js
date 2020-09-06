import React, { useState, useContext } from "react";
import { Container, ProgressBar, Row } from "react-bootstrap";
import UserContext from "../context/UserContext";

export default function HourCheck() {
  const { userData } = useContext(UserContext);

  const userEventList = () => {
    return userData.user.events.map((currentEvent) => {
      return (
        <Container className="p-2">
          {currentEvent.eventName} for {currentEvent.hours} hours
        </Container>
      );
    });
  };

  const showMessage = () => {
    if (userData.user.hours <= 15) {
      return (
        <h6 style={{ color: "#406ddd" }}>
          You got this! You're at the beginning of an epic journey!
        </h6>
      );
    } else if (userData.user.hours <= 30) {
      return (
        <h6 style={{ color: "#406ddd" }}>
          Nice job so far! 15+ hours is awesome!
        </h6>
      );
    } else {
      return <h6 style={{ color: "#406ddd" }}>Breezing! Excellent job!</h6>;
    }
  };

  return (
    <>
      {userData.user ? (
        <Container className="p-3 text-center">
          <h3 className="p-1">Welcome {userData.user.name}!</h3>
          <h5 className="p-3">
            You currently have{" "}
            <span style={{ color: "#406ddd" }}>{userData.user.hours}</span>{" "}
            hours. Goal: 50+ hours!
          </h5>
          <Row className="p-3 justify-content-center"> {showMessage()}</Row>
          <Row className="justify-content-center">
            <ProgressBar
              style={{ width: "400px" }}
              animated
              now={userData.user.hours * 2}
            />
          </Row>
          <h5 className="p-3">
            Here are the events you have volunteered for so far:
          </h5>
          <Container>{userEventList()}</Container>
        </Container>
      ) : (
        <Container className="p-3 text-center">
          Hi! You've reached this page in error. Click one of the above links to
          go back home!
        </Container>
      )}
    </>
  );
}
