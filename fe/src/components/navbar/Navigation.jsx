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
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';


const Navigation = () => {
    
    return (
        <Navbar expand="lg" className='bg-dark' variant='dark'>
            <Container fluid className='d-flex '>
                <Navbar.Brand href="/" style={{ color: "orange", fontWeight: 700, fontSize: "larger" }}>
                    <img src={BA} alt="Logo" style={{ width: 50, marginRight: '10px' }} />
                    <Link to={'/'} style={{ color: "orange", textDecoration: "none" }}>
                        Battle Arsenal
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Row className="justify-items-center">

                    <Col>
                        <Navbar.Collapse id="basic-navbar-nav">
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
                                    <Button type="submit" style={{ backgroundColor: "orange", margin: "1px solid black" }} variant='black'>Search</Button>
                                </Col>
                                <Col xs="auto">
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "orange", margin: "1px solid black" }} variant='black'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                            </svg>
                                        </Dropdown.Toggle>
                                        <DropdownMenu>
                                            <Dropdown.Item></Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item></Dropdown.Item>
                                        </DropdownMenu>
                                    </Dropdown>
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
                                <Dropdown.Item href="#action/3.1">Account</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#action/3.2">My Orders</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#action/3.3">Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default Navigation