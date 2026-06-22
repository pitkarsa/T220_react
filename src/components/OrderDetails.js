import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function OrderDetails() {

    const location = useLocation();
    console.log(location.state);// order obj
    const orderObj = location.state;
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [details, setDetails] = useState(null);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/order-details/${orderObj.orderId}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setDetails(data)});
    },[])

  return (
    <div className='col-md-6 mx-auto '>
        <div className='card-body p-3  rounded mt-3'>
            <p>Order Id: {orderObj.orderId}</p>
            <p>Order Date: {orderObj.orderDate}</p>
            <p>Total Bill: {orderObj.totalBill}</p>
            <p>Payment Id: {orderObj.paymentId}</p>
        </div>
        {
            details && 
            <table>
                <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Quantity</th>
                </tr>
                {
                details.map(row => 
                <tr >
                    <td><img src={row.product.imageUrl} alt="" height="50px"></img></td>
                    <td>{row.product.name}</td>
                    <td>{row.product.price}</td>
                    <td>{row.quantity}</td>
                </tr>)
                }
            </table>
        }
    </div>
  )
}
