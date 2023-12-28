import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import axios from 'axios';

function App() {    
  return (
      <>
      <Router>
          <Routes>
            <Route path='/' 
              element={<Home />} 
            />

            <Route path='/signin'
              element={<Login />}
            />

            <Route path='/signup'
              element={<SignUp />}
            />
          </Routes>
        </Router>        
      </>
  );
}

export default App;
