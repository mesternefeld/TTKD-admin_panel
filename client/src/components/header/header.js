
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
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Mocked Pages" id="basic-nav-dropdown">
                        <NavDropdown.Item href="./Dashboard"> Dashboard </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="./FileStructure">File Structure</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="./Content">Edit Content</NavDropdown.Item>
                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="./Audio">Add Audio</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="./Steps">Add Steps</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="./Video">Add Video</NavDropdown.Item> */}
                    </NavDropdown>
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