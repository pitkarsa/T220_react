import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 

export default function AddProduct() {
    const token = localStorage.getItem("token");
    const {register, handleSubmit } = useForm();
    const navigate = useNavigate();

    function addProduct(formData){       
        fetch(`${process.env.REACT_APP_API_URL}/products`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                method:"POST",
                body: JSON.stringify(formData)
            })
            .then(resp => {
                if(resp.ok){
                    navigate("/");
                }
            })  
        
    }

  return (
    <div className='col-md-3 mt-2 p-3 mx-auto rounded shadow'>
        <form onSubmit={handleSubmit(addProduct)}>
            <h2>Add Product</h2>
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
                Add Product
            </button>
        </form>
    </div>
  )
}
