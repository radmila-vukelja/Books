const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Book = require('./models/book');

const app = express();


mongoose.connect("mongodb+srv://admin:admin@cluster0.tiv7z.mongodb.net/Library?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Not connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, OPTIONS, DELETE");
    next();
});

app.post("/api/books", (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    });
    book.save();
    res.status(201).json({
        message: 'Book created. All OK'
    })
});

app.get("/api/books", (req, res, next) => {
    Book.find()
    .then(documents => {
        res.status(200).json({
            message: 'Books fetched successfully',
            books: documents
        });
    });
    
});


module.exports = app;