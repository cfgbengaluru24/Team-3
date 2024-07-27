import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import './Register.css';
import homepageImage from '../assets/HomeImage.png'; // Replace with the actual path to your image

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData);
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="register-container">
            <img src={homepageImage} alt="Homepage" className="register-background-image" />
            <Container component="main" maxWidth="xs">
                <Box className="register-box" style={{backgroundColor:'#EFE8E2'}}>
                    <Typography variant="h4" component="h1" align="center" className="register-heading">
                        Sign Up
                    </Typography>
                    <form className="register-form" onSubmit={handleSubmit}>
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
                            onChange={handleChange}
                            value={formData.username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            value={formData.email}
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
                            onChange={handleChange}
                            value={formData.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="register-button"
                            style={{background:'#47463E'}}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default Register;
