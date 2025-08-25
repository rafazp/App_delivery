import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/foody_logo.png';
import cartIcon from '../assets/cart_icon.png';

const Header = ({ toggleCart, cartItemCount, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm); // chama a função passada do pai
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <header className="main-header">
            <div className="header-top-bar">
                <a href="/" className="logo-link">
                    <img src={logo} alt="Foody Logo" className="logo" />
                </a>

                <div className="location-bar">
                    <span className="location-icon">📍</span>
                    <input type="text" placeholder="Endereço" className="location-input" />
                </div>

                {/* Barra de pesquisa com lógica */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar restaurante"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button className="search-btn" onClick={handleSearch}>
                        🔍
                    </button>
                </div>

                <button className="cart-btn" onClick={toggleCart}>
                    <img src={cartIcon} alt="Carrinho de Compras" className="cart-icon" />
                    {cartItemCount > 0 && (
                        <span className="cart-count">{cartItemCount}</span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
