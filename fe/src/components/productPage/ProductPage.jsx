import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'



import './ProductPage.css'

const ProductPage = () => {
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const GetProduct = async () => {
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article`)
            const data = await response.json()
            console.log(data);

            setProduct(data)
            setIsLoading(false)


        } catch (error) {
            setError(error)
            console.log('error on getting product', error);
        }
    }

    useEffect(() => {
        GetProduct()
    }, [])

    return (
        <div>
            {isLoading ? (
                <p>Caricamento in corso...</p>
            ) : error ? (
                <p>Si è verificato un errore: {error.message}</p>
            ) : (
                <table style={{ width: '100%' }} className='container-fluid table_box'>
                    <tr>
                        <th className='borderBottom3px borderRight3px'>Product</th>
                        <th className='borderBottom3px borderRight3px'>Name</th>
                        <th className='borderBottom3px borderRight3px'> Description</th>
                        <th className='borderBottom3px borderRight3px'>Brand</th>
                        <th className='borderBottom3px'>Replica Price</th>
                        <th className='borderBottom3px'></th>

                    </tr>
                    <tbody id='tablebody'>
                        {product?.article?.map(articles => (
                            <tr key={articles._id} style={{ borderBottom: "3px solid gray" }}>
                                <td style={{ width: 250, borderRight: "1px solid gray" }}>
                                    <img src={articles.Img} alt={articles.Title} style={{ width: 200 }} />
                                </td>
                                <td style={{ borderRight: "1px solid gray" }}>{articles.Title}</td>
                                <td style={{ borderRight: "1px solid gray" }}>{articles.Description}</td>
                                <td style={{ borderRight: "1px solid gray" }}>{articles.Brand}</td>
                                <td>{articles.Price}€</td>
                                <td style={{ borderRight: "1px solid gray", textAlign: "center" }}>
                                    <Button style={{ backgroundColor: "orange", border: "1px solid black", color: "black", textDecoration: "none" }}>
                                        <Link to={`/article/byId/${articles._id}`}>
                                            More
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ProductPage



