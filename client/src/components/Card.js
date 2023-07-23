import React from "react"
import { useState } from "react"
import "./card.css"
import { useCart, useDispatchCart } from './CartProvider'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


function Card(props) {
    let state = useCart();
    const navigate = useNavigate();
    let dispatch = useDispatchCart();
    console.log(state);
    const type = Object.keys(props.options[0]);
    const [selectQty, setSelectQty] = useState(1);
    const [selectType, setSelectType] = useState("half");
    const handleCart = async () => {
        const email=localStorage.getItem("email");
        if (email){

            let flag = false;
            console.log(state);
            for (let item of state) {
                if (item.id === props.id) {
                    flag = true;
                }
            }
            console.log(flag)
            if (flag) {
                const data = await dispatch({ type: "UPDATE", name: props.name, selectType: selectType, selectQty: selectQty, id: props.id, price: selectQty * (~~props.options[0][selectType]) })
            }

            else {
                const data = await dispatch({ type: "ADD", name: props.name, selectType: selectType, selectQty: selectQty, id: props.id, price: selectQty * (~~props.options[0][selectType]) })
            }


            toast.success("item added to cart", {
                position: "bottom-left",
                hideProgressBar: true,
                autoClose: 2000,
            })
        }
        else {
            navigate("/login");
            toast.error("please login first", {
                position: "bottom-left",
                hideProgressBar: true,
                autoClose: 2000,
            })
        }



    }

    return (
        <div className='card'>

            <img src={props.img} alt="food-title" className='food-image' />

            <div classname="cardname">{props.name}</div>

            <div className='options'>
                <div className="qty">
                    <div onClick={(e) => { setSelectQty(selectQty + 1) }} className="plus">+</div><div className="show">{selectQty}</div><div className="minus" onClick={() => { if (selectQty > 1) { setSelectQty(selectQty - 1) } }}>-</div></div>
                <select onChange={(e) => { setSelectType(e.target.value) }} className='type'>
                    {type.map((item, index) => <option>{type[index]}</option>)}
                </select>
            </div>
            <div className='price'>Price:{selectQty * (~~props.options[0][selectType])}</div>
            <div className='flex'>
                <hr></hr>
                <button>Order Now</button>
                <button onClick={handleCart}>Add to cart</button></div>
        </div>
    )
}

export default Card