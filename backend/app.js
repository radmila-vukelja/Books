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


app.get("/api/books", (req, res, next) => {
    Book.find()
    .then(documents => {
        res.status(200).json({
            message: 'Books fetched successfully',
            books: documents
        });
    });
    
});

app.get("/api/books/:id",  (req, res, next) => {
    Book.findById(req.params.id).then(book => {
        if(book) {
            console.log(book)
            res.status(200).json(book);
        } else {
            console.log("Here")
            res.status(404).json({
                message: "Book not found!"
            });
        }
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Getting book failed"
        });
    });
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



app.put("/api/books/:id", (req, res, next) => {
    const book = new Book({
        _id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    });
    console.log(book)
    Book.updateOne({
        _id: req.params.id},
        book
    )
    .then(result => {
        if(result.modifiedCount){
            (res.status(200).json({
                message: "Update successful"
            }))
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Update failed"
        })
    }) 
}) 

app.delete("/api/books/:id", (req, res, next) => {
    Book.deleteOne({
        _id: req.params.id
    })
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Book deleted'
        })
    })
   
})


module.exports = app;