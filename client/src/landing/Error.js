import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class ErrorPage extends Component {
  render() {
    return (
      <Container className="p-3 text-center">
        Hi! You've reached this page in error. Click one of the above links to
        go back home!
      </Container>
    );
  }
}
