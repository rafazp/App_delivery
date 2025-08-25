// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './pages/RestaurantList';
import RestaurantMenu from './pages/RestaurantMenu';
import Header from './components/Header';
import Cart from './pages/Cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 estado da busca

  // FUNÇÃO PARA ADICIONAR ITENS AO CARRINHO
  const addToCart = (dish) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.dish.id === dish.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { dish, quantity: 1 }];
    });
  };

  // FUNÇÃO PARA REMOVER ITENS DO CARRINHO
  const removeItem = (dishId) => {
    setCart(prevCart => prevCart.filter(item => item.dish.id !== dishId));
  };

  // FUNÇÃO PARA ATUALIZAR QUANTIDADE DE ITENS
  const updateQuantity = (dishId, amount) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.dish.id === dishId ? { ...item, quantity: item.quantity + amount } : item
      ).filter(item => item.quantity > 0);
      return updatedCart;
    });
  };

  // FUNÇÃO PARA ALTERNAR A VISIBILIDADE DO CARRINHO
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  // FUNÇÃO PARA FINALIZAR O PEDIDO
  const finalizeOrder = () => {
    alert('Pedido finalizado!');
    setCart([]);
    setIsCartOpen(false);
  };

  // FUNÇÃO PARA ATUALIZAR O TERMO DE BUSCA (passada para o Header)
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <Header 
        toggleCart={toggleCart} 
        cartItemCount={cart.length}
        onSearch={handleSearch} // 🔥 agora o Header pode chamar isso
      />
      
      {isCartOpen && (
        <Cart 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onFinalizeOrder={finalizeOrder}
          onCloseCart={toggleCart}
        />
      )}
      
      <Routes>
        {/* passa o searchTerm para RestaurantList */}
        <Route path="/" element={<RestaurantList searchTerm={searchTerm} />} />
        <Route path="/restaurants/:id" element={<RestaurantMenu addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
