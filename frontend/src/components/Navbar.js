import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggle = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logged out');
    };

    return (
        <AppBar position="fixed" className="nav-nav" style={{ backgroundColor: 'black', marginBottom: "20px" }}>
            <Toolbar className="nav-toolbar">
                <Typography variant="h6" component="div" className="nav-logo">
                    EXPA
                </Typography>
            
                <Box className="nav-main_list">
                    <ul className="nav-navlinks">
<<<<<<< HEAD
                        <li><a href="/about">About</a></li>
                        <li><a href="/resources">Resources</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/">Become a Trainer</a></li>
=======
                        <li><a href="\about">About</a></li>
                        <li><a href="\resources">Resources</a></li>
                        <li><a href="\contact">Contact Us</a></li>
                        <li><a href="\registertrainer">Add Session</a></li>
                        <li><a href="\interview">Assess</a></li>
>>>>>>> a5362bc3c8e2ea98be921d1cd9d70003a3a76a01
                    </ul>
                </Box>
                <Button color="inherit" onClick={handleLogout} className="nav-logout">
                    Logout
                </Button>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                    className="nav-navTrigger"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    className="nav-menu"
                >
                    <MenuItem onClick={handleToggle}>About</MenuItem>
                    <MenuItem onClick={handleToggle}>Resources</MenuItem>
                    <MenuItem onClick={handleToggle}>Contact Us</MenuItem>
                    <MenuItem onClick={handleToggle}>Become a Trainer</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
