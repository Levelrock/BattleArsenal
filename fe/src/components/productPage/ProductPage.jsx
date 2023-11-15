import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import './ProductPage.css'
import { useSession } from '../../hooks/AuthSession';
import ResponsivePagination from 'react-responsive-pagination';

const ProductPage = ({ }) => {
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState([])
    const totalPages = 5
    const session = useSession()
    console.log(session.Role);

    const GetProduct = async () => {
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article?page=${currentPage}&pageSize=5`)
            const data = await response.json()
            console.log(data);

            setProduct(data)
            setIsLoading(false)


        } catch (error) {
            setError(error)
            console.log('error on getting product', error);
        }

    }

    const FiteredProduct = async () => {
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/articles/byTitle?Title=${search}`)
            const data = await response.json()
            console.log(data);

            setFiltered(data)
            setIsLoading(false)

        } catch (error) {
            setError(error)
            console.log('error on filtering product', error);
        }

    }

    const productToDisplay = search ? filtered?.articles : product?.article || []


    useEffect(() => {
        GetProduct();
        FiteredProduct()
    }, [currentPage, search])




    return (
        <div>
                    <div className='d-flex justify-content-end mx-4 my-3'>
                        <label htmlFor='search' style={{ textAlign: 'center', fontWeight: '700', color: 'orange' }}>Find your Weapon</label>
                        <input type="text" name='search' placeholder='search here' onChange={(e)=>setSearch(e.target.value)} value={search}/>
                    </div>
            {isLoading ? (
                <p>Caricamento in corso...</p>
            ) : error ? (
                <p>Si è verificato un errore: {error.message}</p>
            ) : (
                <div>
                    <table style={{ width: '100%' }} className='container-fluid table_box'>
                        <tr>
                            <th className='borderBottom3px borderRight3px borderBottom3px'>Product</th>
                            <th className='borderBottom3px borderRight3px'>Name</th>
                            <th className='borderBottom3px borderRight3px'> Description</th>
                            <th className='borderBottom3px borderRight3px'>Brand</th>
                            <th className='borderBottom3px'> Price</th>
                            <th className='borderBottom3px'></th>
                        </tr>
                        <tbody id='tablebody'>
                            {search ? productToDisplay?.map(articles => (
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
                            ))
                                : (product ? (product?.article?.map(articles => (
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
                                ))) : null)}
                        </tbody>
                    </table>
                </div>
            )}
            <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}

export default ProductPage



