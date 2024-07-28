import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import homepageImage from '../assets/HomeImage.jpeg'; // Replace with the actual path to your image
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { name, username, password, email, phone, role };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData);
            console.log('Registration successful:', response.data);
            // Optionally, redirect to another page or show a success message
            navigate('/login'); // Example: redirect to login page
        } catch (error) {
            console.error('Error registering:', error);
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-body">
            <Container component="main" maxWidth="xs">
                <Box className="register-box" style={{ backgroundColor: '#EFE8E2', padding: '2rem', borderRadius: '8px' }}>
                    <Typography variant="h4" component="h1" align="center" className="register-heading">
                        Sign Up
                    </Typography>
                    <img src={homepageImage} alt="Homepage" className="register-background-image" />
                    <form className="register-form" onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
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
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="role"
                            label="Role"
                            name="role"
                            select
                            SelectProps={{
                                native: true,
                            }}
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                        >
                            <option value="">Select Role</option>
                            <option value="Trainer">Trainer</option>
                            <option value="Trainee">Trainee</option>
                        </TextField>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: '#47463E', marginTop: '1rem' }}
                        >
                            Sign Up
                        </Button>
                        {message && <Typography color="error" align="center" style={{ marginTop: '1rem' }}>{message}</Typography>}
                    </form>
                    <Box textAlign="center" marginTop="1rem">
                        Already have an account? <a href="/login">Login</a>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Register;
