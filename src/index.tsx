import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('app');
if (!container) {
  throw new Error("No container found with id 'app'");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App name="StackBlitz" />
  </React.StrictMode>
);
