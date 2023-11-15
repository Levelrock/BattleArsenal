import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../../components/navbar/Navigation'
import Footer from '../../components/footer/Footer'
import { useSession } from '../../hooks/AuthSession';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';




const Profile = () => {

  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const session = useSession()
  

  return (
    <>
    <Navigation/>
    <Container fluid>
      <Row>
        <Col sm={8}>
        <img src={session.Avatar} alt={session.FirstName} style={{width: '100%'}} />
        </Col>
        <Col sm={4}>
        <p>{session.FirstName}</p>
        <p>{session.LastName}</p>
        <p>{session.Email}</p>
        <p>{session.Role}</p>        
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  )
}

export default Profile