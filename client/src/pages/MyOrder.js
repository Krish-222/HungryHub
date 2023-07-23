import React, { useEffect, useState } from 'react';
import { useCart } from '../components/CartProvider';
import axios from "axios";
import "./myorder.css"

function MyOrder() {
  const state = useCart();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        const { data } = await axios.post("/api/v1/orders/allorders", { email,state });
        if (data.status === "success") {
          console.log(data.data.orders);
          setData(data.data.orders);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    (data.length !== 0) ? (
      <div className='orderSection'>
        <h1>My Orders</h1>
        <div>
          {/*to have last order firstly */}
          {data.reverse().map((item, index) => (
            <div key={index}>
              {/* {item[0].date} */}
              <hr></hr>
              {item.map((subItem, subIndex) => (
                subIndex > 0 ? (<ul key={subIndex}>
                  <li>{subItem.name}</li>
                  <li>{subItem.selectQty}</li>
                  <li>{subItem.selectType}</li>
                  <li>{subItem.price}</li>
                </ul>) : <div><div>{subItem.date}</div><hr></hr></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>No order placed</div>
    )
  );
}

export default MyOrder;
