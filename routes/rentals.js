const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn')
const router = express.Router();
const {validateRental, Rental} = require('../models/rental')
const { Customer } = require('../models/customer')
const { Movie } = require('../models/movie')

Fawn.init(mongoose)

router.get('/', async (req, res) => {
    const rentals = await Movie.find().sort('name')
    res.send(rentals);
  });
  
  router.post('/', async (req, res) => {
    const { error } = validateRental(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');


    let rental = new Rental({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone
        },
        movie: {
            _id: movie._id,
            name: movie.name,
            dailyRentalRates: movie.dailyRentalRates
          }
    });
    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id : movie._id}, {
            $inc: {
                numberInStock: -1
            }
        }).run()

        res.send(rental);
    } catch (error) {
        res.status(500).send('something failes in server')
    }
    

    
  });
  
  router.put('/:id', async (req, res) => {
    const { error } = validateRental(req.body); 
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
  
  router.delete('/:id', async (req, res) => {
    const movie= await Movie.findByIdAndRemove(req.params.id)
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });
  

module.exports = router;