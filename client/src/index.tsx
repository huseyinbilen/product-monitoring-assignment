import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Homepage from './Homepage';
import Company from './Company';
import Product from './Product';
import Navbar from './Navbar';

function App(): JSX.Element {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" />
            )
          } />
        <Route path="/home" element={
            isLoggedIn ? (
              <Homepage />
            ) : (
              <Navigate to="/" />
            )
          } />
        <Route path="/companies" element={
            isLoggedIn ? (
              <Company />
            ) : (
              <Navigate to="/" />
            )
          } />
        <Route path="/products" element={
            isLoggedIn ? (
              <Product />
            ) : (
              <Navigate to="/" />
            )
          } />
      </Routes>
    </Router>
  );
}

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
