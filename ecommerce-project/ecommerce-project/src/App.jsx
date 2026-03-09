import './App.css'
import {HomePage} from "./pages/home/HomePage"
import {Routes, Route} from "react-router";
import {CheckoutPage} from "./pages/checkout/CheckoutPage.jsx";
import {OrdersPage} from "./pages/orders/OrdersPage.jsx";
import {TrackingPage} from "./components/TrackingPage.jsx";
import {ErrorPage} from "./pages/ErrorPage.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [cart, setCart] = useState([]);

    const loadCart = async () => {
        const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data);
    }

    useEffect(()=>{
        loadCart();
    },[])

  return (
      <Routes>
            <Route index element={<HomePage loadCart={loadCart} cart={cart}/>} />
          <Route path="/checkout"  element={<CheckoutPage loadCart={loadCart}  cart={cart}/>} />
          <Route path="/orders" element={<OrdersPage loadCart={loadCart} cart={cart}/>} />
          <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>} />
          <Route path="*" element={<ErrorPage cart={cart}/>} />
      </Routes>

  )
}

export default App
