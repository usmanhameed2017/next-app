"use server";

import { cookieOptions } from "@/config";
import { connectDB } from "@/database/connection";
import User from "@/models/users";
import { generateAccessToken } from "@/utils/accessToken";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

// Signup
export const handleSignup = async (prevState, formData) => {
    // Connect db
    await connectDB();

    // Initialize error object
    const errors = {};

    // Get values
    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");

    // Validate
    if(!name) errors.name = "Name is required";
    if(!username) errors.username = "Username is required";
    if(!password) errors.password = "Password is required";
    if(password && password.length < 5) errors.password = "Password must be at least 5 character long";

    // Return errors
    if(Object.keys(errors).length > 0) return { errors, success:false };

    try 
    {
        // Save to db
        await User.create({ name, username, password });
        return { errors, success:true };
    } 
    catch(error) 
    {
        console.log(error.message);
    }
};

// Login
export const handleLogin = async (prevState, formData) => {
    // Connect db
    await connectDB();

    // Initialize error
    const errors = {};

    // Get fields
    const username = formData.get("username");
    const password = formData.get("password");

    // Validate
    if(!username) errors.username = "Username is required";
    if(!password) errors.password = "Password is required";

    if(Object.keys(errors).length > 0) return { success:false, errors };

    try 
    {
        // Find user
        const user = await User.findOne({ username });
        if(!user) return { success:false, errors:{ username:"User not found associated with this username" } };

        // Match password
        const isMatched = await user.matchPassword(password);
        if(!isMatched) return { success:false, errors:{ password:"Incorrect password" } };

        // Generate access token
        const accessToken = generateAccessToken(user);

        // Set cookie
        const cookieStorage = await cookies();
        cookieStorage.set("accessToken", accessToken, cookieOptions);

        return { success:true, errors };
    } 
    catch(error) 
    {
        console.log(error.message);
    }
};

// Handle logout
export const handleLogout = async () => {
    const cookieStorage = await cookies();
    cookieStorage.delete("accessToken");
    redirect("/");
};