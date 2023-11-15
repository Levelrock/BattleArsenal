import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../../components/navbar/Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import { useSession } from '../../hooks/AuthSession';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Jumbo from '../../components/Jumbotron/Jumbo'
import './productDetails.css'

const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { articleId } = useParams();
    const session = useSession();
    const navigate = useNavigate();

    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [editedBrand, setEditedBrand] = useState('');
    const [editedImg, setEditedImg] = useState('');

    const GetDetails = async (articleId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article/byId/${articleId}`);
            const data = await response.json();

            setEditedTitle(data?.article[0]?.Title || '');
            setEditedDescription(data?.article[0]?.Description || '');
            setEditedPrice(data?.article[0]?.Price || '');
            setEditedBrand(data?.article[0]?.Brand || '')
            setEditedImg(data?.article[0]?.Img || '')
            setProductDetail(data);
            setIsLoading(false);
        } catch (e) {
            setError(e);
            console.log(e);
        }
    };

    useEffect(() => {
        GetDetails(articleId);
    }, [articleId]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article/edit/${articleId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Title: editedTitle,
                    Description: editedDescription,
                    Price: editedPrice,
                    Brand: editedBrand,
                    Img: editedImg,
                    
                }),
            });

            if (response.ok) {
                closeModal(); 
                GetDetails(articleId);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteProduct = async () => {
        const confirm = window.confirm('Are you sure you want to delete this product?')
        if (confirm) {            
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article/delete/${articleId}`,{
                    method: 'DELETE',
                })
                if (response.ok) {
                    navigate('/home')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Navigation />
            <Jumbo/>
            <div className='main'>
                {isLoading ? (
                    <p>Caricamento in corso...</p>
                ) : error ? (
                    <p>Si è verificato un errore: {error.message}</p>
                ) : (
                    <div>
                        {productDetail?.article?.map((articles) => (
                            <Container fluid key={articles._id}>
                                <Row className='rowClass'>
                                    <Col sm={8}>
                                        <img src={articles.Img} alt={articles.Title} className='imgClass' />
                                    </Col>
                                    <Col sm={4}>
                                        <h1>{articles.Title}</h1>
                                        <p>{articles.Description}</p>
                                        <h5> Price from {articles.Price}€</h5>
                                        <h5>
                                            Want to buy?
                                            <span>
                                                <Link to={'/ContactUs'} style={{ color: 'orange' }}>
                                                    Contact Us
                                                </Link>
                                            </span>
                                        </h5>
                                    </Col>
                                </Row>
                                <Row>
                                    {session.Role === 'admin' && (
                                        <>
                                            <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
                                            <Button variant='warning' onClick={handleDeleteProduct}>Delete</Button>
                                        </>
                                    )}
                                </Row>
                            </Container>
                        ))}
                    </div>
                )}
            </div>

            <Footer />

            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditProduct}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedBrand}
                                onChange={(e) => setEditedBrand(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>img</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedImg}
                                onChange={(e) => setEditedImg(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProductDetail;
