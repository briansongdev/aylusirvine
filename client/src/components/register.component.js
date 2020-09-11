import React, { useState, useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import UserContext from "../context/UserContext";
import axios from "axios";
import "../landing/App.css";

export default function Register() {
  const recaptcha = React.createRef();
  const [name, setName] = useState();
  let [email, setEmail] = useState();
  let [identification, setID] = useState();
  const [isErr, setIsErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const submit = async (e) => {
    e.preventDefault();
    setIsErr(false);
    if (!(!name || !identification || !email)) {
      email = email.toLowerCase();
      const newUser = { name, identification, email };
      const passed = await axios.post("/api/users/add", newUser).catch((e) => {
        setID("");
        setIsErr(true);
        if (e == "Error: Request failed with status code 400") {
          setErrMessage(
            "Account with same name or email already exists. Login?"
          );
        } else {
          setErrMessage("Internal server error.");
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
        const name = loginResponse.data.user.name;
        const logRequest = {
          actionType: "Register and Logged In",
          name: name,
          time: new Date().toString(),
        };
        await axios.post("/api/log/post", logRequest).then(() => {
          window.location = "/";
        });
      }
    } else {
      setID("");
      setIsErr(true);
      setErrMessage("Please fill out all fields.");
    }
  };

  return (
    <Container style={{ width: "100%" }}>
      <br />
      <>
        {!userData.user ? (
          <>
            {!isMobile ? (
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
                      Enter your real name, separated by a space - "First Last"
                      or hours for events may not be counted correctly.
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
                      value={identification}
                      onChange={(e) => setID(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      <br />
                      Your offline hours will not be migrated (we honored
                      registrants who signed up before v2's release).
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
              <>
                <Container
                  style={{
                    backgroundColor: "white",
                    width: "280px",
                    borderRadius: "8px 8px 8px 8px",
                  }}
                  className="p-5 text-center"
                >
                  <Row className="justify-content-center">
                    <h5>Hi! Register here</h5>
                  </Row>
                  <Form className="p-3">
                    <Form.Group controlId="formBasicnamee">
                      <Form.Control
                        as={TextField}
                        error={isErr}
                        helperText={errMessage}
                        style={{
                          left: "-20px",
                          width: "200px",
                          height: "56px",
                        }}
                        variant="outlined"
                        placeholder="John Doe"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Form.Text className="text-muted">
                        <br />
                        Enter your real name, separated by a space - "First
                        Last" - like this.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        as={TextField}
                        style={{
                          left: "-20px",
                          width: "200px",
                          height: "56px",
                        }}
                        variant="outlined"
                        label="Email"
                        error={isErr}
                        helperText={errMessage}
                        placeholder="aylusirvine@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Form.Text className="text-muted">
                        <br />
                        Event emails will be sent to this, case sensitive.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPass">
                      <Form.Control
                        as={TextField}
                        style={{
                          left: "-20px",
                          width: "200px",
                          height: "56px",
                        }}
                        variant="outlined"
                        error={isErr}
                        helperText={errMessage}
                        placeholder="**********"
                        type="password"
                        label="Password"
                        onChange={(e) => setID(e.target.value)}
                      />
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
                      Make sure to verify your information.
                    </Form.Text>
                  </Form>
                </Container>
              </>
            )}
          </>
        ) : (
          <Container className="p-3 text-center">
            You are already signed in!
          </Container>
        )}
      </>
    </Container>
  );
}
