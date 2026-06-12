import React, { useEffect, useState } from "react";

export default function Home() {
  const [allProducts, setAllProducts] = useState(null);
  
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
        method:"DELETE"
      })
      .then(resp => {
        console.log(resp);
        
        window.location.href='http://localhost:3000';
      })
    }
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
            <a href="#" className="btn btn-info">
              Details
            </a>
            <button className="btn btn-warning ms-2"
              
            >Update</button>
            <button className="btn btn-danger ms-2"
              onClick={() => deleteProduct(product.id, product.name)}
            >Delete</button>
          </div>
        </div>
      </div>
        )
      }      
    </div>
  );
}
