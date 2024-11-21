// import mongoose from "mongoose";
const mongoose = require('mongoose')

//Defining the Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    required: true,
    enum: ["chef", "waiter", "manager" ,"Software Engineer"],
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,

  },
  address:{
    type: Object,
  },
  salary:{
    type:Number,
    required: true,
  }

});

//create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;
