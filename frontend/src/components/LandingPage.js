import React, {useEffect, useState} from 'react';
import axios from 'axios';
import HomeImage from '../assets/HomeImage.jpeg';
import './LandingPage.css'
import Navbar from './Navbar';
const LandingPage = () => {
    useEffect(() => {
        const fetchLandingpage = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
                console.log(response.data);
            }
            catch(error){
                if (error.response && error.response.status === 401) {
                    // navigate('/login');
                }
            }
        }
        fetchLandingpage();
    }, []);
    return (
       <div>
        <Navbar/>
        
         <div className="home-container" style={{padding: '20px', fontSize:'1.5rem'}}>
            <div className="home-content">
                <h1>EXPA India</h1>
                <p>
                EXPA (NCC Exchange Participants Association of India) is a Society registered under the Karnataka Societies Registration Act, 1960, in Bangalore, Karnataka.
EXPA’s members are NCC cadets who have traveled abroad on the NCC Youth Exchange Program, whereby selected cadets participate in a country-to-country exchange of cadets belonging to youth organizations of friendly countries. The YEP, in place since 1979, has included an estimated 5,000 cadets over the years.
<br/>

                </p>
                <button className="test-button">Become a Trainer!</button>
            </div>
            <div className="home-image">
                <img src={HomeImage} alt="Home" />
            </div>
        </div>
       </div>
    )
}


export default LandingPage;