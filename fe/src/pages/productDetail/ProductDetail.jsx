import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../../components/navbar/Navigation'

const ProductDetail = () => {

    const [productDetail, setProductDetail] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { articleId } = useParams()
    console.log(articleId);

    const GetDetails = async (articleId)=>{
        try {

        setIsLoading( true)
        const response = await fetch(`http://localhost:7077/article/byId/${articleId}`)

        const data = await response.json()
        console.log(data);

        setProductDetail(data)
        setIsLoading (false)

        } catch (e) {
            setError(e)
            console.log(e)
        }
    }

    useEffect(()=>{
        GetDetails(articleId);
    }, [articleId])

    return (
        <>
        <Navigation/>
        <div>
            {isLoading ? (
                <p>Caricamento in corso...</p>
            ) : error ? (
                <p>Si è verificato un errore: {error.message}</p>
            ) : (
                <div>
                    {productDetail?.article?.map((articles)=>(
                        <div>
                        <img src={articles.Img} alt={articles.Title} style={{ width: 500 }} />
                        <p>{articles.Title}</p>
                        </div>
                    ))}
                </div>
            )}                
        </div>
        </>
    )
}

export default ProductDetail