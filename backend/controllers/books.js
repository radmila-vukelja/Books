const Book = require("../models/book");

exports.addNewBook = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
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
            message: "Saving book failed."
        })
    })
};


exports.deleteBook = (req, res, next) => {
    //console.log("Delete is called")
    Book.deleteOne({
        _id: req.params.id
    })
    .then(result => {
        if(result.deletedCount > 0) {
            console.log(result)
            res.status(200).json({
                message: "Post deleted!"
            });
        } else {
            console.log(result)
            res.status(404).json({
                message: "Not deleted!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Book is not deleted."
        })
    })
};

exports.getBook = (req, res, next) => {
    Book.findById(req.params.id)
    .then(book => {
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
            message: "Books couldn't be fetched"
        })
    })
};

exports.editBook = (req, res, next) => {
    //creating book object taking data from received request
    const book = new Book({
        _id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    });
    //update given book with newly created obj
    Book.updateOne({ _id: req.params.id }, book)
    .then(result => {
        if(result.modifiedCount > 0) {
            res.status(200).json({
                message: "Book is edited"
            })
        } else {
            res.status(404).json({
                message: "Book changes couldn't be saved"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message:"Editing failed."
        })
    })

};