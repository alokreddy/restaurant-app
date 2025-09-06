const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};

console.log(`CORS enabled for origin: ${corsOptions.origin}`);
app.use(cors(corsOptions));
app.use(express.json());

const dishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  menu: [dishSchema],
  rating: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Seed initial data
const seedData = [
  {
    name: "Italian Delight",
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
    menu: [
      {
        name: "Pasta Alfredo",
        price: 10,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
      },
      {
        name: "Margherita Pizza",
        price: 15,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
      },
      {
        name: "Chicken Parmesan",
        price: 20,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
      },
    ],
    rating: 4.5,
  },
  {
    name: "Seafood Paradise",
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
    menu: [
      {
        name: "Grilled Salmon",
        price: 12,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
      {
        name: "Lobster Bisque",
        price: 18,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
      {
        name: "Shrimp Scampi",
        price: 25,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
    ],
    rating: 3.8,
  },
  {
    name: "Vegetarian Haven",
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
    menu: [
      {
        name: "Quinoa Salad",
        price: 8,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
      {
        name: "Eggplant Parmesan",
        price: 12,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
      {
        name: "Mushroom Risotto",
        price: 16,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
    ],
    rating: 4.2,
  },
  {
    name: "Sizzling Steakhouse",
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
    menu: [
      {
        name: "Filet Mignon",
        price: 22,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
      {
        name: "New York Strip",
        price: 18,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
      {
        name: "Ribeye Steak",
        price: 25,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
    ],
    rating: 4.7,
  },
  {
    name: "Asian Fusion",
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
    menu: [
      {
        name: "Sushi Platter",
        price: 20,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
      {
        name: "Pad Thai",
        price: 15,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
      {
        name: "Mongolian Beef",
        price: 18,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
      },
    ],
    rating: 4.0,
  },
];

const seedDatabase = async () => {
  try {
    console.log("Clearing database...");
    await Restaurant.deleteMany({}); // Clear existing data
    console.log("Inserting seed data...");
    await Restaurant.insertMany(seedData);
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

app.get("/restaurants", async (req, res) => {
  try {
    // Use the 'find' method of the 'Restaurant' model to retrieve all restaurants
    const restaurants = await Restaurant.find({});

    if (restaurants.length === 0) {
      console.warn("'/restaurants' endpoint was hit, but no data was found. Check if seeding was successful.");
    }

    // Send the retrieved restaurants as a JSON response
    res.json(restaurants);
  } catch (error) {
    // Handle any errors that may occur during the process and send a 500 Internal Server Error response
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: error.message });
  }
});

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("Error: MONGO_URI environment variable is not set. Please add it to your .env file.");
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log("Successfully connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Seed the database in the background after the server starts listening.
    // This prevents a slow or hanging seed process from blocking server startup.
    seedDatabase().catch(err => {
      console.error("Background database seeding failed:", err);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

startServer();
