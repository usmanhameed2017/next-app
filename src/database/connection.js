import mongoose from "mongoose";

// Mongo url
const MONGO_URL = `${process.env.MONGO_URL}/${process.env.DB_NAME}`;

if(!global._mongoose) global._mongoose = { conn: null, promise: null };

// Connect
export const connectDB = async () => {
    if(global._mongoose.conn) return global._mongoose.conn;

    if(!global._mongoose.promise) 
    {
        global._mongoose.promise = mongoose.connect(MONGO_URL, {
            bufferCommands: false,
        });
    }

    try 
    {
        global._mongoose.conn = await global._mongoose.promise;
        console.log("MongoDB connected");
        return global._mongoose.conn;
    } 
    catch(error) 
    {
        global._mongoose.promise = null;
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};