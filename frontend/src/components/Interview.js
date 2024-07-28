import React, { useState } from 'react';
import './Interviewer.css';

const questionsData = [
    {
        level: 1,
        questions: [
            "What is decision making",
            "Why does term unethical hacking mean?",
            "What does the term mean"
        ]
    },
    {
        level: 2,
        questions: [
            "Describe a challenging situation you faced.",
            "How do you handle stress?",
            "Where do you see yourself in 5 years?"
        ]
    },
    // Add more levels and questions as needed
];

function Interview() {
    const [level, setLevel] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [response, setResponse] = useState('');
    const [feedback, setFeedback] = useState('');
    const [completed, setCompleted] = useState(false);

    const currentLevelData = questionsData.find(q => q.level === level);
    const questions = currentLevelData ? currentLevelData.questions : [];

    const handleInputChange = (e) => {
        setResponse(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFeedback(`Your answer: ${response}`);
        setResponse('');

        setTimeout(() => {
            setCurrentQuestionIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                if (newIndex >= questions.length) {
                    if (level >= questionsData.length) {
                        setCompleted(true);
                    } else {
                        setLevel(level + 1);
                        setCurrentQuestionIndex(0);
                    }
                } else {
                    setCurrentQuestionIndex(newIndex);
                }
            });
            setFeedback('');
        }, 1000);
    };

    return (
        <div className="App">
            {completed ? (
                <div>
                    <h1>Interview Completed</h1>
                    <p>Congratulations! You have completed all levels.</p>
                </div>
            ) : (
                <div>
                    <h1>Level {level} Interview</h1>
                    {questions.length > 0 && (
                        <div>
                            <p>{questions[currentQuestionIndex]}</p>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={response}
                                    onChange={handleInputChange}
                                    placeholder="Your answer..."
                                />
                                <button type="submit">Submit</button>
                            </form>
                            <p>{feedback}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Interview;
