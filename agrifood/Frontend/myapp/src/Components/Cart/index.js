// Cart.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AgriContext from '../../../src/agriContext/index';
import { FaRupeeSign, FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";
import './index.css'

class Cart extends Component {
  render() {
    return (
      <AgriContext.Consumer>
        {(value) => {
          const {
            cart,
            onRemoveCart,
            onIncreaseQuantity,
            onDecreaseQuantity
          } = value;

          let sum = 0;
          const total = cart.map((each) => {
            sum += each.price * each.quantity;
          });

          const onItemRemove = (user_id, product_id) => {
            onRemoveCart(user_id, product_id);
          };

          const onMinus = (id) => {
            onDecreaseQuantity(id);
          };

          const onPlus = (id) => {
            onIncreaseQuantity(id);
          };

          return cart.length === 0 ? (
            <div className='cart-container empty-cart'>
              <img
                className='empty-cart-image'
                src="https://img.freepik.com/free-vector/product-hunt-concept-illustration_114360-6006.jpg"
                alt="Empty Cart"
              />
              <h1>Cart is empty</h1>
              <Link to='/' className="link-go-back">
                <button className='button-go-back'>Go Back</button>
              </Link>
            </div>
          ) : (
            <div className='cart-container'>
              <div className='cart-header'>
                <h1>Your Shopping Cart</h1>
                <Link to='/' className='link-go-back'>
                  <button className='button-go-back'>Continue Shopping</button>
                </Link>
              </div>
              <ul className='cart-list'>
                {cart.map((each) => (
                  <li className='cart-item' key={each.product_id}>
                    <div className='item-details'>
                      <img
                        src={each.image_url}
                        alt={each.name}
                        className='item-image'
                      />
                      <div className='item-description'>
                        <h3 className='item-name'>{each.name}</h3>
                        <p className='item-price'>
                          <FaRupeeSign />
                          {each.price * each.quantity}
                        </p>
                        <div className='quantity-controls'>
                          <button onClick={() => onMinus(each.product_id)} className='quantity-button'>
                            <FaRegMinusSquare />
                          </button>
                          <p className='item-quantity'>{each.quantity}</p>
                          <button onClick={() => onPlus(each.product_id)} className='quantity-button'>
                            <FaRegPlusSquare />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => onItemRemove(each.user_id, each.product_id)} className='remove-button exit'>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className='cart-summary'>
                <h2 className="summary-title">Order Summary</h2>
                <ul className="summary-list">
                  {cart.map((each) => (
                    <li key={each.product_id} className='summary-item'>
                      <span>{each.name}</span>
                      <span>{each.price} x {each.quantity}</span>
                      <span className='item-total'>{each.price * each.quantity}</span>
                    </li>
                  ))}
                </ul>
                <hr className='line' />
                <h2 className="total-amount">Total: <FaRupeeSign />{sum}</h2>
                <div className='checkout-buttons'>
                  <button className='proceed-button'>Proceed to Checkout</button>
                  <Link to='/' className='link-go-back'>
                    <button className='button-go-back'>Continue Shopping</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        }}
      </AgriContext.Consumer>
    );
  }
}

export default Cart;
