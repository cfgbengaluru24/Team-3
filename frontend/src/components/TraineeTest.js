import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import './TraineeTest.css';
import Navbar from './Navbar';

const levels = [
    { level: 1, content: `Welcome to Level 1: Let's get those neurons firing!` },
    { level: 2, content: `Level 2: Stepping it up a notch—you're doing great!` },
    { level: 3, content: `Level 3: Things are heating up, ready for a challenge?` },
    { level: 4, content: `Level 4: You're in the zone now, keep pushing forward!` },
    { level: 5, content: `Level 5: This is it—the ultimate test of your skills!` }
];

const TraineeTest = () => {
    const [expandedLevel, setExpandedLevel] = useState(null);

    const toggleExpand = (level) => {
        setExpandedLevel(expandedLevel === level ? null : level);
    };

    return (
        <div>
            <Navbar />
            <div className="trainee-test-box" style={{ marginTop: '70px' }}>
                <h2>Trainee Test</h2>
                {levels.map((item) => (
                    <div key={item.level} className="card" onClick={() => toggleExpand(item.level)}>
                        <div className="card-title">
                            {item.level > 2 && <LockIcon style={{ marginRight: '8px' }} />}
                            Level {item.level}
                            <span className={expandedLevel === item.level ? 'normal-triangle' : 'inverted-triangle'}>
                                {expandedLevel === item.level ? '▲' : '▼'}
                            </span>
                        </div>
                        <div className={`card-content ${expandedLevel === item.level ? 'active' : ''}`}>
                            <p>{item.content}</p>
                            <button className="take-test-button">Take Test</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TraineeTest;
