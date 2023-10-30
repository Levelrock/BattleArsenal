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
            const response = await fetch('http://localhost:7077/article')
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
                <table style={{ width: '100%' }}>
                    <tr>
                        <th className='borderBottom3px borderRight3px'>Product</th>
                        <th className='borderBottom3px borderRight3px'>Name</th>
                        <th className='borderBottom3px borderRight3px'> Brand</th>
                        <th className='borderBottom3px borderRight3px'>Description</th>
                        <th className='borderBottom3px'>Price</th>
                        <th className='borderBottom3px'></th>

                    </tr>
                    <tbody>
                        {product?.article?.map(articles => (
                            <tr key={articles._id}>
                                <td style={{ width: 250, borderRight: "1px solid gray" }}>
                                    <img src={articles.Img} alt={articles.Title} style={{ width: 200 }} />
                                </td>
                                <td style={{ borderRight: "1px solid gray" }}>{articles.Title}</td>
                                <td style={{ borderRight: "1px solid gray" }}>{articles.Description}</td>
                                <td style={{ borderRight: "1px solid gray" }}>{articles.Brand}</td>
                                <td>{articles.Price}€</td>
                                <td style={{ borderRight: "1px solid gray", textAlign: "center" }}>
                                    <Button style={{ backgroundColor: "orange", margin: "1px solid black", color: "black", }}>
                                        <Link to={`/article/byId/${articles._id}`}>                                        
                                        See More
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