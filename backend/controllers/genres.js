const Genre = require("../models/genre");

exports.addNewGenre = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const genre = new Genre({
        name: req.body.name
    });
    genre.save().then(addedGenre => {
        res.status(201).json({
            message: "Genre added successfully",
            genre: {
                ...addedGenre,
                id: addedGenre._id
            }
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Adding failed"
        })
    })
}

exports.getGenre = (req, res, next) => {
    Genre.findById(req.params.id).then(genre => {
        if(genre) {
            res.status(200).json({
                message: "Genre fetched",
                genre
            })
        } else {
            res.status(404).json({
                message: "Genre not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Fetching failed" + error
        })
    })
}

exports.getAllGenres = (req, res, next) => {
    let fetchedGenres;
    Genre.find().then(documents => {
        fetchedGenres = documents;
        res.status(200).json({
            message: "Genres fetched successfully",
            genres: fetchedGenres
        })
    }).catch(error => {
        res.status(500).json({
            message: "Fetching genres failed" + error
        })
    })
}

