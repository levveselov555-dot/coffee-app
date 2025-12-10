import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import './analytics.js'; 

// Оптимизация: отложенная загрузка ненужных ресурсов
const loadAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    import('./analytics.js'); // Ленивая загрузка аналитики
  }
};

// Отложенная загрузка аналитики после загрузки страницы
if (document.readyState === 'complete') {
  loadAnalytics();
} else {
  window.addEventListener('load', loadAnalytics);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);