import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import './signIn.css'

const SignIn = () => {

    const [SignInData, setSignInData] = useState({})
    const [SignIn, setSignIn] = useState([])
    const [error, setError] = useState(null)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    console.log(SignInData);
    console.log('questo è il file', file);


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



    const sendUser = async (e) => {
        e.preventDefault()
        if (file) {
            try {
                const uploadAvatar = await uploadFile(file);
                console.log('sono in uploadavatar', uploadAvatar);
                const finalBody = {
                    ...SignInData,
                    Avatar: uploadAvatar.Avatar
                }
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/signIn`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(finalBody)
                })
                const data = await response.json()
                setSignIn(data)
                navigate('/')
            } catch (error) {
                console.log('Error during creating User', error);
            }
        }
        console.log('sono in senduser', file);
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSignInData({
            ...SignInData,
            [name]: value
        })
    }


    const onChangeSetFiles = (e) => {
        setFile(e.target.files[0])
    }



    return (
        <div id='body' style={{ height: '100vh' }}>
            <form id='form' encType='multipart/form-data' onSubmit={sendUser}>
                <h1 style={{ color: "orange" }}>Sign In</h1>
                <label htmlFor="First Name" style={{ color: "orange" }}>First Name</label>
                <input
                    type='text'
                    name='FirstName'
                    onChange={handleInputChange}
                    required
                >
                </input>
                <label htmlFor="Last Name" style={{ color: "orange" }}>Last Name</label>
                <input
                    type='text'
                    name='LastName'
                    onChange={handleInputChange}
                    required
                >
                </input>
                <label htmlFor="Avatar" id='fileFieldInput'>Avatar</label>
                <input
                    type='file'
                    name='Avatar'
                    onChange={onChangeSetFiles}
                    required
                >
                </input>
                <label htmlFor="Email" style={{ color: "orange" }}>Email:</label>
                <input
                    type='text'
                    name='Email'
                    onChange={handleInputChange}
                    required
                >
                </input>
                <label htmlFor="Password" style={{ color: "orange" }}>Password:</label>
                <input
                    type='password'
                    name='Password'
                    onChange={handleInputChange}
                    required
                >
                </input>
                <button
                    type='submit'
                    style={{ backgroundColor: "orange" }}
                >
                    Sign In
                </button>
                <div style={{ marginTop: '15px' }}>
                    <p style={{ color: "orange" }}>Already a User?
                        <button
                            type='button'
                            style={{ backgroundColor: "orange" }}
                        >
                            <Link to={'/'} style={{ color: "black" }}>
                                Log In
                            </Link>

                        </button></p>

                </div>


            </form>
        </div>
    )
}

export default SignIn