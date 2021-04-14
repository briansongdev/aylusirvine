import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Typography, Paper, Button } from "@material-ui/core";
import FadeIn from "react-fade-in";

export default class FAQ extends Component {
  render() {
    return (
      <Container className="p-3 text-center">
        <Paper
          elevation={0}
          style={{
            marginTop: "2em",
            height: "auto",
            padding: "20px 20px 20px 20px",
          }}
        >
          <FadeIn>
            <Typography variant="h3" style={{ marginBottom: "10px" }}>
              Privacy and Security, ToS
            </Typography>
            <Typography>
              This used to be the FAQ. If you have any generic questions please
              reach out at{" "}
              <span style={{ fontWeight: "bold" }}>aylusirvine@gmail.com</span>.
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              This site looks sketchy. What data do you collect from me as a
              volunteer?
            </Typography>
            <Typography style={{ textAlign: "left" }}>
              We built this site from the ground up, and we collect no more data
              than we need to. This includes your name, email address, and a
              hashed password. In the database, we store basic information like
              your hours through AYLUS Irvine and events you've completed in the
              past. This data is all for your benefit as a volunteer under AYLUS
              Irvine (so you can access your hours, etc.).
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              Is my data secure?
            </Typography>
            <Typography style={{ textAlign: "left" }}>
              Rest assured that your information is as secure as possible.
              Passwords and access to our database is end-to-end encrypted and
              will be unaccessible to anybody except the webmaster.{" "}
              <span style={{ fontWeight: "bold" }}>
                We have monitors implemented for the benefit of everybody and we
                will not tolerate malicious behavior on our website.
              </span>{" "}
              Everything that occurs on the site is recorded in an audit log.
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              As a volunteer, what are some do's/dont's on this website?
            </Typography>
            <Typography style={{ textAlign: "left" }}>
              Enjoy your stay on AYLUS Irvine volunteers! We'll do our best to
              make new, engaging events while keeping your info protected. All
              we ask from you is to{" "}
              <span style={{ fontWeight: "bold" }}>
                not conduct activities you'd be guilting yourself of through our
                nascent website.
              </span>{" "}
              Thank you and{" "}
              <span style={{ color: "#08b8cd" }}>welcome to AYLUS Irvine!</span>
            </Typography>
            <br />
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              component={Link}
              to={"/"}
            >
              Back to Home
            </Button>
          </FadeIn>
        </Paper>
      </Container>
    );
  }
}
