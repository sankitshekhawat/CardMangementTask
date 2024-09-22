import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Bucket from './Bucket';
import Login from './LoginComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/buckets" element={<Bucket />} />
      </Routes>
    </Router>
  );
};

export default App;
