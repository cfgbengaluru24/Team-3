import React from 'react';
import '../App.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Navbar from './Navbar';

const preAssessmentData = {
  labels: ['Communication', 'Critical Thinking', 'Ethics', 'Gender Sensitivity'],
  datasets: [
    {
      label: 'Pre-Assessment Score',
      data: [1, 1, 1, 2],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const postAssessmentData = {
  labels: ['Communication', 'Critical Thinking', 'Ethics', 'Gender Sensitivity'],
  datasets: [
    {
      label: 'Post-Assessment Score',
      data: [3, 2, 3, 3],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
    },
  },
  animation: {
    duration: 0, // General animation time
  },
  hover: {
    animationDuration: 0, // Duration of animations when hovering an item
  },
  responsiveAnimationDuration: 0, // Animation duration after a resize
};

function Progress() {
  return (
    <div style={{ backgroundColor:'white'}}>
      <Navbar />
      <div className="App" style={{ marginTop: '90px', backgroundColor:'white' }}>
        <div className="assessment-section">
          <h2>Pre-Assessment Performance</h2>
          <div className="info-boxes">
            <div className="info-box">
              <h3>Current Level</h3>
              <p>1</p>
            </div>
            <div className="info-box">
              <h3>Total Hours Spent</h3>
              <p>2hrs</p>
            </div>
            <div className="info-box">
              <h3>Total Score</h3>
              <p>
                Communication: 1<br />
                Critical Thinking: 1<br />
                Ethics: 1<br />
                Gender Sensitivity: 2
              </p>
            </div>
          </div>
          <div className="chart-container">
            <Bar data={preAssessmentData} options={options} />
          </div>
        </div>

        <div className="assessment-section">
          <h2>Post-Assessment Performance</h2>
          <div className="info-boxes">
            <div className="info-box">
              <h3>Current Level</h3>
              <p>3</p>
            </div>
            <div className="info-box">
              <h3>Total Hours Spent</h3>
              <p>13hrs</p>
            </div>
            <div className="info-box">
              <h3>Total Score</h3>
              <p>
                Communication: 3<br />
                Critical Thinking: 2<br />
                Ethics: 3<br />
                Gender Sensitivity: 3
              </p>
            </div>
          </div>
          <div className="chart-container">
            <Bar data={postAssessmentData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
