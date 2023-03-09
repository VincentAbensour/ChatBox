import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmpassword, setConfirmpassword] = useState('');

let navigate = useNavigate()

let registerFunc = async (e) => {
    e.preventDefault()
    const data = {
        'email' : email,
        'password' : password,
        'username' : username,
    }
    if(password==confirmpassword){
        let response = await fetch(`http://127.0.0.1:8000/user/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(response.status === 201){
            navigate('/')
        }else{
            alert('User Already Exists')
        }
    }else{
        alert('Confirmation password is different from your password!')
    }
}

  return (
        <div className="log-page register">
            <h2 align="center">Register</h2>
                <form className="login-form" onSubmit={e => registerFunc(e)}>
                    <div>
                        <input
                            type="text"
                            className='log-input'
                            placeholder='Enter Username'
                            name="username"
                            onChange={e=>setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            className='log-input'
                            placeholder='Enter Email'
                            name="email"
                            onChange={e=>setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            className='log-input'
                            placeholder='Password'
                            name="password1"
                            onChange={e=>setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            className='log-input'
                            placeholder='Confirm Password'
                            name="password2"
                            onChange={e=>setConfirmpassword(e.target.value)}
                            value={confirmpassword}
                        />
                    </div>
                    <input className="submit-button" type="submit"/>
                </form>
        </div>
        )
}

export default RegisterPage