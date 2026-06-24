import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const location = useLocation();
  const receivedProduct = location.state;
  const userRoles = localStorage.getItem("userRoles");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function deleteProduct(productId, productName){
      const choice = window.confirm("Do you really want to delete "+productName+ "?");
    if(choice){
      fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then(resp => {
        console.log(resp);        
        window.location.href='http://localhost:3000';
      })
    }
  }

  function addToCart(productId){
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const cartObj = {
      "user":`${process.env.REACT_APP_API_URL}/users/${userId}`,
      "product":`${process.env.REACT_APP_API_URL}/products/${productId}`
    }
    
    fetch(`${process.env.REACT_APP_API_URL}/carts`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify(cartObj)
    })
    .then(resp => {
      //console.log(resp);
      if(resp.ok)
        alert("Product added to cart !!!");
    });    
  }

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
            <div>
            { 
               userRoles && userRoles.includes("USER") &&
              <button  className="btn btn-warning ms-3"
             onClick={()=>addToCart(receivedProduct.id)}>
              Add To Cart
            </button>
            }
            { userRoles && userRoles.includes("ADMIN") &&
              <>
              <button className="btn btn-warning ms-2"
              onClick={()=>navigate('/update-product',{state:receivedProduct})}
              >Update</button>
              <button className="btn btn-danger ms-2"
                onClick={() => deleteProduct(receivedProduct.id, receivedProduct.name)}
              >Delete</button>
            </>
            }
            </div>
            <Link to={'/'} class="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
