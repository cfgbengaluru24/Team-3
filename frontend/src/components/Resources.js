import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Resources = () => {
    useEffect(() => {
        const fetchResources = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/resources`);
                console.log(response.data);
            }
            catch(error){
                if (error.response && error.response.status === 401) {
                    // navigate('/login');
                }
            }
        }
        fetchResources();
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}


export default Resources;