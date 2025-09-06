import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // totalPrice should be derived from cartItems to prevent sync issues.
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use environment variables for API URLs in a real application
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001";
        console.log(`Fetching restaurants from ${apiUrl}/restaurants...`);
        const response = await axios.get(`${apiUrl}/restaurants`);
        console.log("Fetched data:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setRestaurants(response.data);
        } else {
          console.warn("Received non-array or no data for restaurants.");
          setRestaurants([]);
        }
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError(
          "Failed to fetch restaurants. Please check the server connection and console for more details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleAddItems = useCallback((dish) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item._id === dish._id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item._id === dish._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCartItems, { ...dish, quantity: 1 }];
    });
  }, []);

  const handleRemoveItems = useCallback((dish) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item._id === dish._id);
      if (existingItem?.quantity === 1) {
        return prevCartItems.filter((item) => item._id !== dish._id);
      }
      if (existingItem) {
        return prevCartItems.map((item) =>
          item._id === dish._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCartItems;
    });
  }, []);

  const value = useMemo(() => ({
    restaurants,
    loading,
    error,
    selectedRestaurant,
    setSelectedRestaurant,
    cartItems,
    handleAddItems,
    handleRemoveItems,
    totalPrice,
  }), [restaurants, loading, error, selectedRestaurant, cartItems, handleAddItems, handleRemoveItems, totalPrice]);

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
