import React from 'react';
import './OrderSidebar.css';

const OrderSidebar = ({ 
  isOpen, 
  onToggle, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  totalPrice, 
  serviceFee, 
  finalTotal, 
  userBalance 
}) => {
  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        className={`order-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
      >
        <span className="toggle-icon">📋</span>
        <span className="toggle-text">Order Menu</span>
        {cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </button>

      {/* Sidebar */}
      <div className={`order-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="order-sidebar-header">
          <h3>Your Address</h3>
          <div className="address-info">
            <div className="address-text">
              <p className="address-name">Elm Street, 23</p>
              <p className="address-detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="address-actions">
              <button className="btn-icon">📝</button>
              <button className="btn-icon">📍</button>
            </div>
          </div>
        </div>

        <div className="order-menu-section">
          <h3>Order Menu</h3>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.dish.id} className="order-item">
                  <div className="item-image">
                    <img 
                      src={item.dish.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1'} 
                      alt={item.dish.name} 
                    />
                  </div>
                  <div className="item-details">
                    <h4>{item.dish.name}</h4>
                    <div className="item-price">
                      + {formatPrice(parseFloat(item.dish.price))}
                    </div>
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="coupon-section">
              <div className="coupon-input">
                <span className="coupon-icon">🎫</span>
                <span>Have a coupon code?</span>
                <button className="coupon-arrow">→</button>
              </div>
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Service</span>
                <span>+ {formatPrice(serviceFee)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="balance-section">
              <div className="balance-info">
                <span className="balance-label">Your Balance</span>
                <div className="balance-amount">
                  <span className="balance-value">{formatPrice(userBalance)}</span>
                  <div className="balance-actions">
                    <button className="balance-btn">💳</button>
                    <button className="balance-btn">💰</button>
                  </div>
                </div>
              </div>
            </div>

            <button className="checkout-btn">
              Checkout
            </button>
          </>
        )}
      </div>

      {/* Overlay */}
      {isOpen && <div className="order-sidebar-overlay" onClick={onToggle}></div>}
    </>
  );
};

export default OrderSidebar;