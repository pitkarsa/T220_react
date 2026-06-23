import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [allProducts, setAllProducts] = useState(null);
  const userRoles = localStorage.getItem("userRoles");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/search-products`)
    .then(resp => {
      console.log(resp);      
      return resp.json()
    })
    .then(data => {
      console.log("Received data: ",data);
      setAllProducts(data);
      })
    .catch(err => console.log(err));
  }, []);

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
    <div className="row m-2">
      {
        allProducts && allProducts.map( product =>      
      <div className="col-md-3" key={product.id}>
        <div className="card" style={{"width": "100%"}}>
          <img src={product.imageUrl} 
          height="200px"  className="card-img-top" alt="..." />
          <div className="card-body">
            <h6 className="card-title">{product.name}</h6>
            <p>Category: {product.category}</p>
            <p className="card-text">
              {product.description.substr(0,80)}...
            </p>
            <h4>Rs. {product.price}</h4>
            <button href="#" className="btn btn-info"
            onClick={()=>navigate('/product-details',{state:product})}
            >
              Details
            </button>
             <button href="#" className="btn btn-warning ms-3"
             onClick={()=>addToCart(product.id)}>
              Add To Cart
            </button>
            { userRoles && userRoles.includes("ADMIN") &&
              <>
              <button className="btn btn-warning ms-2"
              onClick={()=>navigate('/update-product',{state:product})}
              >Update</button>
              <button className="btn btn-danger ms-2"
                onClick={() => deleteProduct(product.id, product.name)}
              >Delete</button>
            </>
            }
          </div>
        </div>
      </div>
        )
      }      
    </div>
  );
}
