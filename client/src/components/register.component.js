import React, { useState, useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [identification, setID] = useState();

  const { userData, setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    if (!(!name || !identification || !email)) {
      const newUser = { name, identification, email };
      const passed = await axios.post("/api/users/add", newUser).catch((e) => {
        if (e == "Error: Request failed with status code 400") {
          alert(
            "Either an account with the same name or email already exists. Try again."
          );
        } else {
          alert(
            "Internal server error. Try again and if the error persists, contact me."
          );
        }
      });
      if (passed) {
        const loginResponse = await axios.post("/api/users/login", {
          email,
          identification,
        });
        setUserData({
          token: loginResponse.data.token,
          user: loginResponse.data.user,
        });
        localStorage.setItem("auth-token", loginResponse.data.token);
        window.location = "/";
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <>
      {!userData.user ? (
        <Container className="p-3 text-center">
          <Row className="justify-content-center">
            <h5>Hi! Welcome to our platform!</h5>
          </Row>
          <Form className="p-3">
            <Form.Group controlId="formBasicnamee">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">
                Enter your real name, separated by a space - "First Last" or
                hours for events may not be counted correctly.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="aylusirvine@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Event emails will be sent to this address.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPass">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setID(e.target.value)}
              />
              <Form.Text className="text-muted">
                Enter an ID, or a password, that you can remember.
              </Form.Text>
            </Form.Group>
            <Button
              variant="outlined"
              size="large"
              type="submit"
              href="#"
              onClick={submit}
            >
              Sign Up
            </Button>
            <Form.Text className="p-2 text-muted">
              Spamming accounts is 100% detectable. Don't do it.
            </Form.Text>
            <Form.Text className="text-muted">
              Make sure to verify your information. This is unchangeable.
            </Form.Text>
          </Form>
        </Container>
      ) : (
        <Container className="p-3">You are already signed in!</Container>
      )}
    </>
  );
}
