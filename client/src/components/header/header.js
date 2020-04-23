
import React from "react";
//import {Glyphicon} from "react-bootstrap";
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
// import {
//     Homepage,
//     List,
//     Dashboard,
//     FileStructure,
//     Audio, 
//     Steps, 
//     Video
//   } from "./../pages";

class Header extends React.Component {
    render() {
        return (
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">TTKD Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="./FileStructure">File Structure</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;