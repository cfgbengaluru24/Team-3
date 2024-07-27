import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, IconButton, Collapse, Box, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Resources.css';

const Resources = () => {
    const [resources, setResources] = useState(['critical']);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/resources`);
                setResources(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // navigate('/login');
                }
            }
        };
        fetchResources();
    }, []);

    const handleExpandClick = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div className="resources-container">
            <h1>Resources</h1>
            {resources.map((resource, index) => (
                <Card key={index} className="resource-card">
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">{resource.title}</Typography>
                            <IconButton
                                onClick={() => handleExpandClick(index)}
                                aria-expanded={expanded === index}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="body2">{resource.description}</Typography>
                    </CardContent>
                    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography variant="h6">Related Resources</Typography>
                            <List>
                                {resource.content.map((item, i) => (
                                    <ListItem key={i} button component="a" href={item.link} target="_blank">
                                        <ListItemText primary={`${item.type}: ${item.name}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </div>
    );
};

export default Resources;
