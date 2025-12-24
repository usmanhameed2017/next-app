import { Schema, model, models } from 'mongoose';
const mongoosePaginate = require("mongoose-paginate-v2");

// Schema
const productSchema = new Schema({
    name:{ type:String, required:true, trim:true },
    price:{ type:Number, required:true }
}, { timestamps:true });

// Inject plugin
productSchema.plugin(mongoosePaginate);

// Model Reference
const Product = models.Product || model("Product", productSchema);

export default Product;