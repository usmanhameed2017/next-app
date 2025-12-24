import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

// Schema
const userSchema = new Schema({
    name:{ type:String, required:true },
    username:{ type:String, required:true, unique:true, lowercase:true, index:true },
    password:{ type:String, required:true }
});

// Pre save hook for hashing password
userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;
    try 
    {
        this.password = await bcrypt.hash(this.password, 10);
        return;
    } 
    catch(error) 
    {
        console.log("Failed to hash password:", error.message);
        throw error;
    }
});

// Match password
userSchema.methods.matchPassword = async function(password) {
    if(!password) return false;
    try 
    {
       return await bcrypt.compare(password, this.password); 
    } 
    catch (error) 
    {
        console.log("Failed to compare passwords:", error.message);
        return false;
    }
}

// Model reference
const User = models.User || model("User", userSchema);

export default User;