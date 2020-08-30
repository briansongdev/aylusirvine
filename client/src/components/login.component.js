import React, { useState, useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import Button from "@material-ui/core/button";
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
            alert("There is no one registered with this email.");
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
    <Container className="p-3 text-center">
      <Row className="justify-content-center">
        <h5>We're glad you're back!</h5>
      </Row>
      <Form className="p-3">
        <Form.Group controlId="formBasicEmaill">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="aylusirvine@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPass">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button size="large" variant="outlined" href="#" onClick={submit}>
          Log In
        </Button>
      </Form>
    </Container>
  );
}
