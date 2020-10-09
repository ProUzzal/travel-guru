import React from "react";
import logo from '../../Image/Logo.png'
import "./Header.css"
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";


const Header = () => {
  
const history= useHistory();
const routeControl=()=>{
  history.replace('/login');
}
  return (
    <Navbar  variant="white" className='header container' >
      <img style={{height:'50px', padding:'1px', filter:'invert(100%)'}} src={logo} alt=""/>
      <Form inline>
        <FormControl  type="text" placeholder="Search Your Destination.." className="mr-sm-2 linkText" />
        {/* <Button variant="outline-primary">Search Your Destination...</Button> */}
      </Form>
      <Nav className="mr-auto">
        <Nav.Link to="#home"><span className="linkText">News</span> </Nav.Link>
        <Nav.Link to="#features"><span className="linkText">Destination</span></Nav.Link>
        <Nav.Link to="#pricing"><span className="linkText">Blog</span></Nav.Link>
        <Nav.Link to="#pricing"><span className="linkText">Contact</span></Nav.Link>
      </Nav>
      <Form inline>
        <Button onClick={routeControl} className="bg-color">Login</Button>
      </Form>
    </Navbar>
  );
};

export default Header;
