import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./Component/Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Carousel from "./Component/Carousel/Carousel";
import Body from "./Component/Body/Body";
import Booking from "./Component/Booking/Booking";
import Login from "./Component/Login/Login";
import Hotel from "./Component/Hotel/Hotel";
import PrivateRoute from "./Component/PrivatRoute/PrivateRoute";

export const MyContext = createContext();

function App() {
  const [place, setPlace] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <MyContext.Provider
      value={{
        space: [place, setPlace],
        logUser: [loggedInUser, setLoggedInUser],
      }}
    >
      <div className="App">
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Body></Body>
            </Route>
            <Route path="/book/:id">
              <Booking></Booking>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/hotel">
              <Hotel></Hotel>
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </MyContext.Provider>
  );
}
export default App;
