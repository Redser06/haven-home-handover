import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { demoData } from './fixtures/demoData';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App {...demoData} />
    </React.StrictMode>
  );
}
