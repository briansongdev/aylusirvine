import React, { Component } from "react";
import { Container, CardDeck, Card, Row } from "react-bootstrap";
import FadeIn from "react-fade-in";

export default class NewChanges extends Component {
  render() {
    return (
      <Container className="p-3 text-center">
        <FadeIn>
          <h1>Updates for v3</h1>
          <h5>
            If you experience an error or glitch, please{" "}
            <a
              href="mailto:brians3476@gmail.com?subject=Question About AYLUS Irvine Volunteers"
              target="_blank"
            >
              email
            </a>{" "}
            me right away!
          </h5>
          <CardDeck className="p-3">
            <Card style={{ width: "30%" }}>
              <Card.Body>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>Clarity</span>
                </Card.Title>
                <Card.Text>
                  Clarity is one of our key goals in the development of this
                  site. With v3, revolutionary changes have been made to the
                  infrastructure of the website, making things clearer and
                  simpler to end users.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "30%" }}>
              <Card.Body>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>
                    Followups and Emails
                  </span>
                </Card.Title>
                <Card.Text>
                  Followups can now be directly viewed in the events page! This
                  way you do not have to relocate emails, creating a more
                  streamlined and centralized experience. + Email improvements.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "30%" }}>
              <Card.Body>
                <Card.Title>
                  <span style={{ fontWeight: "bold" }}>UI Improvements</span>
                </Card.Title>
                <Card.Text>
                  You may have noticed a clearer font to our interface, but
                  there's much more under the hood. We're also adding new
                  animations and effects to various parts of the website. Find
                  them yourself!
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
          <Row className="p-2 justify-content-center">
            <h5>
              v3 is the last of our dev lifecycle unless new features are
              needed.
            </h5>
          </Row>
          <Row className="p-2 justify-content-center">
            <h6>
              If you have an{" "}
              <span style={{ fontWeight: "bold" }}>
                error to report/feature to suggest
              </span>
              , shoot an{" "}
              <a
                href="mailto:brians3476@gmail.com?subject=Question About AYLUS Irvine Volunteers"
                target="_blank"
              >
                email.
              </a>{" "}
              Thank you!
            </h6>
          </Row>
        </FadeIn>
      </Container>
    );
  }
}
