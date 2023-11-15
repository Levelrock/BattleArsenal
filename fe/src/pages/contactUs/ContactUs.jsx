import React from 'react'
import Footer from '../../components/footer/Footer'
import Navigation from '../../components/navbar/Navigation'

import './contactUs.css'



const ContactUs = () => {
    return (
        <>
        <Navigation/>
        <div id='Contact'>
            <h1>Contact Us</h1>
            <p>
                Do you have any questions or inquiries? Please feel free to get in touch with us.
            </p>
            <div>
                <h2>Contact Information:</h2>
                <p>Email: info@example.com</p>
                <p>Phone: +39-123-456-7890</p>
                <p>Address: 123 Main Street, City, Country</p>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default ContactUs