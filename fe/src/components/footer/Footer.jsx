import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './footer.css'

const Footer = () => {
    return (
        <Container fluid>
            <Row className=" d-flex justify-content-center">
                <Col className=" d-flex flex-column align-items-center personal-class">
                    <h5>Information</h5>
                    <ul>
                        <li>
                            <a href='#'>-About Us</a>
                        </li>
                        <li>
                            <a href='#'>-Privacy Policy</a>
                        </li>
                        <li>
                            <a href='#'>-Terms and Regulations</a>
                        </li>
                    </ul>
                </Col>
                <Col className=" d-flex flex-column align-items-center personal-class">
                    <h5>Help</h5>
                    <ul>
                        <li>
                            <a href='#'>-FAQ</a>
                        </li>
                        <li>
                            <a href='#'>-Shipping Info</a>
                        </li>
                    </ul>



                </Col>
                <Col className=" d-flex flex-column align-items-center personal-class">
                    <h5>Contact Us</h5>
                    <ul>
                        <li>
                            <a href='#'>-+39 123-456-7890</a>
                        </li>
                        <li>
                            <a href='#'>-Facebook</a>
                        </li>
                        <li>
                            <a href='#'>-Twitter</a>
                        </li>
                        <li>
                            <a href='#'>-Instagram</a>
                        </li>
                        <li>
                            <a href='#'>-LinkedIn</a>
                        </li>
                    </ul>





                </Col>
            </Row>
        </Container>
    )
}

export default Footer