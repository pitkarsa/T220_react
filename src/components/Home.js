import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [allProducts, setAllProducts] = useState(null);
  const [direction, setDirection] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);  
  const [allCategories, setAllCategories] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    sarchProducts();
  },[direction, selectedCategory])

  function sarchProducts(){
    const params = new URLSearchParams();
    if(name){
      params.append("name",name);
    }
    if(selectedCategory!==""){
      params.append("category",selectedCategory);
    }
    if(maxPrice){
      params.append("maxPrice",maxPrice);
    }
    if(direction){
      params.append("sort",direction);
    }
    fetch(`${process.env.REACT_APP_API_URL}/search-products?${params.toString()}`)
    .then(resp => resp.json())
    .then(data => setAllProducts(data));
  }

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

    fetch(`${process.env.REACT_APP_API_URL}/categories`)
    .then(resp => resp.json())
    .then(data => setAllCategories(data));

  }, []);



  return (
    <>
    <div className="row m-2 ">
      <div className="col-md-2">
        <select className="form-select" 
        onChange={(event)=> setSelectedCategory(event.target.value)}>
          <option value="">All</option>
          {
            allCategories &&
            allCategories.map(categoryName => 
              <option value={categoryName} key={categoryName}>{categoryName}</option>
            )
          }
        </select>
      </div>
      <div className="col-md-2">
        <input type="text" placeholder="search by name" 
        onChange={(event)=> setName(event.target.value)}
        className="form-control"/>
      </div>
      <div className="col-md-2">
        <input type="text" placeholder="enter highest price" 
        onChange={(event)=>setMaxPrice(event.target.value)}
        className="form-control"/>
      </div>
      <div className="col-md-2">
        <button className="btn btn-link"
        onClick={()=>setDirection(direction==='asc'?'desc':'asc')}>
          {direction==='asc'?"High to Low":"Low to High"}
        </button>
      </div>
      <div className="col-md-1">
        <button className="btn btn-primary" onClick={sarchProducts}>
          Search
        </button>
      </div>
    </div>
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
            <button  className="btn btn-info"
            onClick={()=>navigate('/product-details',{state:product})}
            >
              Details
            </button>
             
          </div>
        </div>
      </div>
        )
      }      
    </div>
    </>
  );
}
