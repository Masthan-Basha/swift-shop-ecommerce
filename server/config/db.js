import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if URI exists, otherwise use your Atlas string directly as a backup
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://masthanbasha612_db_user:Swift123@swift-shop-ecommerce.y7an1j5.mongodb.net/swift-shop?retryWrites=true&w=majority");

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;