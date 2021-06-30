import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavbarBet = () => {
  return (
    <div>
      <Navbar fixed="top" bg="light" expand="lg">
        <Navbar.Brand href="#home">Select-4</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Wallet</Nav.Link>
            <Nav.Link href="#keypad">Keypad</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarBet;