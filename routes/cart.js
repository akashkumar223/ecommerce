const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/add', (req, res) => {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
        return res.status(400).send('Missing product_id or quantity');
    }

    db.query(
        'INSERT INTO cart (user_id,product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
        [user_id,product_id, quantity, quantity],
        (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Error adding to cart');
            }
            res.send('Product added to cart');
        }
    );
});

module.exports = router;