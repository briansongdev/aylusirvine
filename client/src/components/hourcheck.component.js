import React, { useState, useContext } from "react";
import { Container, ProgressBar } from "react-bootstrap";
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

  return (
    <>
      {userData.user ? (
        <Container className="p-3 text-center">
          <h3 className="p-1">Welcome {userData.user.name}!</h3>
          <h5 className="p-3">
            You currently have {userData.user.hours} hours (from website
            activities). Your current goal is 100 hours!
          </h5>
          <ProgressBar animated now={userData.user.hours} />
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