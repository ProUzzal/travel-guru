
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { MyContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {

  const { space, logUser } = useContext(MyContext);
  const [loggedInUser, setLoggedInUser] = logUser;

    return (
        <Route
        {...rest}
        
        render={({ location }) =>
       
          loggedInUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }, //State is setting the login component /shipment from here. 
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;