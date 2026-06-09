import React, { useEffect, useState } from "react";

export default function Home() {
  const [allProducts, setAllProducts] = useState(null);
  
  useEffect(()=>{
    fetch(`http://localhost:8080/search-products`)
    .then(resp => resp.json())
    .then(data => {
      console.log("Received data: ",data);
      setAllProducts(data);
      })
    .catch(err => console.log(err));
  }, []);


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
            <a href="#" className="btn btn-info">
              Details
            </a>
          </div>
        </div>
      </div>
        )
      }      
    </div>
  );
}
