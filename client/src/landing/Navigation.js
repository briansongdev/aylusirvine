import React, { useContext, useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  List,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import "./App.css";
import { makeStyles } from "@material-ui/core/";
import HomeIcon from "@material-ui/icons/Home";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import LanguageIcon from "@material-ui/icons/Language";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import axios from "axios";
import { isMobile } from "react-device-detect";

import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "inherit",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.text.primary,
    },
    color: theme.palette.text.primary,
  },
  bottomPush: {
    position: "fixed",
    bottom: "5px",
    width: "15vw",
  },
}));

export default function Navigation() {
  const { userData, setUserData } = useContext(UserContext);
  const [it, setIt] = useState(false);
  const [leftWidth, changeWidth] = useState("80px");
  const [rightWidth, changeWidth1] = useState("80px");

  useEffect(() => {
    if (!it) {
      if (!isMobile) {
        changeWidth("15vw");
        changeWidth1("15vw");
      }
      setIt(true);
    }
  });
  const handleClickLeft = () => {
    if (leftWidth == "15vw") {
      changeWidth("80px");
    } else {
      changeWidth("15vw");
    }
  };

  const handleClickRight = () => {
    if (rightWidth == "15vw") {
      changeWidth1("80px");
    } else {
      changeWidth1("15vw");
    }
  };

  const checkWidth = () => {
    if (leftWidth == "15vw") {
      return true;
    } else {
      return false;
    }
  };
  const checkWidth1 = () => {
    if (rightWidth == "15vw") {
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUserData({
        token: undefined,
        user: undefined,
        isAdmin: false,
      });
      await localStorage.setItem("auth-token", "");
      const name = userData.user.name;
      let deviceType;
      if (isMobile) {
        deviceType = "Mobile";
      } else {
        deviceType = "Computer";
      }
      const logRequest = {
        actionType: "Log Out",
        name: name,
        time: new Date().toString(),
        deviceType: deviceType,
      };
      axios.post("/api/log/post", logRequest);
      window.location = "/";
    }
    // logs out user by clearing the JWT
  };
  const classes = useStyles();

  return (
    <Container>
      <Drawer
        style={{
          width: leftWidth,
          transition: "width 0.4s",
          transitionTimingFunction: "ease-out",
        }}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              {checkWidth() ? (
                <>
                  <ListItemText primary="Home" />
                </>
              ) : (
                <></>
              )}
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link
            to="/faq"
            style={{ textDecoration: "none" }}
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              {checkWidth() ? (
                <>
                  <ListItemText primary="FAQ" />
                </>
              ) : (
                <></>
              )}
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {checkWidth() ? (
            <ListItem>
              <ListItemText secondary={"❤️ AYLUS Irvine. v3"} />
            </ListItem>
          ) : (
            <></>
          )}
        </List>
        <List className={classes.bottomPush}>
          <ListItem
            style={{
              width: leftWidth,
              transition: "width 0.4s",
              transitionTimingFunction: "ease-out",
            }}
            button
            className="justify-content-center"
            onClick={handleClickLeft}
          >
            {!isMobile ? (
              <>
                {checkWidth() ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
              </>
            ) : (
              <></>
            )}
          </ListItem>
        </List>
      </Drawer>

      <Drawer
        style={{
          width: rightWidth,
          transition: "width 0.4s",
          transitionTimingFunction: "ease-out",
        }}
        variant="persistent"
        anchor="right"
        open={true}
        classes={{ paper: classes.drawerPaper }}
      >
        {userData.user ? (
          <>
            <List>
              <ListItem>
                {checkWidth1() ? (
                  <>
                    <ListItemText
                      style={{ cursor: "default" }}
                      primary={"Welcome " + userData.user.name + "! 👑"}
                    />
                  </>
                ) : (
                  <>
                    <ListItemText
                      style={{ cursor: "default" }}
                      primary={"Hello!"}
                    />
                  </>
                )}
              </ListItem>
            </List>
            <Divider />
            <List>
              <Link
                to="/hours"
                style={{ textDecoration: "none" }}
                className={classes.link}
              >
                <ListItem button>
                  <ListItemIcon>
                    <AccessAlarmIcon />
                  </ListItemIcon>
                  {checkWidth1() ? (
                    <>
                      <ListItemText primary="Hours" />
                    </>
                  ) : (
                    <></>
                  )}
                </ListItem>
              </Link>
            </List>
            <List>
              <Link
                onClick={logout}
                style={{ textDecoration: "none" }}
                className={classes.link}
              >
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  {checkWidth1() ? (
                    <>
                      <ListItemText primary="Logout" />
                    </>
                  ) : (
                    <></>
                  )}
                </ListItem>
              </Link>
            </List>
          </>
        ) : (
          <>
            <List>
              <ListItem>
                {checkWidth1() ? (
                  <>
                    <ListItemText primary={"Sign in or register."} />
                  </>
                ) : (
                  <>
                    <ListItemText primary={"Hi!"} />
                  </>
                )}
              </ListItem>
            </List>
            <List>
              <Link
                to="/register"
                style={{ textDecoration: "none" }}
                className={classes.link}
              >
                <ListItem button>
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  {checkWidth1() ? (
                    <>
                      <ListItemText primary="Register" />
                    </>
                  ) : (
                    <></>
                  )}
                </ListItem>
              </Link>
            </List>
            <List>
              <Link
                to="/signin"
                style={{ textDecoration: "none" }}
                className={classes.link}
              >
                <ListItem button>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  {checkWidth1() ? (
                    <>
                      <ListItemText primary="Login" />
                    </>
                  ) : (
                    <></>
                  )}
                </ListItem>
              </Link>
            </List>
            <Divider />
          </>
        )}
        {userData.isAdmin ? (
          <>
            <List>
              <Link
                to="/create"
                style={{ textDecoration: "none" }}
                className={classes.link}
              >
                <ListItem button>
                  <ListItemText primary="Create" />
                </ListItem>
              </Link>
              <Link
                to="/eventListenerList"
                style={{ textDecoration: "none" }}
                className={classes.link}
              >
                <ListItem button>
                  <ListItemText primary="Log" />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </>
        ) : (
          <></>
        )}
        <List className={classes.bottomPush}>
          <ListItem
            style={{
              width: rightWidth,
              transition: "width 0.4s",
              transitionTimingFunction: "ease-out",
            }}
            button
            className="justify-content-center"
            onClick={handleClickRight}
          >
            {!isMobile ? (
              <>
                {checkWidth1() ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
              </>
            ) : (
              <></>
            )}
          </ListItem>
        </List>
      </Drawer>
      <Navbar
        id="imagio"
        variant="dark"
        className="justify-content-center text-center center-cropped"
      >
        <Navbar.Brand>
          {!isMobile ? (
            <>
              <h1 className="display-5" style={{ cursor: "default" }}>
                AYLUS Irvine Volunteers
              </h1>
            </>
          ) : (
            <>
              <h1
                className="display-5 text-center"
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                }}
              >
                AYLUS Irvine Volunteers
              </h1>
            </>
          )}
        </Navbar.Brand>
      </Navbar>
    </Container>
  );
}
