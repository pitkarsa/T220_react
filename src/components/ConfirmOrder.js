import React, { useEffect, useState } from "react";
import {Link}  from 'react-router-dom';

export default function ConfirmOrder() {
  const [myCart, setMyCart] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/myCart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data._embedded.carts);
        setMyCart(data._embedded.carts);
      });
  }, []);

  // summary - count and total calculation
  let total = 0;
  let count = 0;

  if (myCart) {
    count = myCart.length;
    for (let cart of myCart) {
      total += cart.product.price * cart.quantity;
    }
  }

  return (
    <div className="row">
      <div className="col-md-8 mt-2 border rounded p-3">
        <h2 className="bg-warning rounded text-center">Product Details</h2>
        {myCart &&
          myCart.map((cart) => (
            <div className="row" key={cart.id}>
              <div className="card mt-2 p-2">
                <div className="card-body row">
                  <div className="col-md-4">
                    <img
                      src={cart.product.imageUrl}
                      alt=""
                      height="200px"
                    ></img>
                  </div>
                  <div className="col-md-8">
                    <h5 className="card-title">{cart.product.name}</h5>
                    {/* <p className="card-text">
                      {cart.product.description}
                    </p> */}
                    <p>
                      <strong>Rs. {cart.product.price}</strong>
                    </p>
                    <p>
                      Quantity: {cart.quantity}
                    </p>                    
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="col-md-4 mt-2 border rounded p-3">
        <h2 className="bg-warning rounded text-center">Summary</h2>
        <h4>No of Products: {count}</h4>
        <h4>Total Price: {total}</h4>
        <Link className="btn btn-primary" to={'/mycart'}>Back</Link>
        <Link className="ms-2 btn btn-success" to={'/make-payment'}>Proceed to Pay</Link>
      </div>
    </div>
  );
}

