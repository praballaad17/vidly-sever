const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express');
const _ = require('lodash')
const router = express.Router();
const {validateUser, User, generateAuthToken} = require('../models/user')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.send(user);
})
  
  router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user  = await User.findOne({ email: req.body.email})
    if (user) return res.status(400).send('User is already registerd.');


     user = new User(_.pick(req.body, ['name', 'email', 'password']));
     const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
 
     await user.save();

    // const token = jwt.sign({ _id: user._id}, process.env.JWT_PRIVATE_KEY);
     const token = generateAuthToken(user);
     res.header('x-auth-token',token).send(_.pick(user, ['_id', 'name', 'email']));

  });
  
 

module.exports = router;