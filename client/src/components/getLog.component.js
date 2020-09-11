import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";
import dateFormat from "dateformat";

class GetLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [],
    };
  }
  getLog = async () => {
    let adminToken = "";
    if (this.context.userData.isAdmin) {
      adminToken = "ashdkajsdhaskdhaskdha";
    }
    const headers = {
      "x-auth-token": this.context.userData.token,
      "admin-Token": adminToken,
    };
    await axios
      .get("/api/log/encryptedLogs", {
        headers: headers,
      })
      .then((data) => {
        this.setState({ actions: data.data });
      });
  };
  renderNames() {
    return this.state.actions.map((actionDesc) => {
      return (
        <Container className="p-1">
          <br />
          {actionDesc.actionType} - {actionDesc.name} -{" "}
          {dateFormat(actionDesc.time, "default")}
        </Container>
      );
    });
  }

  render() {
    let user = this.context.userData;
    return (
      <>
        <br />
        {user.isAdmin ? (
          <Container className="p-3 text-center">
            <Button variant="success" onClick={this.getLog}>
              Get Log!
            </Button>
            {this.renderNames()}
          </Container>
        ) : (
          <Container className="p-3 text-center">
            Hi! You've reached this page in error. Click one of the above links
            to go back home!
          </Container>
        )}
      </>
    );
  }
}

GetLog.contextType = UserContext;
export default GetLog;
