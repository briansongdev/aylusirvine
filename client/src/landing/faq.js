import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import axios from "axios";

export default class FAQ extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container className="p-3 text-center">
        <h2>FAQ for version 1</h2>
        <h5>You can locate answers to frequently asked questions here!</h5>
        <Accordion defaultActiveKey="0" className="p-3">
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
                event and add hours for the volunteers. However, automatically
                posting to WP is not supported.
                <br />
                <br /> Regardless, it's perfect for both parties!
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="6">
                What is this one-strike policy I've been hearing?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="6">
              <Card.Body>
                Maintaining server side is quite difficult if there are many
                people who sign up through our website and then not show up for
                the events. Our one-strike policy says that volunteers may have
                at most one no-show for an event they signed up for. We will be
                removing the one-strike policy once v1.5 or v2 releases, when
                the functionality to manage users better is implemented.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                How long did it take you to create this website?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>1 week.</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="4">
                What are our plans for the future?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                Our main goal for the future is to touch up on the user
                interface so it improves the user experience. Currently, this
                app is mainly oriented towards serving functions over looking
                pretty, but changing that is one of our goals.
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
                please contact my personal email (brians3476@gmail.com) or reach
                me by Discord (down below)! If you have a question regarding
                this website or a suggestion for new functions, please contact
                me through the aforementioned methods. If you spot an issue, do
                the same! Thank you!
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

// what are our plans in the future, etc. with stuff from register-for-event, what should they do if interested + if you have any questions
