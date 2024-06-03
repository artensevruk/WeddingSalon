import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Catalog } from './components/Catalog';
import { Registration } from './components/Regestration';
import { Logo } from './components/Logo';
import { Entrance } from './components/Entrance';
import { Basket } from './components/Basket';
import { SortCatalog } from './components/SortCatalog';
import { SliderMenu } from './components/Slider';
import { HomePage } from './components/HomePage';

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
            path: "registration",
            element: <Registration />,
          },
          {
            path: "catalog/:categoryId?/:subCategoryId?",
            element: <><SortCatalog /><Catalog /></>
          },
        {
          path: "basket",
          element: <Basket />
        },
          {
            path: "home",
            element: <> <Logo /><SliderMenu /><HomePage /> </> 
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

reportWebVitals();
