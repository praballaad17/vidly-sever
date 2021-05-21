const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
      type: String,
      unique: true,
      require: true
  },
  password: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 1024
  },
  isAdmin: Boolean
})

const User =  mongoose.model("User",  userSchema);

// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
//   return  token;
//   }

// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign({ _id: this._id}, process.env.JWT_PRIVATE_KEY);
//   return  token;
//   }

function generateAuthToken(user) {
   const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin},  process.env.JWT_PRIVATE_KEY);
   return token;
}

  function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).required(),
      password: Joi.string().min(5).max(255).required(),
      email: Joi.string().required().email()
    };
  
    return Joi.validate(user, schema);
  }

  exports.validateUser = validateUser
  exports.generateAuthToken = generateAuthToken
  exports.User = User
  