const mongoose = require('mongoose');
require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const Joi = require('joi')
const router = express.Router();
const { User, generateAuthToken} = require('../models/user')
const bcrypt = require('bcrypt')
  
  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user  = await User.findOne({ email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password.');

    const  validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid password.');

    //const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
    // const token = jwt.sign({ _id: user._id}, process.env.JWT_PRIVATE_KEY);
    const token = generateAuthToken(user);
    res.send(token)
  });
  
  function validate(req) {
    const schema = {
      password: Joi.string().min(5).max(255).required(),
      email: Joi.string().required().min(5).max(255).email()
    };
  
    return Joi.validate(req, schema);
  }
 

module.exports = router;