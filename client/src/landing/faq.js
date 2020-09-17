import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import axios from "axios";

export default class FAQ extends Component {
  render() {
    return (
      <Container className="p-3 text-center">
        <h1>v2.1</h1>
        <h5>If you spot an error or glitch, please email me right away!</h5>
        <Accordion className="p-3">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                What is this website for?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                This is a website for (currently) AYLUS Irvine volunteers! The
                platform is designed to be a place where volunteers can
                conveniently access important information. It also serves as a
                great content delivery network for leadership in AYLUS Irvine to
                send out information about new events, etc. It's like a hub
                where everybody can congregate instead of endlessly emailing to
                and fro. (A better name is being decided upon.)
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                How was this website conceived?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                The website came as a spontaneous mashup between allowing
                volunteers to check their hours and letting them sign up for new
                events in a single place. Previously, our branch always sent a
                new email thread for each new event we were planning to have,
                which was quite inefficient. We also didn't want to make a
                Google Form or anything complicated and just make the whole
                process a lot simpler and professional.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                What are some features of this website?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                Here are some detailed features of our website and why you
                should inquire for a copy for your branch:
                <br />
                <br />+ This whole website is homemade and 100% original,
                meaning your data is private and will never be advertised or
                spammed.
                <br />+ Functions for volunteers: checking your hours (with
                progress bar), checking your events volunteered for, and signing
                up for events directly through the website. You will receive
                emails every time a new event is pushed and will receive an
                email when a leader decides to follow up. <br />+ Functions for
                branch leaders: the option to create new events on the platform,
                check who has signed up, edit, delete, send followup emails, and
                "post" an event. Posting an event will automatically delete the
                event and add hours for the volunteers.
                <br />
                <br /> It's perfect for both parties!
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="5">
                I'm an interested leader or have a question/suggestion! What do
                I do?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="5">
              <Card.Body>
                If you are interested in acquiring a facsimile for your branch,
                please contact my personal email (brians3476@gmail.com)! If you
                have a question regarding this website or a suggestion for new
                functions, please contact me through the aforementioned method
                and same if you spot an issue! Thank you - we value your
                support!
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                Recent changes (v2.0)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                Previous 2.0: Update dropped 9/5/2020!
                <br /> 2.1: New changes. The system allows decimal values for
                hours, which is 👍, and is more informative.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

// what are our plans in the future, etc. with stuff from register-for-event, what should they do if interested + if you have any questions
