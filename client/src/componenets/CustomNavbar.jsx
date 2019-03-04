import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
import { Navbar, Nav } from "react-bootstrap";

export default class CustomNavbar extends Component {
  render() {
    return (
      <Navbar bg='light' variant='light' expand='lg'>
        <Navbar.Brand href='/'>
          <img
            src={logo}
            width='30'
            height='30'
            className='logo ml-3 mr-3'
            alt='logo'
          />
          {"MERN-Stack Todo App"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>Todos</Nav.Link>
            <Nav.Link href='/create'>Create Todo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
