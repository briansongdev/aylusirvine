import React, { useState, useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [identification, setPassword] = useState();

  const { setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    if (!(!email || !identification)) {
      const loginUser = { email, identification };
      const loginResponse = await axios
        .post("/api/users/login", loginUser)
        .catch((e) => {
          if (e == "Error: Request failed with status code 400") {
            alert(
              "Email format is invalid or there is no one registered with this email."
            );
          } else if (e == "Error: Request failed with status code 401") {
            alert("Invalid credentials, please try again.");
          } else {
            alert("Error. Please try again.");
          }
        });
      if (loginResponse) {
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
      <Container
        style={{
          backgroundColor: "#e5fffd",
          width: "650px",
          borderRadius: "8px 8px 8px 8px",
        }}
        className="p-5 text-center"
      >
        <Row className="justify-content-center">
          <h5>We're glad you're back!</h5>
        </Row>
        <Form className="p-3">
          <Form.Group controlId="formBasicEmaill">
            <Form.Control
              as={TextField}
              style={{ width: "500px", height: "56px" }}
              variant="outlined"
              placeholder="aylusirvine@gmail.com"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicPass">
            <Form.Control
              as={TextField}
              style={{ width: "500px", height: "56px" }}
              variant="outlined"
              placeholder="*****"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
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
            Log In
          </Button>
        </Form>
      </Container>
    </>
  );
}
