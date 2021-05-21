const mongoose = require('mongoose')
const Joi = require('joi')
const { genreSchema} = require('./genre')


const Movie =  mongoose.model('Movie',  mongoose.Schema({
    name: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 50
    },
    numberInStock: Number,
    dailyRentalRates: Number,
    genre: {
        type: genreSchema,
        require: true
    }
  }));

  function validateMovie(movie) {
    const schema = {
      name: Joi.string().min(3).required(),
      numberInStock: Joi.number().required().min(0).max(255),
      dailyRentalRates: Joi.number().required().min(0).max(255),
      genreId: Joi.required()
    };
  
    return Joi.validate(movie, schema);
  }

  exports.validateMovie = validateMovie
  exports.Movie = Movie