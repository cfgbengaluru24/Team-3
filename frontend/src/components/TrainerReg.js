import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Trainerreg = () => {
    useEffect(() => {
        const fetchTrainerReg = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/trainerreg`);
                console.log(response.data);
            }
            catch(error){
                if (error.response && error.response.status === 401) {
                    // navigate('/login');
                }
            }
        }
        fetchTrainerReg();
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}


export default Trainerreg;