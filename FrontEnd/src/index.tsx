import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import 'normalize.css';
import 'chartjs-adapter-date-fns';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  BarController,
  BarElement,
  TimeScale,
  CategoryScale,
  DoughnutController,
  ArcElement,
} from 'chart.js';
Chart.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Filler,
);

Chart.defaults.locale = 'en-US';
Chart.defaults.interaction.mode = 'index';
Chart.defaults.interaction.intersect = false;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
