import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import fakeData from "../../fakeData/fakeData";
import "./Body.css";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
const Body = () => {
  const { space, logUser } = useContext(MyContext); 
  const [place, setPlace]=space;

  useEffect(() => {
    const placeData = fakeData;
    setPlace(placeData);
  }, []);

  const [selectedPlace, setSelectedPlace] = useState({});

  const placeId = (id) => {
    const onePlace = place.find((p) => p.id === id);
    setSelectedPlace(onePlace);
  };
  console.log(selectedPlace);
  return (
    <Container>
      <Row className="place-item">
        <div className=" col-md-4">
          <h1 style={{fontSize:'53px'}}>{selectedPlace.name}</h1>
          <p>{selectedPlace.description}</p>
          <Link to={`/book/${selectedPlace.id}`}> <button>Booking-{selectedPlace.id}</button></Link>
        </div>

        {place.map((singlePlace) => {
          return (
            <div id="focusmeplease" onClick={() => placeId(singlePlace.id)} className="col-md-2">
              <h3 className="place-name">{singlePlace.name}</h3>
              <a href="#">
                <img src={singlePlace.image} alt="" />
              </a>
            </div>
          ); //why return here?
        })}
      </Row>
    </Container>
  );
};

export default Body;
