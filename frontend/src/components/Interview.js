import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssessmentTrainee = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [nextQuestion, setNextQuestion] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/interview/questions', { withCredentials: true })
      .then(response => {
        setQuestions(response.data.questions);
        setCurrentQuestionIndex(0);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    axios.post(`${process.env.REACT_APP_API_URL}/interview/response`, {
      question: currentQuestion,
      response: response
    }, { withCredentials: true })
      .then(response => {
        setFeedback(response.data.feedback);
        setNextQuestion(response.data.next_question);
      })
      .catch(error => {
        console.error('Error submitting response:', error);
      });
  };

  return (
    <div>
      <h2>Assessment Trainee</h2>
      {questions.length > 0 && (
        <div>
          <p>{questions[currentQuestionIndex]}</p>
          <input
            type="text"
            value={response}
            onChange={e => setResponse(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <p>{feedback}</p>
          {nextQuestion && (
            <button onClick={() => {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setFeedback('');
              setNextQuestion(null);
            }}>
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentTrainee;
