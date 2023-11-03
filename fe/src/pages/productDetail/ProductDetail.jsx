import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../../components/navbar/Navigation'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../../components/footer/Footer';
import Button from 'react-bootstrap/Button';


const ProductDetail = () => {

    const [productDetail, setProductDetail] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { articleId } = useParams()
    console.log(articleId);

    const GetDetails = async (articleId) => {
        try {

            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article/byId/${articleId}`)
            

            const data = await response.json()
            console.log(data);

            setProductDetail(data)
            setIsLoading(false)

        } catch (e) {
            setError(e)
            console.log(e)
        }
    }

    useEffect(() => {
        GetDetails(articleId);
    }, [articleId])

    return (
        <>
            <Navigation />
            <div>
                {isLoading ? (
                    <p>Caricamento in corso...</p>
                ) : error ? (
                    <p>Si è verificato un errore: {error.message}</p>
                ) : (
                    <div>
                        {productDetail?.article?.map((articles) => (
                            <Container fluid>
                                <Row>
                                    <Col sm={8}><img src={articles.Img} alt={articles.Title} style={{width: "100%"}} /></Col>
                                    <Col sm={4}>
                                        <h1>{articles.Title}</h1>
                                        <p>{articles.Description}</p>
                                        <h5>Replica Price from {articles.Price}€</h5>
                                    </Col>
                                </Row>
                            </Container>
                        ))}
                    </div>                    
                )}
            </div>
            <Footer/>
        </>
    )
}

export default ProductDetail