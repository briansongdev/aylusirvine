import React, { Component } from "react";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import FadeIn from "react-fade-in";

export default class FAQ extends Component {
  render() {
    return (
      <Container className="p-3 text-center">
        <FadeIn>
          <h1>Frequently Asked Questions</h1>
          <Accordion className="p-3" defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  What is this website for?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  This is a website for AYLUS Irvine volunteers! The platform is
                  designed to be a place where volunteers can conveniently
                  access important information. It also serves as a great
                  content delivery network for leadership in AYLUS Irvine to
                  send out information about new events, etc. It's like a hub
                  where everybody can congregate instead of pointlessly emailing
                  to and fro.
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
                  progress bar), checking your events volunteered for, and
                  signing up for events directly through the website. You will
                  receive emails every time a new event is pushed and will
                  receive an email when a leader decides to follow up. <br />+
                  Functions for branch leaders: the option to create new events
                  on the platform, check who has signed up, edit, delete, send
                  followup emails, and "post" an event. Posting an event will
                  automatically delete the event and add hours for the
                  volunteers.
                  <br />
                  <br /> It's perfect for both parties!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                  I'm an interested leader or have a question/suggestion! What
                  do I do?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  If you are interested in acquiring a facsimile for your
                  branch, please contact my personal email
                  (brians3476@gmail.com)! If you have a question regarding this
                  website or a suggestion for new functions, or spot an issue,
                  please do the same! Thank you - we value your support!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="6">
                  I'm having layout issues!
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  If you are on mobile, put your device in a horizontal
                  orientation. Things get squished up fast due to the limited
                  screen width. If you are on a computer, please maximize the
                  window and if necessary, press F11 or fn + F11 on your
                  keyboard to fullscreen it.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </FadeIn>
      </Container>
    );
  }
}
