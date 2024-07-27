import React, { useState } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../css/register.css';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import './Register.css';
import homepageImage from '../assets/HomeImage.png'; // Replace with the actual path to your image

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [dob, setDob] = useState('');
    const [role, setRole] = useState('');
    // const [specialization, setSpecialization] = useState('');
    // const [document, setDocument] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                name,
                username,
                password,
                email,
                phone,
                role
            });
            setMessage(response.data.message);
            // navigate('/login');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Registration failed');
        }
    };

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
        <div className='registerbody'>
            <div className="register-container">
                <div className="register-form-container">
                    <h2 className="register-title">Register</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            className="register-input"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            className="register-input"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className="register-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className="register-input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            className="register-input"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <select
                            name="role"
                            className="register-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Trainer">Trainer</option>
                            <option value="Trainee">Trainee</option>
                        </select>
                        <button type="submit" className="register-button">Register</button>
                    </form>
                    <div className="redir">
                        Already exist ?
                        <a href="/login">Login</a>
                    </div>
                    {message && <p className="register-message">{message}</p>}
                </div>
            </div>
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
    );
};

export default Register;

