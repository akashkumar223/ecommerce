![image](https://github.com/user-attachments/assets/83993858-4cb3-4e90-98e7-8cf72b2c4ca8)




ShopEase E-Commerce Platform
Overview
ShopEase is a simple e-commerce platform that allows users to browse products, add them to their cart, and place orders. It includes features for user authentication, an admin panel for managing products, and a responsive design for a seamless shopping experience.

Features
Product Listing: Displays products dynamically from the database.
Add to Cart: Users can add products to their cart and manage quantities.
Order Management: Orders are stored in the database for tracking.
Admin Panel: Admins can add, delete, and manage products.
User Authentication: Login and registration functionality for users.
Responsive Design: Optimized for desktop and mobile devices.
Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MySQL
Authentication: bcrypt for password hashing, express-session for session management
File Uploads: multer for handling product images
Installation
Prerequisites
Node.js installed on your system
MySQL database set up
Clone the repository:

Install dependencies:

Set up the database:

Create a MySQL database (e.g., ecommerce).
Import the provided SQL file (ecommerce.sql) to set up the tables.
Configure the database connection:
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'ecommerce',
});

Update the db.js file with your MySQL credentials
Start the server:
node server.js

Open the application in your browser:
Folder Structure
ecommerce/
├── public/                 # Static files (HTML, CSS, JS)
│   ├── index.html          # Homepage
│   ├── cart.html           # Cart page
│   ├── about.html          # About Us page
│   ├── contact.html        # Contact Us page
├── routes/                 # Backend routes
│   ├── auth.js             # Authentication routes
│   ├── cart.js             # Cart routes
│   ├── product.js          # Product routes
├── views/                  # Admin panel views
│   ├── admin.html          # Admin panel
├── db.js                   # Database connection
├── server.js               # Main server file
├── README.md               # Project documentation
Usage
Admin Panel
Navigate to admin.html.
Add, delete, or manage products.
User Features
Browse products on the homepage.
Add products to the cart.
Place orders.
Future Enhancements
Add payment gateway integration.
Implement order tracking.
Add user profile management.
Enhance the admin panel with analytics.
