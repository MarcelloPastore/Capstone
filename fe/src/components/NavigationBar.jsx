import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../CSS/globalCss.css'



const NavigationBar = () => {
  

  return (
    <Navbar expand="lg" className="navbar-color">
      <Container>
        <Navbar.Brand href="/">
        <img
              alt=""
              src="https://res.cloudinary.com/do1eu7dnn/image/upload/v1695891132/GaberBlog_logo_no_background_yap8cw.png"
              width="75"
              height="50"
              className="d-inline-block align-top logo-navbar"
            />{'   '}
          GamerBlog
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login/Sign In</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar