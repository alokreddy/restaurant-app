import React, { useContext } from "react";
import { RestaurantContext } from "../contexts/RestaurantContext";

const Cart = () => {
  const { cartItems, totalPrice } = useContext(RestaurantContext);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <span style={{ color: "brown", fontWeight: "bold" }}>
          Total Price:{" "}
        </span>{" "}
        ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
