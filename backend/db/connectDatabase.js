// const mongoose = require("mongoose")
// const mongoUri = process.env.MONGO_URI;

// const connectToDatabase = async()=>{
//     try {
//         await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Database Connected")
//     } catch (error) {
//         console.log("Error")
        
//     }
// }

// module.exports = connectToDatabase;

const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/KanbanBoard";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout for MongoDB server selection
    });
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process with failure if the connection fails
  }
};

module.exports = connectToDatabase;
