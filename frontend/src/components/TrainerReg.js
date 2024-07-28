import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SessionForm.css';

const SessionForm = () => {
    const [sessionName, setSessionName] = useState('');
    const [campId, setCampId] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [trainerName, setTrainerName] = useState('');
    // const [sessionType, setSessionType] = useState('');
    const navigate = useNavigate();
    const [sessionDate, setSessionDate] = useState('');
    const [trainerEmail, setTrainerEmail] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/sessiontrack`, {
                    sessionName,
                    campId,
                    location,
                    time,
                    trainerName,
                    trainerEmail,
                    // sessionType,
                    sessionDate
                }, { withCredentials: true });
                console.log("Session Response:", response.data);
                if (response.status === 200) {
                    navigate('/home');
                } else {
                    console.log('Session failed');
                }
            } catch (error) {
                console.error('Error creating session:', error);
            }
    };

    return (
        <div className="session-form-container">
            <h1 className="session-heading">Create a New Session</h1>
            <form onSubmit={handleSubmit}>
                <div className="session-form-group">
                    <label className="session-label">Session Name:</label>
                    <input 
                        type="text" 
                        value={sessionName} 
                        onChange={(e) => setSessionName(e.target.value)} 
                        required 
                        className="session-input"
                    />
                </div>
                <div className="session-form-group">
                    <label className="session-label">Camp ID:</label>
                    <input 
                        type="text" 
                        value={campId} 
                        onChange={(e) => setCampId(e.target.value)} 
                        required 
                        className="session-input"
                    />
                </div>
                <div className="session-form-group">
                    <label className="session-label">Location:</label>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                        className="session-input"
                    />
                </div>
                <div className="session-form-group">
                    <label className="session-label">Time:</label>
                    <input 
                        type="time" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        required 
                        className="session-input"
                    />
                </div>
                <div className="session-form-group">
                    <label className="session-label">Trainer Name:</label>
                    <input 
                        type="text" 
                        value={trainerName} 
                        onChange={(e) => setTrainerName(e.target.value)} 
                        required 
                        className="session-input"
                    />
                </div>
                <div className="session-form-group">
                    <label className="session-label">Session Date:</label>
                    <input 
                        type="date" 
                        value={sessionDate} 
                        onChange={(e) => setSessionDate(e.target.value)} 
                        required 
                        className="session-input"
                    />
                </div>
                <div className="session-form-group">
                    <label className="session-label">Trainer Email:</label>
                    <input 
                        type="email" 
                        value={trainerEmail} 
                        onChange={(e) => setTrainerEmail(e.target.value)} 
                        required 
                        className="session-input"
                    />
                </div>
                {/* <div className="session-form-group">
                    <label className="session-label">Type of Session:</label>
                    <select 
                        value={sessionType} 
                        onChange={(e) => setSessionType(e.target.value)} 
                        required 
                        className="session-select"
                    >
                        <option value="">Select Type</option>
                        <option value="communication">Communication</option>
                        <option value="critical thinking">Critical Thinking</option>
                        <option value="ethics">Ethics</option>
                        <option value="gender sensitivity">Gender Sensitivity</option>
                    </select>
                </div> */}
                <button type="submit" className="session-button">Create Session</button>
            </form>
        </div>
    );
};

export default SessionForm;
