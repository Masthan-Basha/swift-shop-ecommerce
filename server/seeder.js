import dotenv from 'dotenv';
import Product from './models/Product.js'; // Ensure this matches Product.js
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const products = [
  {
    name: 'iPhone 15 Pro',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc',
    description: 'Titanium design, A17 Pro chip, customizable Action button.',
    brand: 'Apple',
    category: 'Electronics',
    price: 999.99,
    countInStock: 10,
    rating: 4.8,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.unsplash.com/photo-1618366712277-721946026850',
    description: 'Industry-leading noise cancellation and magnificent sound.',
    brand: 'Sony',
    category: 'Electronics',
    price: 349.99,
    countInStock: 15,
    rating: 4.7,
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Amazon Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();