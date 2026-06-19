import React, { useEffect, useState } from 'react'

export default function MyOrders() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [listOfOrders, setListOfOrders] = useState(null);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/myOrders`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            .then(resp => {
                return resp.json();        
            })
            .then(data => {
                // console.log("ORDERS DATA: ",data._embedded.orderses);
                setListOfOrders(data._embedded.orderses);
            })
    },[]);





  return (
 <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">OrderId</th>
                <th scope="col">OrderDate</th>
                <th scope="col">Bill Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    listOfOrders && listOfOrders.map(order => 
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.totalBill}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    
  )
}

