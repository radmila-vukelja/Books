const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, OPTIONS, DELETE');
    next();
});

app.use("/api/books", (req, res, next) => {
    const books = [
        { id: 'sefae', title: 'back title', author: 'back author', description: 'back desc' },
        { id: 'dj4923q0dfj[', title: 'back title2', author: 'b2ack author', description: 'back2 desc' },
    ]
    res.status(200).json({
        message: 'Books fetched successfully',
        books: books
    });
});


module.exports = app;