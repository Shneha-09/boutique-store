import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    image: String,
    description: String,
    sizes: [String],
    stock: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);