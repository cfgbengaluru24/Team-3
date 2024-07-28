import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Interview = () => {
    const [level, setLevel] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [response, setResponse] = useState('');
    const [feedback, setFeedback] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleInputChange = (e) => {
        setResponse(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentQuestion = questions[currentQuestionIndex];
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/interview/response`, 
                { question: currentQuestion, response }, { withCredentials: true });
            setFeedback(res.data.feedback);
            setResponse('');

            if (res.data.passed) {
                setCurrentQuestionIndex((prevIndex) => {
                    const newIndex = prevIndex + 1;
                    if (newIndex >= questions.length) {
                        // Fetch new questions for the next level
                        fetchQuestions();
                        setLevel((prevLevel) => prevLevel + 1);
                        if (level >= 5) {
                            setCompleted(true);
                        }
                        return 0; // Reset question index for new level
                    } else {
                        return newIndex;
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchQuestions = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/interview/questions`, 
                { withCredentials: true });
            setQuestions(res.data.questions);
            setCurrentQuestionIndex(0); // Reset question index for new set of questions
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [level]);

    return (
        <div>
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
};

export default Interview;
