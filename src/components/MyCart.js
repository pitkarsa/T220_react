import React, { useEffect, useState } from "react";
import {Link}  from 'react-router-dom';

export default function MyCart() {
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

  function updateQuantity(cartObj, event) {
    const newQuantity = event.target.value;
    const newCartObj = {
      quantity: newQuantity,
      user: `${process.env.REACT_APP_API_URL}/users/${userId}`,
      product: `${process.env.REACT_APP_API_URL}/products/${cartObj.product.id}`,
    };
    fetch(`${process.env.REACT_APP_API_URL}/carts/${cartObj.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(newCartObj),
    }).then((resp) => {
      console.log(resp);
      if (resp.ok) {
        // fetch the updated cart
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
      }
    });
  }

  function deleteCart(cartId) {
    const choice = window.confirm(
      "Do you really want to delete the Product from Cart?",
    );

    if (choice) {
      fetch(`${process.env.REACT_APP_API_URL}/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }).then((resp) => {
        console.log(resp);
        if (resp.ok) {
          alert("Product deleted successfully from your cart !!!");
          const updatedCart = myCart.filter((cart) => cart.id !== cartId);
          setMyCart(updatedCart);
        }
      });
    }
  }

  console.log(myCart);
  
  return (
    <div className="row">
      { myCart!==null && myCart.length >0 && 
      <>
      <div className="col-md-8 mt-2 border rounded p-3">
        <h2 className="bg-warning rounded text-center">Product Details</h2>
       {
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
                      Quantity:                     
                      <input
                        type="number"
                        min="1"
                        name="quantity"
                        value={cart.quantity}
                        onChange={(event) => updateQuantity(cart, event)}
                      />
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCart(cart.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="col-md-4 mt-2 border rounded p-3">
        <h2 className="bg-warning rounded text-center">Summary</h2>
        <h4>No of Products: {count}</h4>
        <h4>Total Price: {total}</h4>
        <Link className="btn btn-success" to={'/confirm-order'}>Confirm Order</Link>
      </div>
      </>
      }
      {
        (myCart===null || myCart.length===0) &&
        <div className="col-md-6 mx-auto mt-4 alert alert-info">
          Yourcart is empty, click <Link to={'/'}>here</Link> to shop !!
        </div>
      }
    </div>
  );
}
