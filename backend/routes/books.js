const express = require("express");

const BookController = require("../controllers/books");


const router = express.Router();

router.post("", BookController.addNewBook);

router.get("/:id", BookController.getBook);

router.get("", BookController.getBooks);

router.delete("/:id", BookController.deleteBook);

router.put("/:id", BookController.editBook);

module.exports = router;