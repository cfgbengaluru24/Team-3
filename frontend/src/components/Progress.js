import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Progress = () => {
    useEffect(() => {
        const fetchProgress = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/progress`);
                console.log(response.data);
            }
            catch(error){
                if (error.response && error.response.status === 401) {
                    // navigate('/login');
                }
            }
        }
        fetchProgress();
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}


export default Progress;