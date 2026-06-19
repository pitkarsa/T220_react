import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import MyCart from './components/MyCart';
import ConfirmOrder from './components/ConfirmOrder';
import MyOrders from './components/MyOrders';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element : <Home />
      },
      {
        path:'login',
        element: <Login />
      },
      {
        path:'register',
        element: <Register />
      },
      {
        path:'add-product',
        element: <AddProduct />
      },
      {
        path:'mycart',
        element: <MyCart />
      },
      {
        path:'confirm-order',
        element: <ConfirmOrder />
      },
      {
        path:'myorders',
        element: <MyOrders />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
