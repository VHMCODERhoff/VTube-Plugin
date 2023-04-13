import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Auth/login'
import Home from './pages/Home/dashboard'
import Tutorial from './pages/Tutorial/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/dashboard/tutorial" element={<Tutorial />} />
    </Routes>
  </Router>
  );