import React from 'react';
import './TrainerEfficiency.css';

const trainers = [
  { name: 'Arun', session: 'Communication', rating: 4 },
  { name: 'Sandee', session: 'Critical Thinking', rating: 5 },
  { name: 'Avinash', session: 'Gender Sensitivity', rating: 3 },
  { name: 'Dinesh', session: 'Critical Thinking', rating: 5 },
  { name: 'Spriha', session: 'Ethics', rating: 4 }
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    );
  }
  return <div className="stars">{stars}</div>;
};

const TrainerEfficiency = () => {
  return (
    <div className="outer-box">
      <h2>Trainer Efficiency</h2>
      <div className="container">
        {trainers.map((trainer, index) => (
          <div className="box" key={index}>
            <h3>Trainer: {trainer.name}</h3>
            <p>Skill Proficiency: {trainer.session}</p>
            <StarRating rating={trainer.rating} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainerEfficiency;