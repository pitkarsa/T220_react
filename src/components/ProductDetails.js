import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const location = useLocation();
  const receivedProduct = location.state;

  return (
    <div class="card">
      <div class="card-body">
        <div className="row">
          <div className="col-md-4">
            <img src={receivedProduct.imageUrl} alt="" height="200px"></img>
          </div>
          <div className="col-md-8">
            <h5 class="card-title">{receivedProduct.name}</h5>
            <h5>Category: {receivedProduct.category}</h5>
            <p class="card-text">{receivedProduct.description}</p>
            <h5>Price: Rs. {receivedProduct.price}</h5>
            <Link to={'/'} class="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
