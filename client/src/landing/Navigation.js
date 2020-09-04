import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Navigation() {
  const { userData, setUserData } = useContext(UserContext);

  const logout = async () => {
    setUserData({
      token: undefined,
      user: undefined,
      isAdmin: false,
    });
    await localStorage.setItem("auth-token", "");
    window.location = "/";
    // logs out user by clearing the JWT
  };

  return (
    <Navbar id="imagio" variant="dark" expand="md" className="uvs">
      <Navbar.Brand as={Link} to="/">
        <h1 className="display-4">AYLUS Irvine Volunteers</h1>
      </Navbar.Brand>
      <Nav className="ml-auto">
        {userData.isAdmin ? (
          <Nav.Link as={Link} to="/create">
            <h5>Create</h5>
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/faq">
            <h5>FAQ</h5>
          </Nav.Link>
        )}

        {userData.user ? (
          <>
            <Nav.Link as={Link} to="/hours">
              <h5>Your Hours</h5>
            </Nav.Link>
            <Nav.Link onClick={logout}>
              <h5>Logout</h5>
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/register">
              <h5>Register</h5>
            </Nav.Link>
            <Nav.Link as={Link} to="/signin">
              <h5>Sign In</h5>
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
