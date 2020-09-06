import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
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
}));

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
  const classes = useStyles();

  return (
    <Container>
      <Drawer
        style={{ width: "15vw" }}
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
              {!isMobile ? (
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
              {!isMobile ? (
                <>
                  <ListItemText primary="FAQ" />
                </>
              ) : (
                <></>
              )}
            </ListItem>
          </Link>
        </List>
        <List>
          <a
            href="https://www.aylus.org/irvine-ca"
            target="_blank"
            style={{ textDecoration: "none" }}
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              {!isMobile ? (
                <>
                  <ListItemText primary="Our branch" />
                </>
              ) : (
                <></>
              )}
            </ListItem>
          </a>
        </List>
      </Drawer>

      <Drawer
        style={{ width: "15vw" }}
        variant="persistent"
        anchor="right"
        open={true}
        classes={{ paper: classes.drawerPaper }}
      >
        {userData.user ? (
          <>
            <List>
              <ListItem>
                {!isMobile ? (
                  <>
                    <ListItemText
                      style={{ cursor: "default" }}
                      primary={"Welcome " + userData.user.name + "!"}
                    />
                  </>
                ) : (
                  <>
                    <ListItemText
                      style={{ cursor: "default" }}
                      primary={"Hi!"}
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
                  {!isMobile ? (
                    <>
                      <ListItemText primary="Your hours" />
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
                  {!isMobile ? (
                    <>
                      <ListItemText primary="Log out" />
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
                {!isMobile ? (
                  <>
                    <ListItemText primary={"Sign in or register."} />
                  </>
                ) : (
                  <>
                    <ListItemText
                      style={{ cursor: "default" }}
                      primary={"Hi!"}
                    />
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
                  {!isMobile ? (
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
                  {!isMobile ? (
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
        <List>
          <ListItem>
            <ListItemText secondary={"made with ❤️ by Brian."} />
          </ListItem>
        </List>
      </Drawer>

      <Navbar
        id="imagio"
        variant="dark"
        expand="md"
        className="justify-content-center"
      >
        <Navbar.Brand>
          <h1 className="display-5" style={{ cursor: "default" }}>
            AYLUS Irvine Volunteers
          </h1>
        </Navbar.Brand>
      </Navbar>
    </Container>
  );
}
