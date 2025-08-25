// src/components/MenuContent.jsx
import React from 'react';
import './MenuContent.css';

// AQUI O COMPONENTE RECEBE A PROPRIEDADE
const MenuContent = ({ dishesByCategory, addToCart }) => {
    return (
        <main className="menu-content">
            {Object.entries(dishesByCategory).map(([category, dishes]) => (
                <section key={category} id={category} className="menu-section">
                    <h2>{category}</h2>
                    <div className="menu-grid">
                        {dishes.map(dish => (
                            <div key={dish.id} className="menu-item-card">
                                <img src={dish.image} alt={dish.name} className="item-image" />
                                <h3 className="item-name">{dish.name}</h3>
                                <p className="item-price">R$ {dish.price}</p>
                                {/* O BOTÃO CHAMA A FUNÇÃO */}
                                <button className="add-to-cart-btn" onClick={() => addToCart(dish)}>
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
};

export default MenuContent;