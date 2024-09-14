import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Create root for concurrent mode

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);