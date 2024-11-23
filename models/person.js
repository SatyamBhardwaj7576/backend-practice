// import mongoose from "mongoose";
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
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
  },
  username:{
    required: true,
    type: String,
  },
  password:{
    required: true,
    type: String,
  }

});

//password ko datbase me  save hone se phle bcrypt karna 
personSchema.pre('save', async function(next) {
  const person = this

  //hash the password only if it is new or it has been modified 
  if(!person.isModified('password')) next();
  try {
    //hash password generation
    const salt =await bcrypt.genSalt(10)

    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt)

    //Override the plain text password with hashed password 
    person.password = hashedPassword;

    next();
  } catch (error) {
    return next(error)
  }
})

personSchema.methods.comparePassword = async function(candidatePassword){
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch ;
    
  } catch (error) {
    throw error
  }
}

//create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;
