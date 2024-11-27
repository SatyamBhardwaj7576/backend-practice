const express = require("express");
const router = express.Router();

const Person = require("./../models/person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
// const MenuItem = require('../models/menu_item');

//post route to add a person data
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    //Assuming the req body contains the person data

    //creates the new person document using the mongoose model

    const newPerson = new Person(data);

    //save the new person to the database

    const savedPerson = await newPerson.save();

    console.log("Data is saved to database ");

    const payload = {
      id: savedPerson.id,
      username: savedPerson.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("token : ", token);
    res.status(200).json({ savedPerson: savedPerson, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}),
  //Login router
  router.post("/login", async (req, res) => {
    try {
      //Extract username and password from request body
      const { username, password } = req.body;

      //check the user is in our database or not
      const user = await Person.findOne({ username: username });
      //if user doesnot exist or password doesnot match ,return error

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid username or Password" });
      }
      //generate Token
      const payload = {
        id: user.id,
        username: user.username,
      };
      const token = generateToken(payload);

      //return token as the response
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
//Profile route 
router.get('/profile',jwtAuthMiddleware,async (req, res) => {
  try {
    const userData = req.user
    console.log("User Data : ",userData )


    const userId = userData.id

    const user = await Person.findById(userId)

    res.status(200).json({user})

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });

  }
})  

//Get method to get the person
router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}),
  router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType; //extract the work type from the url parameter
      if (
        workType == "chef" ||
        workType == "manager" ||
        workType == "waiter" ||
        workType == "Software Engineer"
      ) {
        const response = await Person.find({ work: workType });
        console.log("response fetched");
        res.status(200).json({ response });
      } else {
        res.status(404).json("Invalid work type");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }),
  (module.exports = router);
