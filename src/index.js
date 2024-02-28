import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Registration } from './components/Regestration';
import { Catalog } from './components/Catalog';
import { Logo } from './components/Logo';
import { Entrance } from './components/Entrance';
import { Basket } from './components/Basket';




  const router = createBrowserRouter(
    [
    {
        path: "/",
        element: <App />,
        children: [
          {
            path: "entrance",
            element: <Entrance />,
          },
        {
          path: "basket",
          element: <Basket />
        },
          {
            path: "",
            element: <> <Logo /><Catalog /> </> 
          },
        ],
      },
      
    ]);
  

    const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
