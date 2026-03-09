import {CheckoutHeader} from "./CheckoutHeader.jsx";
import './CheckoutPage.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {OrderSummary} from "./OrderSummary.jsx";
import {PaymentSummary} from "./PaymentSummary.jsx";



export function CheckoutPage({cart, loadCart}) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        const fetchCheckoutData = async () => {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data);
        }
        fetchCheckoutData();
    },[])
    useEffect(() => {
        const fetchPaymentSummary = async () => {
            const response=await axios.get('/api/payment-summary')
            setPaymentSummary(response.data);
        }
        fetchPaymentSummary();
    },[cart])
    console.log("Parent loadCart:", loadCart);
    window.axios=axios;

    return (
        <>

            <title>Checkout</title>
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">

                    <OrderSummary loadCart={loadCart} cart={cart} deliveryOptions={deliveryOptions} />


                    <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
                </div>
            </div>

        </>
    )
}