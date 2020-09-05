import React, { useState, useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core";
import UserContext from "../context/UserContext";
import axios from "axios";
import "../landing/App.css";

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
      <br />
      {!userData.user ? (
        <Container
          style={{
            backgroundColor: "#e5fffd",
            width: "650px",
            borderRadius: "8px 8px 8px 8px",
          }}
          className="p-5 text-center"
        >
          <Row className="justify-content-center">
            <h5>Hi! Welcome to our platform!</h5>
          </Row>
          <Form className="p-3">
            <Form.Group controlId="formBasicnamee">
              <Form.Control
                as={TextField}
                style={{ width: "500px", height: "56px" }}
                variant="outlined"
                placeholder="John Doe"
                label="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">
                Enter your real name, separated by a space - "First Last" or
                hours for events may not be counted correctly.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                as={TextField}
                style={{ width: "500px", height: "56px" }}
                variant="outlined"
                label="Email"
                placeholder="aylusirvine@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Event emails will be sent to this address.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPass">
              <Form.Control
                as={TextField}
                style={{ width: "500px", height: "56px" }}
                variant="outlined"
                placeholder="*****"
                label="Password"
                onChange={(e) => setID(e.target.value)}
              />
              <Form.Text className="text-muted">
                Enter an ID, or a password, that you can remember.
              </Form.Text>
            </Form.Group>
            <Button
              style={{ backgroundColor: "white" }}
              size="large"
              variant="outlined"
              color="primary"
              href="#"
              onClick={submit}
            >
              Register
            </Button>
            <Form.Text className="p-2 text-muted">
              Please do not attempt to spam signup requests. Thanks!
            </Form.Text>
            <Form.Text className="p-2 text-muted">
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
