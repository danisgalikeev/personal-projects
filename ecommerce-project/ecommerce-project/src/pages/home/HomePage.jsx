import {Header} from "../../components/Header";
import './HomePage.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {ProductsGrid} from "./ProductsGrid.jsx";
import {useSearchParams} from "react-router";

export function HomePage({cart, loadCart}) {
    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    //когда получаем ответ от бекенда, выполняется то, что в then. полученные
    //данные сохраняются в res
    useEffect(() => {

        const getHomeData = async () => {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        }

        getHomeData();

    },[search]);




    return (
        <>
                <title>Ecommerce Project</title>


            <Header cart={cart}/>

            <div className="home-page">
                <ProductsGrid loadCart={loadCart} products={products} />
            </div>

        </>
    )
}