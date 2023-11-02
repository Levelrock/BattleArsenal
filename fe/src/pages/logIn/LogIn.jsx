import React, { useState } from 'react'

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

  const onSubmit = async (e) => {
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
      }else{
        setError('Login failed. Check your credentials.')
      }
      
    } catch (error) {
      console.log(error);
      setError('An error occurred while trying to log in.')
    }
  }

  return (
    
    <div>
      <form
        onSubmit={onSubmit}>
        <h1>LogIn</h1>
        <label for="Email">Email:</label>
        <input
          type='text'
          name='Email'
          required
          onChange={handleInputChange}>
        </input>
        <label for="Password">Password:</label>
        <input
          type='password'
          name='Password'
          required
          onChange={handleInputChange}>
        </input>
        <button
          type='submit'
          style={{ backgroundColor: "orange" }}>
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LogIn