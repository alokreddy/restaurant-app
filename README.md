# Restaurant Ordering App

A full-stack web application that allows users to browse a list of restaurants, view their menus, and add items to a shopping cart.

## Features

- **Browse Restaurants**: View a list of available restaurants with filtering by rating and searching by name.
- **View Menus**: Click on a restaurant to see its menu of available dishes.
- **Shopping Cart**: Add and remove items from the cart and see the total price update in real-time.

## Tech Stack

- **Frontend**: React, Context API for state management, Axios for API calls.
- **Backend**: Node.js, Express for the server, Mongoose for MongoDB object modeling.
- **Database**: MongoDB Atlas.

## Setup and Installation

Follow these steps to get the application running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and a connection string.

### Backend Setup

1. **Navigate to the server directory:**

    ```bash
    cd server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the `server` directory by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and replace the placeholder with your actual MongoDB connection string:

    ```env
    MONGO_URI=mongodb+srv://<your-username>:<your-password>@...
    CLIENT_URL=http://localhost:3000
    ```

4. **Start the server:**
    The server runs on port 5001 by default.

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5001`.

### Frontend Setup

1. **Navigate to the client directory (from the root):**

    ```bash
    cd client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the React application:**

    ```bash
    npm start
    ```

    The application will open in your browser at `http://localhost:3000`.

## How to Use

- The main page displays a list of restaurants.
- Use the filter and search bars to find a specific restaurant.
- Click on a restaurant card to view its menu.
- Click the "Add to Cart" button on a dish to add it to your cart.
- The cart on the right side will update with the items and total price.
