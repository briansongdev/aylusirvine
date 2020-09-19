import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import emailjs from "emailjs-com";
import UserContext from "../context/UserContext";
import "../landing/App.css";

export default function CreateEvent() {
  const { userData, setUserData } = useContext(UserContext);

  const [title, onChangeTitle] = useState();
  const [description, onChangeDescription] = useState();
  const [duration, onChangeDuration] = useState();
  const [date, onChangeDate] = useState(new Date());

  const onSubmit = async (e) => {
    e.preventDefault();
    const events = {
      title: title,
      description: description,
      duration: duration,
      date: date,
    };
    await axios
      .post("/api/events/add", events)
      .then((res) => console.log(res.data));
    let adminToken = "";
    if (userData.isAdmin) {
      adminToken = "ashdkajsdhaskdhaskdha";
    }
    const headers = {
      "x-auth-token": userData.token,
      "admin-Token": adminToken,
    };
    let emailList = await axios.get("/api/users/extractEmails/", {
      headers: headers,
    });
    const templateParams = {
      emailName: emailList.data.join(),
      eventName: title,
      eventDescription: description,
      eventDuration: duration,
    };
    console.log(templateParams.emailName);
    // await emailjs
    //   .send(
    //     "gmail",
    //     "template_kg8dq4kR",
    //     templateParams,
    //     "user_7ramHducqnduQpv2RNhBj"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    window.location = "/";
  };
  return (
    <Container>
      {userData.isAdmin ? (
        <>
          <Container className="p-3">
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicText">
                <Form.Label>Title of Event</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="New Event: Poster-making for Exercise Awareness"
                  onChange={(e) => onChangeTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  id="preserveLine"
                  placeholder="Lorem ipsum dolor sit amet, vis malorum repudiare argumentum an, qui ex lucilius argumentum. Mea ad ullum scripta consulatu, ei diam salutandi sea. Et falli accumsan signiferumque vel. Euismod feugiat usu ex. Vix purto populo persecuti cu, ea nec esse nominavi appareat. Submit by 10 o' clock tonight."
                  onChange={(e) => onChangeDescription(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Short Description of the Event.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="2"
                  onChange={(e) => onChangeDuration(e.target.value)}
                />
                <Form.Text className="text-muted">
                  2 stands for 2 hours of community service.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <DatePicker
                  selected={date}
                  onChange={(date) => onChangeDate(date)}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Create Event
              </Button>
            </Form>
          </Container>
        </>
      ) : (
        <Container className="p-3 text-center">
          Hi! You've reached this page in error. Click one of the above links to
          go back home!
        </Container>
      )}
    </Container>
  );
}
