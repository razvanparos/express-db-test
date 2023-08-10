const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqldbpassword',
    database: 'SampleApp',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:8080'
}));

// Routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });

    // res.status(200).json({ message: 'Login successful' }); // Dummy response
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Registration successful' });
    });
    // res.status(201).json({ message: 'Registration successful' }); // Dummy response
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
