import React from 'react'
import {useLocation} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 

export default function UpdateProduct() {
    const token = localStorage.getItem("token");
  
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);
    const receivedProduct = location.state;

      const {register, handleSubmit } = useForm({
        defaultValues:receivedProduct
    });

    function update(formData){
        // send the fetch request
        fetch(`${process.env.REACT_APP_API_URL}/products/${receivedProduct.id}`,{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            method:"PUT",
            body:JSON.stringify(formData)
        })
        .then(resp=> {
            if(resp.ok){
                alert("product updtaed successfully!!");
                navigate("/");
            }
        })
    }
    
  return (
     <div className='col-md-3 mt-2 p-3 mx-auto rounded shadow'>
        <form onSubmit={handleSubmit(update)}>
            <h2>Update Product</h2>
            <div className="mb-3">
                <label className="form-label">Product Name </label>
                <input type="text" className="form-control" 
                {...register('name')}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Product Category </label>
                <input type="text" className="form-control"
                {...register('category')} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control"  rows="3"
                {...register('description')}></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Image Path </label>
                <input type="text" className="form-control"
                {...register('imageUrl')} />
            </div>
            <div className="mb-3">
                <label className="form-label">Price </label>
                <input type="text" className="form-control" 
                {...register('price')}/>
            </div>
            <button type="submit" className="btn btn-primary">
                Update Product
            </button>
        </form>
    </div>
  )
}
