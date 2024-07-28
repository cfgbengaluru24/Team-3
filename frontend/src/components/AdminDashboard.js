// Dashboard.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './AdminDashboard.css'; // Import CSS for styling

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Dashboard = () => {
  const barData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Number of users per level',
        data: [1, 5, 3, 4, 7],
        backgroundColor: '#4c8bf5',
      },
    ],
  };

  const pieData = {
    labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
    datasets: [
      {
        data: [10, 20, 30, 25, 15], // Example data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
        labels: {
          title: {
            font: {
              weight: 'bold',
            },
          },
        },
      },
    },
  };

  return (
    // <div className='dashboardPar'>
        <div className="dashboard" style={{maxWidth:'70%'}}>
      <h1>Admin Dashboard</h1>
      <div className="overview">
        <div className="overview-item">
          <p>Monthly active Users</p>
          <h2>300</h2>
        </div>
        <div className="overview-item">
          <p>Monthly Course Completion</p>
          <h2>700</h2>
        </div>
        <div className="overview-item">
          <p>Inactive Users Headcount</p>
          <h2>30</h2>
        </div>
      </div>
      <div className="statistics">
        <h2>Monthly Users Per Level</h2>
        <div className="statistics-content">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="statistics">
        <h2>Percentage of People Quitting Per Level</h2>
        <div className="statistics-content">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
 
  );
};

export default Dashboard;
