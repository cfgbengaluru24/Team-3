import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../css/assessment.css'; // Create a CSS file for Assessment styling

const PostAssessment = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch initial questions
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/postassessment`, { sessionName: 'ethics' }, { withCredentials: true });
            setQuestions(res.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching question', error);
            setLoading(false);
        }
    };

    const handleResponseChange = (e) => {
        const updatedResponses = [...responses];
        updatedResponses[currentQuestionIndex] = e.target.value;
        setResponses(updatedResponses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Proceed to next question or end assessment
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Submit final responses
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/submit_postassessment`, { responses }, { withCredentials: true });
                console.log('Assessment submitted successfully', res.data);
            } catch (error) {
                console.error('Error submitting assessment', error);
            }
        }
    };

    return (
        <div className="assessment-container">
            <h1 className="assessment-title">Post-Assessment</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="assessment-form">
                    <div className="question-container">
                        <p className="question-text">{questions[currentQuestionIndex]?.question}</p>
                        <textarea
                            value={responses[currentQuestionIndex] || ''}
                            onChange={handleResponseChange}
                            placeholder="Type your response here..."
                            className="response-input"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default PostAssessment;