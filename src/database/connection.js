import mongoose from "mongoose";

// Mongo url
const MONGO_URL = `${process.env.MONGO_URL}/${process.env.DB_NAME}`;

// Connect
export const connectDB = async () => {
    if(mongoose.connection.readyState === 1) return;
    try 
    {
        const response = await mongoose.connect(MONGO_URL);
        console.log(`Database connected to ${response.connection.host}`);
    } 
    catch(error) 
    {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};