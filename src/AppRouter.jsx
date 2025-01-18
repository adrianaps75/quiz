import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Inicio from './components/Inicio';

const AppRouter = () => {
  return (
    <Router basename='/quiz'>
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/quizz" element={<App />} />
        </Routes>    
    </Router>
  )
}

export default AppRouter
