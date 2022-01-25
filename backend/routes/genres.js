const express = require("express");

const GenreController = require('../controllers/genres');

const router = express.Router();

router.get("", GenreController.getAllGenres);

router.get("/:id", GenreController.getGenre);

router.post("", GenreController.addNewGenre)


module.exports = router;