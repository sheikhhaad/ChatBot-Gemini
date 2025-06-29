import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './Layout';
import Home from './Pages/Home';
import Bot from './Pages/Bot';
import Layout from './Layout';

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'bot',
        element: <Bot />,
      },
    ],
  },
]);

// Render to DOM
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
