import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Contact from './components/Contact';
import Progress from './components/Progress';
import RegisterTrainer from './components/TrainerReg';
import CampRegister from './components/CampRegsiter';
import Resources from './components/Resources';
import AssessmentTrainer from './components/TrainerAssessment';
import AssessmentTrainee from './components/TraineeAssessment';
import Check from './components/Check';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/registertrainer" element={<RegisterTrainer />} />
        <Route path="/campregister" element={<CampRegister />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/assessmenttrainer" element={<AssessmentTrainer />} />
        <Route path="/assessmenttrainee" element={<AssessmentTrainee />} />
        <Route path="/check" element={<Check />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
