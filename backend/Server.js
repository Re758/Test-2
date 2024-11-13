const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Walter_cafe_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Products API
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/products', (req, res) => {
    const { name, description, category, price, quantity } = req.body;
    db.query('INSERT INTO products (name, description, category, price, quantity) VALUES (?, ?, ?, ?, ?)', [name, description, category, price, quantity], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...req.body });
    });
});

// Update and Delete products
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, category, price, quantity } = req.body;
    db.query('UPDATE products SET name = ?, description = ?, category = ?, price = ?, quantity = ? WHERE id = ?', [name, description, category, price, quantity, id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Users API
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...req.body });
    });
});

// Update and delete user
app.put('/api/users/:username', (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    db.query('UPDATE users SET password = ? WHERE username = ?', [password, username], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.delete('/api/users/:username', (req, res) => {
    const { username } = req.params;
    db.query('DELETE FROM users WHERE username = ?', [username], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});