import {Header} from "./Header.jsx";
import './TrackingPage.css'
import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({cart}) {

    const {orderId, productId} = useParams();
    const [orders, setOrders] = useState(null);



    useEffect(() => {
        const getTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrders(response.data);
        }
        getTrackingData();

    },[orderId])

    if(!orders) return null


    const orderProduct = orders.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });




    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs-orders.orderTimeMs;
    const timePassedMs = dayjs().valueOf()-orders.orderTimeMs;
    let deliveryProgress = (timePassedMs / totalDeliveryTimeMs)*100;
    if(deliveryProgress > 100){
        deliveryProgress = 100;
    }

    const isPreparing = deliveryProgress<33;
    const isShipped = deliveryProgress<100 && deliveryProgress>=33;
    const isDelivered = deliveryProgress===100;




    return (
        <>

            <title>Tracking</title>
            <Header cart={cart}/>
        <div className="tracking-page">
            <div className="order-tracking">
                <Link className="back-to-orders-link link-primary"
                   to="/orders">
                    View all orders
                </Link>

                <div className="delivery-date">
                    {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                </div>

                <div className="product-info">
                    {orderProduct.name}
                </div>

                <div className="product-info">
                    {orderProduct.quantity}
                </div>

                <img className="product-image"
                     src={orderProduct.product.image}/>


                <div className="progress-labels-container">
                    <div className={`progress-label ${isPreparing && "current-status"}`}>
                        Preparing
                    </div>

                    <div className={`progress-label ${isShipped && "current-status"}`}>
                        Shipped
                    </div>

                    <div className={`progress-label ${isDelivered && "current-status"}`}>
                        Delivered
                    </div>

                </div>

                <div className="progress-bar-container">
                    <div style={{width: `${deliveryProgress}%`}} className="progress-bar"></div>
                </div>
            </div>
        </div>
            </>


    )
}