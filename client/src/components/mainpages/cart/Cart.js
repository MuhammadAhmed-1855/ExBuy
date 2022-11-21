import React, {useContext, useState, useEffect} from "react";
import {GlobalState} from "../../../GlobalState"
import {Link} from "react-router-dom";
import axios from "axios";


function Cart() {

    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    if(cart.length === 0) {
        return <h2 style={{textAlign: "center", fontSize: "5rem"}} >Cart Empty</h2>
    }

    return(
        <div>
            {
                cart.map(product => (
                    <div className='Detail'>
                        <img src={product.images.url} alt='' />
                        <div className='Detail-Box'>
                            
                            <h2>{product.title}</h2>
                            <h3>Rs. {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="Amount">
                                <button>-</button>
                                <strong>{product.quantity}</strong>
                                <button>+</button>
                            </div>
                            
                            <div className="Delete">X</div>
                        </div>
                        <hr />
                    </div>

                ))
            }

            <div className="Total">
                <h3>Total: Rs. {total}</h3>
                <Link to="#!">Payment</Link>
            </div>
        </div>
    )
};

export default Cart;