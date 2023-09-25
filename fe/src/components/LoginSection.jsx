import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInSession';
import SignInSession from './SignInSession';

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
        <>
            <Container className="d-flex flex-column align-items-center">
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

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>

                {userLoggedIn ? (
                    <Button
                        variant="danger"
                        className="mt-3"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                ) : (
                    <div className=' centration '>
                       <Button
                        variant="secondary"
                        className="mt-3"
                        onClick={handleLoginWithGithub}
                    >
                        Login with GitHub
                    </Button> 
                    <SignInSession />
                    </div>
                )}
            </Container>
            
        </>

    );
};

export default Login;


