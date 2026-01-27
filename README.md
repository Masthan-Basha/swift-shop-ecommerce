# 🚀 Swift Shop E-Commerce

A high-performance, full-stack MERN e-commerce platform featuring real-time order tracking, dynamic admin controls, and automated invoice generation.


## ✨ Key Features

* 📦 Dynamic Order Tracking: Visual progress bar for customers (Processing -> Shipped -> Delivered).
* 🛂 Admin Command Center: Toggle-based dashboard to manage logistics and process return/refund requests.
* 🧾 Automated Invoices: Print-ready, professionally styled invoices for every order.
* 🔄 Return System: Full workflow for customers to request returns and admins to approve/reject them.
* 🔍 Advanced Search: Filter orders by ID, status, or customer email with real-time results.
* 📊 Data Export: One-click CSV export for order history and financial reporting.

## 🛠️ Tech Stack

Frontend: React.js, Redux Toolkit, Tailwind CSS, Lucide/React Icons  
Backend: Node.js, Express.js  
Database: MongoDB Atlas  
Deployment: Vercel (Frontend) & Render (Backend)

## 🚀 Getting Started

### Prerequisites
* Node.js installed
* MongoDB Atlas account

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Masthan-Basha/swift-shop-ecommerce.git](https://github.com/Masthan-Basha/swift-shop-ecommerce.git)
   cd swift-shop-ecommerce

cd ../server
npm install
# Create a .env file with MONGO_URI, JWT_SECRET, and PORT
npm start

cd ../client
npm install
npm run dev
🔐 Environment Variables
To run this project, you will need to add the following variables to your .env files:

Server: MONGO_URI, JWT_SECRET, PORT

Client: VITE_API_URL (Point this to your backend URL)

📜 License
This project is licensed under the MIT License.

Developed by Masthan Basha
