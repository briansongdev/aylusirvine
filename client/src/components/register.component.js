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
  const [isErr, setIsErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { userData, setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    setIsErr(false);
    if (!(!name || !identification || !email)) {
      const newUser = { name, identification, email };
      const passed = await axios.post("/api/users/add", newUser).catch((e) => {
        setIsErr(true);
        if (e == "Error: Request failed with status code 400") {
          setErrMessage(
            "Account with same name or email already exists. Try again."
          );
        } else {
          setErrMessage("Internal server error. Contact me.");
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
      setIsErr(true);
      setErrMessage("Please fill out all fields.");
    }
  };

  return (
    <>
      <br />
      {!userData.user ? (
        <Container
          style={{
            backgroundColor: "white",
            width: "550px",
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
                error={isErr}
                helperText={errMessage}
                style={{ width: "400px", height: "56px" }}
                variant="outlined"
                placeholder="John Doe"
                label="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">
                <br />
                Enter your real name, separated by a space - "First Last" or
                hours for events may not be counted correctly.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                as={TextField}
                style={{ width: "400px", height: "56px" }}
                variant="outlined"
                label="Email"
                error={isErr}
                helperText={errMessage}
                placeholder="aylusirvine@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                <br />
                Event emails will be sent to this address. Case sensitive.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPass">
              <Form.Control
                as={TextField}
                style={{ width: "400px", height: "56px" }}
                variant="outlined"
                error={isErr}
                helperText={errMessage}
                placeholder="**********"
                type="password"
                label="Password"
                onChange={(e) => setID(e.target.value)}
              />
              <Form.Text className="text-muted">
                <br />
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
            <Form.Text className="p-1 text-muted">
              Make sure to verify your information. This is unchangeable.
            </Form.Text>
          </Form>
        </Container>
      ) : (
        <Container className="p-3 text-center">
          You are already signed in!
        </Container>
      )}
    </>
  );
}
