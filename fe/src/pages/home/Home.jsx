import React from 'react'
import Navigation from '../../components/navbar/Navigation'
import ProductPage from '../../components/productPage/ProductPage'
import Footer from '../../components/footer/Footer'
import { useSession } from '../../hooks/AuthSession'



const Home = () => {
    
    const session = useSession()
    console.log(session);

    return (
        <>
            <Navigation />
            <ProductPage />
            <Footer />
        </>
    )
}

export default Home