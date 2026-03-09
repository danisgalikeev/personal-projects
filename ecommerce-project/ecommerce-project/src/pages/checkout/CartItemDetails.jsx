import {formatMoney} from "../../utils/money.js";
import axios from "axios";
import {useState} from "react";

export function CartItemDetails({cartItem, loadCart}) {
    const [isQuantity, setIsQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const deleteCartItem = async() => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }
    const sendQuantity = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: Number(quantity)
        });
        await loadCart();
    }
    const updateQuantity = () => {

        if(isQuantity){
            sendQuantity();
            setIsQuantity(false);
        } else {
            setIsQuantity(true);
        }
    }
    const discardQuantity = () => {
        setQuantity(cartItem.quantity)
        setIsQuantity(false);
    }
    return (
        <>
        <img className="product-image"
             src={cartItem.product.image}/>
        <div className="cart-item-details">
            <div className="product-name">
                {cartItem.product.name}
            </div>
            <div className="product-price">
                {formatMoney(cartItem.product.priceCents)}
            </div>
            <div className="product-quantity">

                <span>
                    Quantity:
                    {isQuantity ? <input onKeyDown={
                            (event)=>{
                                if(event.key==="Enter"){
                                    updateQuantity();
                                } else if (event.key==="Escape") {
                                    discardQuantity();
                                }
                            }
                        } onChange={(event)=>{
                        setQuantity(event.target.value);
                        }} value={quantity} style={{width:"50px"}} type="text"/> :
                        <span className="quantity-label">{cartItem.quantity}</span>}

                  </span>
                <span onClick={updateQuantity} className="update-quantity-link link-primary">
                    Update
                  </span>
                <span onClick={deleteCartItem} className="delete-quantity-link link-primary">
                    Delete
                  </span>
            </div>
        </div>
    </>
    )
}