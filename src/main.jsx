import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjust path if necessary

// Use ReactDOM.createRoot for React 18+
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App /> {/* App component includes the routing setup */}
  </React.StrictMode>
);