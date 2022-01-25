const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Book = require('./models/book');
const User = require('./models/user');


const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const genreRoutes = require('./routes/genres');

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

app.use("/api/books", booksRoutes);
app.use("/api/users", userRoutes);
app.use("/api/genres", genreRoutes);

module.exports = app;
