import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Homepage from './Homepage';
import Company from './Company';
import Product from './Product';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/home" Component={Homepage} />
      <Route path="/companies" Component={Company} />
      <Route path="/products" Component={Product} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
