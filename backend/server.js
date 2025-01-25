// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const cors = require("cors"); // CORS middleware for handling cross-origin requests
const dotenv = require("dotenv"); // dotenv module to load environment variables
const app = express(); // Initialize Express application

// Middleware to handle cross-origin requests

const corsOptions = {
    origin: "https://kanban-board-application-sigma.vercel.app/", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

app.use(cors(corsOptions));



// Middleware to parse incoming JSON data in requests
app.use(express.json()); // Automatically parses JSON requests

// Load environment variables from .env file
dotenv.config(); // Ensures environment variables are loaded from the .env file

// Import the database connection function
const connectToDatabase = require("./db/connectDatabase"); // Function to connect to your database

// Set up the port to either the one in environment variables or 5432
const PORT = process.env.PORT || 5432; // Default to 5432 if PORT is not specified in .env

// Import route modules for different API endpoints
const authRoutes = require("./routes/authRoutes"); // Routes for authentication-related operations
// Use routes for their corresponding base URL
app.use('/api/auth', authRoutes); // All auth routes will be prefixed with '/api/auth'

// Start the server and listen on the defined port
app.listen(PORT, () => {
    connectToDatabase(); // Establish connection to the database when the server starts

    // Log server start confirmation along with the port number
    console.log("Server is started on port", PORT);
});
