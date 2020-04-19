require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        title: "Hello from Ramesh",
        email: "ramesh@gmail.com"
    },
    {
        title: "professional",
        email: "ramesh@test.com"
    }
];

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(f => f.email == req.user.email));
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

app.listen(3000)
