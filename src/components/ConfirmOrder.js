import React, { useEffect, useState } from "react";
import {Link}  from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "https://checkout.razorpay.com/v1/checkout.js";


export default function ConfirmOrder() {
  const [myCart, setMyCart] = useState(null);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  const startPayment = async () => {
        // 1. Create order
        const res = await fetch(`${process.env.REACT_APP_API_URL}/create-order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: total }),
        });

    const data = await res.json();
    console.log("received data from SB: ", data);
    if (!res.ok) {
      alert("Order creation failed: " + JSON.stringify(data));
      return;
    }

    // 2. Open Razorpay popup
    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: "My App",
      description: "Payment Test",
      order_id: data.orderId,

      handler: async function (response) {
        // 3. Verify payment using backend
        fetch("http://localhost:8080/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(response),
        })
          .then((resp) => {
            if (resp.ok) {
              console.log(JSON.stringify(resp.data));
              alert("Order Placed Successfully!");
              navigate("/");
            }
            else {
              alert("Payment Verification Failed!");
            }
            return resp.json();
          })
          .then((data) => console.log(data));
      },

      prefill: {
        name: userName,
        email: "test@example.com",
        contact: "9769094244",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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
        <button className="ms-2 btn btn-success" 
        onClick={startPayment}>Proceed to Pay</button>
      </div>
    </div>
  );
}

