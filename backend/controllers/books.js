const Book = require("../models/book");

exports.addNewBook = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre
    });
    book.save().then(createdBook => {
        res.status(201).json({
            message: "New book added to DB",
            book: {
                ...createdBook,
                id: createdBook._id
            }
        });
    }).catch(error => {
        res.status(500).json({
            message: "Saving book failed " + error
        })
    })
};


exports.deleteBook = (req, res, next) => {
    Book.findByIdAndDelete(
        req.params.id
    )
    .then(result => {
        if(result.error) {
            res.status(500).json({
                message: "Not deleted!"
            });
        } else {
            res.status(200).json({
                message: "Book is deleted!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Book is not deleted." + error
        })
    })
};

exports.getBook = (req, res, next) => {
    Book.findById(req.params.id)
    .then(book => {
        console.log(book)
        if(book) {
            res.status(200).json(book)
        } else {
            res.status(500).json({
                message: "Book not found."
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Fetching book failed" + error
        })
    })
};

exports.getBooks = (req, res, next) => {
    let fetchedBooks;
    Book.find().then(documents => {
        fetchedBooks = documents
        res.status(200).json({
            message: "Books fetched successfully",
            books: fetchedBooks
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Books couldn't be fetched" + error
        })
    })
};

exports.getBooksByGenre = (req, res, next) => {
    let fetchedBooks;
    Book.find({ genre: req.params.genre }).then(documents => {
        console.log(req.body.genre)
        fetchedBooks = documents
        res.status(200).json({
            message: "Books are filtered",
            books: fetchedBooks
        })
    }).catch(error => {
        res.status(500).json({
            message: "Mission failed" + error
        })
    })
};

exports.editBook = (req, res, next) => {
    //creating book object taking data from received request
    const book = new Book({
        _id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre
    });
    //update given book with newly created obj
    Book.findByIdAndUpdate(req.params.id, book)
    .then(result => {
        if(result.error) {
            res.status(404).json({
                message: "Book changes couldn't be saved"  
            })
        } else {
            res.status(200).json({
                message: "Book is edited"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message:"Editing failed." + error
        })
    })

};
