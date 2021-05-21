const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const { genreSchema} = require('./genre')


const Rental =  mongoose.model('rentals',  mongoose.Schema({
    customer: { 
        type: mongoose.Schema(
            {
                name: {
                    type: String,
                    require: true,
                    minlength: 5,
                    maxlength: 50
                },
                IsGold: {
                    type: Boolean,
                    require: true
                },
                phone: {
                    type: Number,
                    require: true
                }
    }) },
    movie: { 
        type: mongoose.Schema(
            {
                name: {
                    type: String,
                    require: true,
                    minlength: 5,
                    maxlength: 50
                },
                dailyRentalRates: {
                    type: Number,
                    require: true
                }
    }) },
   
  }));

  function validateRental(rental) {
    const schema = {
      customerId: Joi.objectId().required(),
      movieId: Joi.objectId().required()
    };
  
    return Joi.validate(rental, schema);
  }

  exports.validateRental = validateRental
  exports.Rental = Rental