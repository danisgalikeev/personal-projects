import {Header} from "../../components/Header.jsx";
import './OrdersPage.css'

import {Fragment, useEffect, useState} from "react";
import axios from "axios";

import {OrdersGrid} from "./OrdersGrid.jsx";

export function OrdersPage({cart, loadCart}) {

    const [orders, setOrders] = useState([])

    useEffect(() => {

        const getOrdersData = async () => {
            const response = await
                axios.get('/api/orders?expand=products')
            setOrders(response.data);
        }
        getOrdersData();
    },[])


    return (
        <>

            <title>Orders</title>
            <Header cart={cart}/>

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid loadCart={loadCart} orders={orders} />
            </div>

        </>
    )
}