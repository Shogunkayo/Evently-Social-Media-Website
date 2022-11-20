import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"; 

import './stylesheets/home.css';
import './stylesheets/navbar.css';
import './stylesheets/explore.css';
import './stylesheets/signup.css';
import './stylesheets/create.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


