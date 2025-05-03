const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword], (err) => {
            if (err) return res.status(500).send('Error registering user.');

            // ✅ send HTML response with redirect after 3 seconds
            res.send(`
                <html>
                    <head>
                        <meta http-equiv="refresh" content="3;url=/login.html" />
                        <title>Registration Successful</title>
                    </head>
                    <body>
                        <h1>User registered successfully!</h1>
                        <p>You will be redirected to login page in 3 seconds...</p>
                        <p>If not, <a href="/login.html">click here</a>.</p>
                    </body>
                </html>
            `);
        });
});


router.post('/login', (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    console.log('Email being queried:', email);

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal server error');
        }
        if (results.length === 0) {
            console.log('No user found with email:', email);
            return res.status(401).send('Invalid credentials');
        }

        const user = results[0];
        console.log('User found:', user);

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.userId = user.id;
            console.log('Login successful for user ID:', user.id);
            res.redirect('/index.html'); // Redirect to the home page after login
        } else {
            console.log('Password mismatch for user ID:', user.id);
            res.status(401).send('Incorrect password');
        }
    });
});
module.exports = router;