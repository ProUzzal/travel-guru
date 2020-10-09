import React, { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { MyContext } from "../../App";
import "./Booking.css";
const Booking = () => {
  const { id } = useParams();

  const { space, logUser } = useContext(MyContext);
  const [place, setPlace]=space;

  console.log(id, place);
  // console.log(place);
  // const [bookPlace, setBookPlace] = useState({});
  // const placeId = (id) => {
  const onePlace = place.find((p) => Number(p.id) === Number(id));
  //   setBookPlace(onePlace)

  // };
  // console.log(bookPlace);

  const history=useHistory();

  const handleBooking=()=>{
history.push("/hotel")


  }






  return (
    <Container className="booking-part">
      <Row>
        {onePlace && (
          <div className="col-md-4">
            <h1>{onePlace.name}</h1>
            <p>{onePlace.details}</p>
          </div>
        )}
        <div className="col-md-4">
          <Form className="travel-plan">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Origin</Form.Label>
              <Form.Control type="text" placeholder="Enter your origin " />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your selected destination"
              />
            </Form.Group>
            <Form.Group style={{ display: "flex" }}>
              <div>
                <label for="start">From</label>
                <br />
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value="2020-09-22"
                  min="2020-01-01"
                  max="2021-03-31"
                />
              </div>
              <div>
                <label for="end">To</label>
                <br />
                <input
                  type="date"
                  id="end"
                  name="trip-end"
                  value="2020-09-22"
                  min="2020-01-01"
                  max="2021-03-31"
                />
              </div>
            </Form.Group>
            <Button onClick={handleBooking}>
              Start Booking
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Booking;
