import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Navigation.css';
import BA from '../../assets/BA.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../../hooks/AuthSession';


const Navigation = () => {
    const session = useSession();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null)
    console.log('questo è il file', file);
    const [error, setError] = useState(null)
    const [newArticle, setNewArticle] = useState({
        Title: '',
        Brand: '',
        Description: '',
        Price: '',
        Author: session.Id,
    });

    console.log('newArticle', newArticle);


    const OpenModal = () => {
        setIsModalOpen(true);
    };

    const CloseModal = () => {
        setIsModalOpen(false);
    };

    const uploadFile = async (Img) => {
        const fileData = new FormData();
        fileData.append('Img', Img);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_BASE_URL}/article/cloudUpload`,
                {
                    method: 'POST',
                    body: fileData,
                }
            );
            return response.json();
        } catch (error) {
            setError(error);
            console.log(error);
            throw error;
        }
    }

    const AddArticle = async (e) => {
        e.preventDefault()

        if (file) {
            try {
                const uploadImg = await uploadFile(file);
                console.log('uploadImg', uploadImg);

                console.log('sono in uploadImg', uploadImg);
                const finalBody = {
                    ...newArticle,
                    Img: uploadImg.Img
                }

                console.log('finalBody', finalBody);

                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalBody),
                });
    
                if (response.ok) {
                    console.log('Item added successfully');
                }
            } catch (error) {
                console.error(error);
            }
            
        }
        CloseModal();
        window.location.reload();
        
    };

    const logOut = () => {
        const confirmLogOut = window.confirm('Are you sure to LogOut?');
        if (confirmLogOut) {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    console.log('role navbar', session && session.Id);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({
            ...newArticle,
            [name]: value,
        });
    };

    const onChangeSetFiles = (e) => {
        setFile(e.target.files[0])        
        //console.log('selected file', e.target.files[0]);
    } 



    return (
        <Navbar expand="lg" className="bg-dark" variant="dark">
            <Container fluid className="d-flex ">
                <Navbar.Brand href="/home" style={{ color: "orange", fontWeight: 700, fontSize: "larger" }}>
                    <img src={BA} alt="Logo" style={{ width: 50, marginRight: '10px' }} />
                    <Link to={'/home'} style={{ color: "orange", textDecoration: "none" }}>
                        Battle Arsenal
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Row className="justify-content-center">
                    <Col>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" style={{ color: 'orange' }}>
                                <Link to={`/user/byId/${session.Email}`} style={{ color: 'orange', paddingTop:'7px'}}>
                                My Profile                                
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col xs="auto">
                        <Form align="end">
                            <Row>
                                <Col>
                                    {session.Role === 'admin' && (
                                        <Button onClick={OpenModal}>Add</Button>
                                    )}
                                </Col>
                                <Col>
                                    <Button
                                        style={{ backgroundColor: "orange", border: "1px solid black" }}
                                        variant="dark"
                                        onClick={() => logOut()}
                                    >
                                        LogOut
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Modal show={isModalOpen} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={AddArticle} encType='multipart/form-data'>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="Title"                                
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Img</Form.Label>
                            <Form.Control
                                type="file"
                                name="Img"
                                onChange={onChangeSetFiles}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                name="Brand"                                
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="Description"                                
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="Price"                                
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    <Button variant="primary" type='submit'>
                        Save
                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
};

export default Navigation;
