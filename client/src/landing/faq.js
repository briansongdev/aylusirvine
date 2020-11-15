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
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                  I'm an interested leader or have a question/suggestion! What
                  do I do?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  Glad you like our site!
                  <br /> If you are interested in acquiring a facsimile for your
                  branch, please contact aylusirvine@gmail.com! If you have a
                  question regarding this website or a suggestion for new
                  functions, or spot an issue, please do the same! Thank you -
                  we value your support!
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
