import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username,
                password
            }, { withCredentials: true });
            console.log("Login Response:", response.data);
            if (response.status === 200) {
                setMessage('');
                // Perform login action (e.g., store user data, redirect)
                navigate('/home');
            } else {
                setMessage('Login failed');
            }
        } catch (error) {
            setMessage('Login failed');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='login-body'>
            <div className='login-image'></div>
            <Container component="main" maxWidth="xs">
                <Box className="login-box">
                    <Typography variant="h4" component="h1" align="center" className="login-heading">
                        Login
                    </Typography>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="login-button"
                        >
                            Login
                        </Button>
                        {message && <Typography color="error" align="center" className="login-message">{message}</Typography>}
                    </form>
                    <Box textAlign="center" marginTop="1rem">
                        If new user? <a href="/register">Sign Up</a>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
