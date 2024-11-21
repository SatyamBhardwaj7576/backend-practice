const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/menu_item')

router.post('/',async(req, res)=>{
    try {
      const data = req.body
      const newMenu = new MenuItem(data);
      const savedNewMenu = await newMenu.save();
      console.log ('Data is saved to database ' );
      res.status(200).json(savedNewMenu);
      
    } catch (error) {
      console.log (error);
      res.status(500).json({ error:'Internal Server Error' });
    }
  }),

  router.get('/',async(req,res)=>{
    try {
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json({ data: data });
       
    } catch (error) {
      console.log (error);
      res.status(500).json({ error:'Internal Server Error' });
    }
  }),

  router.get('/:tasteType',async(req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet'||tasteType == 'spicy'||tasteType=='sour'){
            const response = await MenuItem.find({taste: tasteType})
            console.log('response fetched')
            res.status(200).json({response });

        }
        else{
            res.status(404).json("Invalid taste type");
        }
        
    } catch (error) {
      console.log (error);
      res.status(500).json({ error:'Internal Server Error' }); 
    }
  })

  module.exports = router;