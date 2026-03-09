import './Header.css'
import {NavLink, useNavigate, useSearchParams} from 'react-router'
import logoWhite  from '../assets/images/logo-white.png'
import mobileLogoWhite  from '../assets/images/mobile-logo-white.png'
import searchIcon from '../assets/images/icons/search-icon.png'
import cartIcon from '../assets/images/icons/cart-icon.png'
import {useState} from "react";

export function Header({cart}) {
    let totalQuantity = 0;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("search");

    const [search, setSearch] = useState(searchText || '')

    const updateSearchInput = () =>{
        setSearch(event.target.value);
    }
    const searchProducts = () =>{
        navigate(`/?search=${search}`);
    }
    cart.forEach(item => {
        totalQuantity += item.quantity;
    })

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/"
                   className="header-link">
                    <img className="logo"
                         src={logoWhite}/>
                    <img className="mobile-logo"
                         src={mobileLogoWhite}/>
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar"
                       type="text"
                       placeholder="Search"
                value={search}  onChange={updateSearchInput}/>

                <button onClick={searchProducts} className="search-button">
                    <img className="search-icon"
                         src={searchIcon}/>
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link"
                   to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link"
                   to="/checkout">
                    <img className="cart-icon"
                         src={cartIcon}/>
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    )
}