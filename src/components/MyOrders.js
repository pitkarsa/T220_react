import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [listOfOrders, setListOfOrders] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/myOrders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // console.log("ORDERS DATA: ",data._embedded.orderses);
        setListOfOrders(data._embedded.orderses);
      });
  }, []);

  return (
    <div className="col-md-5 mt-2 mx-auto border rounded">
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            <th scope="col">OrderId</th>
            <th scope="col">OrderDate</th>
            <th scope="col">Bill Amount</th>
          </tr>
        </thead>
        <tbody>
          {listOfOrders &&
            listOfOrders.map((order) => (
              <tr key={order.orderId}>
                <td><button className="btn btn-link"
                    onClick={()=>navigate('/order-details',{state:order})}
                >
                    {order.orderId}</button>
                </td>
                <td>{order.orderDate}</td>
                <td>Rs. {order.totalBill}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
