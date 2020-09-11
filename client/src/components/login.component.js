import React, { useState, useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function SignIn() {
  let [email, setEmail] = useState();
  const [identification, setPassword] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isPassErr, setIsPassErr] = useState(false);
  const [passHelperText, setPassHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const { userData, setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    setIsErr(false);
    setIsPassErr(false);
    setPassHelperText("");
    setEmailHelperText("");
    email = email.toLowerCase();
    console.log(email);
    if (!(!email || !identification)) {
      const loginUser = { email, identification };
      const loginResponse = await axios
        .post("/api/users/login", loginUser)
        .catch((e) => {
          setIsErr(true);
          if (e == "Error: Request failed with status code 400") {
            setIsErr(true);
            setEmailHelperText(
              "Email format is invalid or there is no one registered."
            );
          } else if (e == "Error: Request failed with status code 401") {
            setIsPassErr(true);
            setIsErr(true);
            setEmailHelperText("Invalid credentials, try again.");
            setPassHelperText("Invalid credentials, try again.");
          } else {
            setIsPassErr(true);
            setIsErr(true);
            setEmailHelperText("Server error.");
            setPassHelperText("Server error.");
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
      setIsErr(true);
      setIsPassErr(true);
      setEmailHelperText("Please fill out all fields.");
      setPassHelperText("Please fill out all fields.");
    }
  };

  return (
    <>
      <br />
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
                <h5>We're glad you're back!</h5>
              </Row>
              <Form className="p-3">
                <Form.Group controlId="formBasicEmaill">
                  <Form.Control
                    error={isErr}
                    as={TextField}
                    style={{ width: "400px", height: "56px" }}
                    variant="outlined"
                    placeholder="aylusirvine@gmail.com"
                    label="Email"
                    helperText={emailHelperText}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formBasicPass">
                  <Form.Control
                    error={isPassErr}
                    as={TextField}
                    style={{ width: "400px", height: "56px" }}
                    variant="outlined"
                    placeholder="**********"
                    label="Password"
                    type="password"
                    helperText={passHelperText}
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
          ) : (
            <Container
              style={{
                backgroundColor: "white",
                width: "280px",
                borderRadius: "8px 8px 8px 8px",
              }}
              className="p-5 text-center"
            >
              <Row className="justify-content-center">
                <h5>Login!</h5>
              </Row>
              <Form className="p-3">
                <Form.Group controlId="formBasicEmaill">
                  <Form.Control
                    error={isErr}
                    as={TextField}
                    style={{ left: "-20px", width: "200px", height: "56px" }}
                    variant="outlined"
                    placeholder="aylusirvine@gmail.com"
                    label="Email"
                    helperText={emailHelperText}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formBasicPass">
                  <Form.Control
                    error={isPassErr}
                    as={TextField}
                    style={{ left: "-20px", width: "200px", height: "56px" }}
                    variant="outlined"
                    placeholder="**********"
                    label="Password"
                    type="password"
                    helperText={passHelperText}
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
          )}
        </>
      ) : (
        <Container className="p-3 text-center">
          You are already signed in!
        </Container>
      )}
    </>
  );
}
