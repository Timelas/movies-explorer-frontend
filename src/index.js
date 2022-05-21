import React from 'react';
// import ReactDOM from 'react-dom/client';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

reportWebVitals();
