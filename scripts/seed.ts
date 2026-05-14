import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Product from "../models/Product";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not found");
}

mongoose.connect(MONGODB_URI);

const productsPath = path.join(process.cwd(), "public/products");

async function seed() {
  try {
    const files = fs.readdirSync(productsPath);

    const products = files.map((file, index) => {
      const lower = file.toLowerCase();

      let category = "Fashion";

      if (lower.includes("kurti")) {
        category = "Kurti";
      } else if (lower.includes("tshirt")) {
        category = "T-Shirt";
      }

      return {
        name: `${category} ${index + 1}`,
        category,
        price: 799 + index * 100,
        image: `/products/${file}`,
        description: `Beautiful ${category} collection`,
        sizes: ["S", "M", "L", "XL"],
        stock: 10,
      };
    });

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} Products Added Successfully`);

    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();