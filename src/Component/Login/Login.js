import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./Login.css";
import fb from "../../Icon/fb.png";
import google from "../../Icon/google.png";
import { createUserWithEmailAndPass, initializeWithLoginFramework,signInWithEmailAndPass,handleGoogleSignIn,handleGoogleSignOut,handleFbSign } from "./LoginManger";
import { MyContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


initializeWithLoginFramework();

const Login = () => {
  
  const { space, logUser } = useContext(MyContext);
  // const [loggedInUser,setLoggedInUser]=user;
  const [loggedInUser, setLoggedInUser] = logUser;
  const [place, setPlace]=space;
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignIn: false,
    email: "",
    Name: "",
    Photo: "", 
    Password: "",
    error: "",
    success: false,
  });
  const { email, Name, isSignIn, Photo, Password, error, success } = user;

  const history = useHistory(); //History is getting this page. If I replace this page with another route then it will be replaced .
  const location = useLocation(); // It is getting the location of this page but calling the first state component '/shipment'
  let { from } = location.state || { from: { pathname: "/" } }; //Here location.state means '/shipment'

//Password

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };


  const eventHandlerP = (e) => {
    console.log(e.target.value);
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isFieldValid);
      
    }
    if (e.target.name === "Password") {
      const passwordLength = e.target.value.length > 7;
      const isPasswordValid = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(
        e.target.value
      );
      isFieldValid = passwordLength && isPasswordValid;
    }

    if (isFieldValid) {
      const userObject = { ...user };
      userObject[e.target.name] = e.target.value;
      setUser(userObject);
    }
  };


  //Password
  const submitHandler = (e) => {
    // let message = "success done"; 

    if (newUser && email && Password) {
      console.log(email);
      createUserWithEmailAndPass(Name, email, Password).then((res) => {
        handleResponse(res, true);
        
      });
    }

    if (!newUser && email && Password) {
      console.log(email);
      
      signInWithEmailAndPass(email, Password).then((res) => {
        handleResponse(res, true);
       
      });
    }

    e.preventDefault(); 
  };
  //Google and fb

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  
  const googleSignOut = () => {
    handleGoogleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };
  //FB SIGN IN//
  const fbSignIn = () => {
    handleFbSign().then((res) => {
      console.log(res);
      handleResponse(res, true);
    });
  };
  



  return (
    <div className="bg-color">
      {newUser?<> 
        <Form className="login-form" onSubmit={submitHandler}>
          <Form.Control
            style={{ border: "0", borderBottom: "1px solid" }}
            type="text"
            name="Name"
            onBlur={eventHandlerP}
            placeholder="First Name"
            required
          />
          {/* <br />
          <Form.Control
            style={{ border: "0", borderBottom: "1px solid" }}
            type="text"
            placeholder="Last Name"
          /> */}

          <br />
          <Form.Control
            style={{ border: "0", borderBottom: "1px solid" }}
            type="email"
            name="email"
            onBlur={eventHandlerP}
            placeholder="Username or email"
            required
          />
          <br />

          <Form.Control
            style={{ border: "0", borderBottom: "1px solid" }}
            type="password"
            name="Password"
            onBlur={eventHandlerP}
            placeholder="Password"
            required
          />
          {/* 
          <br />
          <Form.Control
            style={{ border: "0", borderBottom: "1px solid" }}
            type="password"
            placeholder="Confirm Password"
          />
          <br /> */}
          <input type="submit" value="Create New Account" />

          
          <p style={{ textAlign: "center" }}>
            Already have an account?
            <span>
              <a href="#" onClick={() => setNewUser(!newUser)}>
                Login
              </a>
            </span>
          </p>
        </Form>
      </> : <>
        {/* //Create Account */}
        <Form className="login-form" onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "30px" }}>Login</Form.Label>
            <Form.Control
              style={{ border: "0", borderBottom: "1px solid" }}
              type="email"
              onBlur={eventHandlerP}
              placeholder="Username or email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              style={{ border: "0", borderBottom: "1px solid" }}
              type="password"
              onBlur={eventHandlerP}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group
            className="d-flex justify-content-between"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Remember Me" />{" "}
            <a href="">Forgot Password</a>
          </Form.Group>
          <input type="submit" value="Login" />
          <p style={{ textAlign: "center" }}>
            Don't have you account?
            <span>
              <a onClick={() => setNewUser(!newUser)} href="#">
                Create an Account
              </a>
            </span>
          </p>
        </Form>
      </>}

      {}

      {/*Google and Facebook login */}

      <div style={{ margin: "auto", textAlign: "center" }}>
        <h3>Or</h3>
      </div>
      <br />
      <div className="googleFb">
        <div
        
          style={{
            display: "flex",
            border: "1px solid gray",
            padding: "5px",
            borderRadius: "50px",
          }}
        >
          <img
            style={{ width: "40px", height: "40px", padding: "0", margin: "0" }}
            src={fb}
            alt=""
          />
          <button onClick={fbSignIn}
            style={{ border: "0", margin: "auto", backgroundColor: "white" }}
          >
            Continue with Facebook
          </button>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            border: "1px solid gray",
            padding: "5px",
            borderRadius: "50px",
          }}
        >
          <img
            style={{ width: "40px", height: "40px", padding: "0", margin: "0" }}
            src={google}
            alt=""
          />
          <button onClick={googleSignIn}
            style={{ border: "0", margin: "auto", backgroundColor: "white" }}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>

  );
};

export default Login;
