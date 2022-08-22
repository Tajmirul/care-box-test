import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { DataProvider } from './context';
import './css/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Router>
        <DataProvider>
            <App />
        </DataProvider>
    </Router>
    // </React.StrictMode>
);
