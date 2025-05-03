const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));        // serve public static files
app.use('/uploads', express.static('uploads'));  // serve uploads folder
app.use('/views', express.static('views')); // serve views statically

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Root page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Optional: direct route for admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
