import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserContextProvider } from './components/custom/contexts/useUserContext.jsx'

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
