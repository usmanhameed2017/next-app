"use server";
import { connectDB } from "@/database/connection";
import Product from "@/models/products";

// Add product
export const addProduct = async (prevState, formData) => {
    try 
    {
        await connectDB();
        const name = formData.get("name");
        const price = formData.get("price");

        // Errors
        const errors = {};
        if(!name) errors.name = "Product name is required!";
        if(!price) errors.price = "Product price is required!";
        if(Object.keys(errors).length > 0) return { success:false, errors };

        await Product.create({ name, price });
        return { success:true, errors };
    } 
    catch(error) 
    {
        console.log("Failed to create new product", error.message);
    }
};