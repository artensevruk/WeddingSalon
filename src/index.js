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


const router = createBrowserRouter(
  [
  {
      path: "/",
      element: <App />,
      children: [
        {
          path: "registration",
          element: <Registration />,
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


  const router2 = createBrowserRouter(
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
            path: "",
            element: <> <Logo /><Catalog /> </> 
          },
        ],
      },
      
    ]);
  

    const root2 = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router2} />
    </React.StrictMode>
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
