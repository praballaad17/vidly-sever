const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {validateMovie, Movie} = require('../models/movie')
const { Genre } = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/',  async (req, res) => {
    const movies = await Movie.find().sort('name')
    res.send(movies);
  });
  
  router.post('/', auth, async (req, res) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');


    const movie = new Movie({
      name: req.body.name,
      numberInStock: req.body.numberInStock,
      dailyRentalRates: req.body.dailyRentalRates,
      genre: {
          _id: genre._id,
          name: genre.name
        }
    });
    await movie.save();
    res.send(movie);
  });
  
  router.put('/:id', auth, async (req, res) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, 
        { 
            name: req.body.name,
            numberInStock: req.body.numberInStock,
            dailyRentalRates: req.body.dailyRentalRates,
            genre: {
                _id: genre._id,
                name: genre.name
              }
        }, {
      new: true
    })
    
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
  });
  
  router.delete('/:id', [auth, admin], async (req, res) => {
    const movie= await Movie.findByIdAndRemove(req.params.id)
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });
  

module.exports = router;