import React, { useState } from 'react'
import Navigation from '../../components/navbar/Navigation'
import ProductPage from '../../components/productPage/ProductPage'
import Footer from '../../components/footer/Footer'
import { useSession } from '../../hooks/AuthSession'
import Jumbo from '../../components/Jumbotron/Jumbo'





const Home = () => {

        
    const session = useSession()
    console.log(session);

    return (
        <>
            <Navigation />
            <Jumbo/>
            <ProductPage />
            <Footer />
        </>
    )
}

export default Home