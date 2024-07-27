import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
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

    return (
        <AppBar position="fixed" className="nav-nav" style={{backgroundColor:'black', marginBottom:"20px"}}>
            <Toolbar className="nav-toolbar">
                <Typography variant="h6" component="div" className="nav-logo">
                    EXCPA
                </Typography>
                <Box className="nav-main_list">
                    <ul className="nav-navlinks">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Resources</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Become a Trainer</a></li>
                    </ul>
                </Box>
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
                    <MenuItem onClick={handleToggle}>
                    Contact Us</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
