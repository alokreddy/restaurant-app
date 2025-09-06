import React, { useContext, useState, useMemo } from "react";
import RestaurantCard from "./RestaurantCard";
import { RestaurantContext } from "../contexts/RestaurantContext";

const RestaurantList = () => {
  const { restaurants, setSelectedRestaurant, loading, error } = useContext(
    RestaurantContext
  );
  const [ratingFilter, setRatingFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    if (ratingFilter) {
      filtered = filtered.filter(
        (restaurant) => restaurant.rating >= parseFloat(ratingFilter)
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchLower)
      );
    }
    return filtered;
  }, [restaurants, ratingFilter, searchTerm]);

  const handleRestaurantClick = (restaurantId) => {
    setSelectedRestaurant(
      restaurants.find((restaurant) => restaurant._id === restaurantId)
    );
  };

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading restaurants...</p>;
    }

    if (error) {
      return <p style={{ color: "red" }}>{error}</p>;
    }

    if (filteredRestaurants.length === 0) {
      return <p>No restaurants found.</p>;
    }

    return filteredRestaurants.map((restaurant) => (
      <RestaurantCard
        key={restaurant._id}
        restaurant={restaurant}
        onClick={() => handleRestaurantClick(restaurant._id)}
      />
    ));
  };

  return (
    <div className="container">
      <h2 className="header">Restaurant List</h2>
      <div className="filter-container">
        <label htmlFor="rating" className="filter-label">
          Filter by Rating:
        </label>
        <input
          type="number"
          id="rating"
          value={ratingFilter}
          onChange={handleRatingChange}
          className="filter-input"
        />
        <label htmlFor="search" className="filter-label">
          Search by Name:
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="filter-input"
        />
      </div>
      <div className="restaurant-card-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default RestaurantList;
