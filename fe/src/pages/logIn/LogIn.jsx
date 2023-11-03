import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Login.css'
import { useNavigate } from 'react-router-dom'


const LogIn = () => {

  const [logInData, setLoginData] = useState({})
  const [login, setLogin] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...logInData,
      [name]: value
    })
  }

  const LogInOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(logInData)
      })

      const data = await response.json()

      if (data.token) {
        setLogin(data)
        localStorage.setItem('token', JSON.stringify(data.token))
        console.log(data.token);

        navigate('/home')
      } else {
        setError('Login failed. Check your credentials.')
                    setTimeout(()=>{
                        setError(null)
                    }, 5000)
      }

    } catch (error) {
      console.log(error);
      setError('An error occurred while trying to log in.')
    }
  }

  return (

    <div id='body' style={{height:'100vh'}}>
      <form id='form'>
        <h1 style={{ color: "orange" }}>LogIn</h1>
        <label htmlFor="Email" style={{ color: "orange" }}>Email:</label>
        <input
          type='text'
          name='Email'
          required
          onChange={handleInputChange}>
        </input>
        <label htmlFor="Password" style={{ color: "orange" }}>Password:</label>
        <input
          type='password'
          name='Password'
          required
          onChange={handleInputChange}>
        </input>
        <button
          type='button'
          style={{ backgroundColor: "orange", marginTop:'15px'}}
          onClick={LogInOnClick}>
          Login
        </button>
        <div style={{marginTop: '15px'}}>
        <p style={{ color: "orange" }}>Not a User?
          <button
            type='button'
            style={{ backgroundColor: "orange", marginLeft:'15px'  }}
          >
            <Link to={'/users/create'} style={{ color: "black"}}>
              Sign In
            </Link>

          </button></p>

        </div>
        

      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LogIn