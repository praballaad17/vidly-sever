const mongoose = require('mongoose')
const Joi = require('joi');


const Customer =  mongoose.model('Customer',  mongoose.Schema({
    name: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 50
    },
    isGold: Boolean,
    phone: {
        type: Number,
        require: true,
        minlength: 10
    }
  }));


  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.number().required().min(10),
      isGold: Joi.required()
    };
  
    return Joi.validate(customer, schema);
  }
exports.validateCustomer= validateCustomer; 
exports.Customer = Customer