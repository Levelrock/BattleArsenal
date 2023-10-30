import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import './Navigation.css'
import BA from '../../assets/BA.png'
import { Link } from 'react-router-dom'


const Navigation = () => {
    return (
        <Navbar expand="lg" className='bg-dark' variant='dark'>
            <Container fluid className='d-flex '>
                <Navbar.Brand href="#home" style={{ color: "orange", fontWeight: 700, fontSize: "larger" }}>
                    <img src={BA} alt="Logo" style={{ width: 50, marginRight: '10px' }} />
                    
                        Battle Arsenal
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Row className="justify-items-center">

                    <Col>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <Nav.Link className='myclass' href="#home">Home</Nav.Link>
                                <Nav.Link className='myclass' href="#link">Link</Nav.Link>
                                <Nav.Link className='myclass' href="#home">Home</Nav.Link>
                                <Nav.Link className='myclass' href="#link">Link</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col xs="auto">
                        <Form align="end">
                            <Row>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search"
                                        className=" mr-sm-2"
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit" style={{ backgroundColor: "orange", margin: "1px solid black" }} variant='black'>Cerca</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs="auto">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "orange", margin: "1px solid black" }} variant='black'>
                                Profile
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                                <Dropdown.Item href="#action/3.1">Action</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#action/3.2">Another action</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#action/3.3">Something</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#action/3.4">Separated link</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default Navigation