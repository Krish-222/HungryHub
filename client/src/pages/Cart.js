// import React from 'react'


// import "./cart.css"

// import { useCart, useDispatchCart } from '../components/CartProvider'

// function Cart() {
//   const state = useCart();
//   const dispatch = useDispatchCart();



//   return (
//     <div>
      
//         <tr>
//           <th>Name</th>
//           <th>Type</th>
//           <th>Quantity</th>
//           <th>Price</th>
//           <th>delete</th>
//         </tr>
      
     
//         {/* {
//           state.length!==0?
//           <div>
//           {state.map((item, index) => {
//             return (<tr>
//               <td>{item.name}</td>
//               <td>{item.selectType}</td>
//               <td>{item.selectQuantity}</td>
//               <td>{item.price}</td>

//               <td onClick={(index) => { dispatch({ type: "REMOVE", position: index }) }}>delete</td>
//             </tr>)
//           })}
//           </div>
//           :
//           <div>cart is empty</div>
//         }

//        */}

//     </div>
//   )
// }

// export default Cart


import React from 'react';
import { useCart, useDispatchCart } from '../components/CartProvider';
import './cart.css'; // Import the CSS file
import { Button } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/fontawesome-svg-core"
import axios from "axios"
import {toast} from "react-toastify"
import {useState} from "react"
import Loader from '../components/Loader';
function Cart() {
  const state = useCart();
  const dispatch = useDispatchCart();
  const [checkout,setCheckout]=useState(false)

  const handleCheckout=async(e)=>{
    setCheckout(true);
    let email=localStorage.getItem('email');
    e.preventDefault();
    let order_data=state;

    const date=(new Date()).toString();
    const result=await axios.post("http://localhost:5000/api/v1/orders/createorder",{email,order_data,date})
    await dispatch({type:"DROP"})
    setCheckout(false);
    toast.success("order placed successfully",{position:"bottom-center"})

  }

  return (
    <div className="cart-container">
      {state.length !== 0 ? (
        <div>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              
            </tr>
          </thead>
          <tbody>
            {state.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.selectType}</td>
                <td>{item.selectQty}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: 'REMOVE', position: index });
                    }}
                  >Delete

                    {/* <FontAwesomeIcon icon="fa-regular fa-trash-can" /> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button type="submit"  onClick={handleCheckout}>Checkout</Button>
        {checkout && <span class="loader"><Loader/></span>}
        </div>

      ) : (
        <div className="empty-cart">Cart is empty</div>
      )}
    </div>
  );
}

export default Cart;
