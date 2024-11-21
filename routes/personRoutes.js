const express = require('express');
const router = express.Router();

const Person = require('./../models/person');
// const MenuItem = require('../models/menu_item');

//post route to add a person data 
router.post('/',async(req,res) =>{
    try {
       const data = req.body
       //Assuming the req body contains the person data 
  
       //creates the new person document using the mongoose model
  
       const newPerson = new Person(data);
      
       //save the new person to the database 
  
       const savedPerson = await newPerson.save();
  
       console.log ('Data is saved to database ' );
       res.status(200).json(savedPerson);
  
      
    } catch (error) {
      console.log (error);
      res.status(500).json({ error:'Internal Server Error' });
      
    }
  }),


  router.get('/',async(req, res) => {
    try {
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json({ data: data });
      
    } catch (error) {
      console.log (error);
      res.status(500).json({ error:'Internal Server Error' });
    }
  }),

  router.get('/:workType',async(req,res)=>{
    try {
      const workType = req.params.workType ;//extract the work type from the url parameter 
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter' || workType == 'Software Engineer'){
        const response = await Person.find({work: workType})
        console.log('response fetched')
        res.status(200).json({response });
      }
      else{
        res.status(404).json("Invalid work type");
      }
      
    } catch (error) {
      console.log (error);
      res.status(500).json({ error:'Internal Server Error' });
    }
  }),


  module.exports = router;