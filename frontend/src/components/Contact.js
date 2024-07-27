import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Link, Checkbox, FormControlLabel } from '@mui/material';
import './Contact.css';
import Navbar from './Navbar'
const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        subject: '',
        message: '',
        consent: false,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, formData);
            console.log('Form submission successful:', response.data);
            setMessage('Thank you for contacting us. We will get back to you soon.');
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Form submission failed. Please try again.');
        }
    };

    return (
       <div>
        <Navbar/>
        <Container className="contact-container" style={{maxWidth:"50%", marginTop:"50px"}}>
            <Typography variant="h4" component="h1" className="contact-heading">
            </Typography>
            <Box className="contact-section">
                <Typography variant="h6" component="h2">
                    Get In Touch
                </Typography>
                <Typography variant="body1">
                    Request For Training
                    <br />
                    If you are an NCC Officer, or an ANO, you can reach out to us for a training here
                    <br />
                    <Link href="mailto:info@cadetprogram.org" className="contact-link">info@cadetprogram.org</Link>
                </Typography>
            </Box>
            <Box className="contact-section">
                <Typography variant="h6" component="h2">
                    Become a Trainer
                </Typography>
                <Typography variant="body1">
                    If you are an ex-NCC cadet looking to join us as a trainer, click on the link below.
                    <br />
                    <Link href="/trainer-application" className="contact-link">Trainer Application Form</Link>
                </Typography>
            </Box>
            <Box className="contact-section">
                <Typography variant="h6" component="h2">
                    FAQs
                </Typography>
                <Typography variant="body1">
                    Have a question? Read our FAQs to get your answers or reach out to us directly.
                    <br />
                    <Link href="/faqs" className="contact-link">Queries and FAQs</Link>
                </Typography>
            </Box>
            <Box className="contact-section">
                <Typography variant="h6" component="h2">
                    Leave us your info and we will get back to you.
                </Typography>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="name"
                        autoFocus
                        onChange={handleChange}
                        value={formData.fullName}
                        className="contact-input"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="contact-input"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="mobileNumber"
                        label="Mobile Number"
                        name="mobileNumber"
                        autoComplete="tel"
                        onChange={handleChange}
                        value={formData.mobileNumber}
                        className="contact-input"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
                        onChange={handleChange}
                        value={formData.subject}
                        className="contact-input"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="message"
                        label="Please enter your message"
                        name="message"
                        multiline
                        rows={4}
                        onChange={handleChange}
                        value={formData.message}
                        className="contact-input"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                color="primary"
                            />
                        }
                        label="I consent to the conditions."
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="contact-button"
                        style={{backgroundColor:"#47463E  "}}
                    >
                        Submit
                    </Button>
                    {message && <Typography color="error" align="center" style={{ marginTop: '1rem' }}>{message}</Typography>}
                </form>
            </Box>
        </Container>
       </div>
    );
};

export default Contact;
