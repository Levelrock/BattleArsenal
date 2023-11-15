import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../../components/navbar/Navigation'
import Footer from '../../components/footer/Footer'
import { useSession } from '../../hooks/AuthSession';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ModalTitle from 'react-bootstrap/ModalTitle'
import './profile.css'




const Profile = () => {

  const [customer, setCustomer] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const session = useSession()
  console.log('session', session.Id);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null)

  const [modalData, setModalData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Avatar: '',
  });
  console.log('modaleeee',modalData);



  const handleClose = () => setShow(false);
  const handleShow = () => {
    setModalData({
      FirstName: customer.FirstName,
      LastName: customer.LastName,
      Email: customer.Email,
      Avatar: customer.Avatar,
    });
    setShow(true);
  };


  const GetUser = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/byId/${session.Id}`)
      const data = await response.json()
      setCustomer(data.user)
      setIsLoading(false)
      console.log('user find successfully', data);
    } catch (error) {
      setError(error)
      console.log('error on getting user', error);
    }
  }

  const uploadFile = async (Avatar) => {
    const fileData = new FormData();
    fileData.append('Avatar', Avatar);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/cloudUpload`,
        {
          method: 'POST',
          body: fileData,
        }
      );
      const data = await response.json();
      console.log('data', data);
      return data;
    } catch (error) {
      setError(error);
      console.log(error);
      throw error;
    }
  }

  const editUser = async (e) => {
    e.preventDefault()
    if (file) {
      try {
        const uploadAvatar = await uploadFile(file);
        console.log('sono in uploadavatar', uploadAvatar);
        const finalBody = {
          ...modalData,
          Avatar: uploadAvatar.Avatar
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/edit/${session.Id}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
          body: JSON.stringify(finalBody)
        })
        const data = await response.json()
        setModalData(data)
      } catch (error) {
        console.log('Error during editing User', error);
      }
    }

    handleClose()
    console.log('aasdasdfad', file);
    window.location.reload()
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setModalData({
      ...modalData,
      [name]: value
    })
  }

  const onChangeSetFiles = (e) => {
    setFile(e.target.files[0])
  }


  useEffect(() => {
    GetUser()
  }, [])



  return (
    <>
      <Navigation />
      <Container fluid>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An Error Occured: {error.message}</p>
        ) : (
          <Row>
            <Col sm={4} className='AvatarCol'>
              <img src={customer.Avatar} alt={customer.FirstName} style={{ width: '100%' }} />
            </Col>
            <Col sm={8} className='DataCol'>
              <Row>
                <Col>                
              <h3>{customer.FirstName}</h3>
              <h3>{customer.LastName}</h3>
              <h3>{customer.Email}</h3>
              <h3>{customer.Role}</h3>
              <h3>{customer._id}</h3>
                </Col>
              </Row>
              <Row> 
                <Col>
                  <Button onClick={handleShow} variant='warning' style={{width:'60%', marginTop:'100px'} }>Edit</Button>             
                </Col>               
              </Row>
              <Row>
                <Col sm={4}>                
                <img src="" alt="" />
                </Col>
              </Row>
            </Col>
          </Row>
        )}

      </Container>
      <Footer />



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name='FirstName'
              onChange={handleInputChange}
              value={modalData.FirstName}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name='LastName'
              onChange={handleInputChange}
              value={modalData.LastName}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name='Email'
              onChange={handleInputChange}
              value={modalData.Email}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Avatar (Always required)</Form.Label>
            <Form.Control
              type="file"
              name='Avatar'
              onChange={onChangeSetFiles}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile