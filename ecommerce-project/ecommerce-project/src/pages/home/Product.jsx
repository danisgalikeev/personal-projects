import {formatMoney} from "../../utils/money.js";
import {useState} from "react";
import axios from "axios";

export function Product({product, loadCart}) {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const addedToCart = () => {
        setIsAdded(true);
        setTimeout(()=>{
            setIsAdded(false);
        },2000)
    }
    const addToCart = async ()=>{
        addedToCart();
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity
        });
        await loadCart();
    }
    const selectQuantity=(event)=>{
        const quantitySelected=Number(event.target.value);
        setQuantity(quantitySelected);
    }
    return (

        <div data-testid="product-container" className="product-container">
            <div className="product-image-container">
                <img data-testid="product-image" className="product-image"
                     src={product.image}/>
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img data-testid="product-rating-stars-image" className="product-rating-stars"
                     src={`images/ratings/rating-${product.rating.stars*10}.png`}/>
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select data-testid="product-quantity-selector" value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div style={{opacity: isAdded ? 1 : 0}} className="added-to-cart">
                <img src="images/icons/checkmark.png"/>
                Added
            </div>

            <button data-testid="add-to-cart-button" onClick={addToCart} className="add-to-cart-button button-primary">
                Add to Cart
            </button>
        </div>
    )
}