const express = require('express');
const mongoose = require('mongoose')

const Vidly = mongoose.connect('http://localhost:4700/vidly');

const genreSchema = new mongoose.Schema({
    name: String,
    
})
