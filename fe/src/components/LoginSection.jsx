import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInSession';
import SignInSession from './SignInSession';
import '../CSS/globalCss.css';

const Login = () => {
    const [loginFormData, setLoginFormData] = useState({});
    const navigate = useNavigate();
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:6969/login', loginFormData);
            localStorage.setItem('userLoggedIn', JSON.stringify(response.data.token));
            navigate('/account');
        } catch (error) {
            console.error('Login failed', error);
            // Handle login error here
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userLoggedIn');
        navigate('/');
    };

    const handleLoginWithGithub = () => {
        window.location.href = 'http://localhost:6969/auth/github';
    };

    return (
        <div className='login-section'>
            <Container className="container-login">
                <h2>Login</h2>
                <Form onSubmit={handleLogin} className="w-50">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <button className='button-login' type="submit">
                        <span>Login</span>
                    </button>
                </Form>

                {userLoggedIn ? (
                    <button
                        className='button-logout'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <div className=' centration '>
                       <button className='button-login-git'
                        onClick={handleLoginWithGithub}
                    >
                        Login with GitHub
                    </button> 
                    <SignInSession />
                    </div>
                )}
            </Container>
            
        </div>

    );
};

export default Login;


