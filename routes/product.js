const express = require('express');
const db = require('../db');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send('Error fetching products');
        res.json(results);
    });
});

router.post('/add', upload.single('image'), (req, res) => {
    const { name, description, price } = req.body;
    const image = req.file.filename;
    db.query('INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
        [name, description, price, image], (err) => {
            if (err) return res.status(500).send('Error adding product');
            res.send('Product added');
        });
});
router.post('/delete', (req, res) => {
    const { id } = req.body; // Get the product ID from the request body
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send('Error deleting product');
        res.send('Product deleted successfully');
    });
});

module.exports = router;