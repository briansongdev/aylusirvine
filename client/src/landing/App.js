import React, { useState, useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { isMobile } from "react-device-detect";
import Axios from "axios";

import Navigation from "./Navigation";
import UserContext from "../context/UserContext.js";

import EventsList from "../components/events-list.component";
import EditEvent from "../components/edit-event.component";
import CreateEvent from "../components/create-event.component";
import Register from "../components/register.component";
import SignIn from "../components/login.component";
import HourCheck from "../components/hourcheck.component";
import FollowUp from "../components/follow-up.component";
import RegisterForEvent from "../components/register-for-event.component";
import ErrorPage from "./Error";
import Investigate from "../components/investigate.component";
import PostEvent from "../components/post-event.component";
import FAQ from "./faq";
import GetLog from "../components/getLog.component";
import NewChanges from "./NewChanges";
import ViewFollowups from "../components/view-followups.component";

import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    isAdmin: false,
    isPartAdmin: false,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("/api/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await Axios.get("/api/users/", {
          headers: { "x-auth-token": token },
        });
        if (userRes.data.email == "brians3476@gmail.com") {
          setUserData({
            token,
            user: userRes.data,
            isAdmin: true,
            isPartAdmin: false,
          });
        }
        //         else if (
        //           userRes.data.email == "annielee0203@gmail.com" ||
        //           userRes.data.email == "annabelxxtiong@gmail.com"
        //           false
        //         ) {
        //           setUserData({
        //             token,
        //             user: userRes.data,
        //             isAdmin: false,
        //             isPartAdmin: true,
        //           });
        //         }
        else {
          setUserData({
            token,
            user: userRes.data,
            isAdmin: false,
            isPartAdmin: false,
          });
        }
      }
    };
    checkLoggedIn();
  }, []);
  if (!window.frameElement) {
    return (
      <div
        style={{
          backgroundColor: "#EFEFEF",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <UserContext.Provider value={{ userData, setUserData }}>
          <Container>
            <Navigation />
            <Container style={{ maxWidth: "70vw" }}>
              <Switch>
                <Route path="/" exact component={EventsList} />
                <Route path="/edit/:id" component={EditEvent} />
                <Route path="/flup/:id" component={FollowUp} />
                <Route path="/create" component={CreateEvent} />
                <Route path="/register" component={Register} />
                <Route path="/signin" component={SignIn} />
                <Route path="/hours" component={HourCheck} />
                <Route
                  path="/processSignup/:id/:userId"
                  component={RegisterForEvent}
                />
                <Route
                  path="/followups/:id/:userId"
                  component={ViewFollowups}
                />
                <Route path="/investigate/:id" component={Investigate} />
                <Route path="/post/:id" component={PostEvent} />
                <Route path="/faq" component={FAQ} />
                <Route path="/eventListenerList" component={GetLog} />
                <Route path="/updates" component={NewChanges} />
                <Route component={ErrorPage} />
              </Switch>
            </Container>
          </Container>
        </UserContext.Provider>
      </div>
    );
  } else {
    return <Redirect to="https://aylusirvine.com" />;
  }
}

export default App;
