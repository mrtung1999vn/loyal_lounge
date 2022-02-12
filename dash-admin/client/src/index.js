import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Provider as AlertProvider,
  useAlert,
  positions,
  transitions
} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const alertOptions = {
  offset: '25px',
  timeout: 5000,
  transition: transitions.SCALE
}
ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate}>
      <AlertProvider
        template={AlertTemplate}
        position={positions.TOP_RIGHT} //default position for all alerts without individual position
        {...alertOptions}
      >
        <App />
      </AlertProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
