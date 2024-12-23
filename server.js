const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.json());

const passport = require('./auth');

//const Person = require('./models/person')
const PORT = process.env.PORT || 3000;

//Middleware functions
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to :${req.originalUrl}`)
  next();//Move on the next phase 
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get('/', function (req, res) {
  res.send('Hello bhai log kaise ho sbb log??')
})

// app.get('/satty',(req, res)=> {
//     var person = {
//         name:"Satyam Bhardwaj",
//         age:"20",
//         hobbies:"playing ,singing , running",
//         college : "IIIT ",
//         job : "Web Developer"
        

//     }
//     res.send (person);
// })



// app.post('/menu-item',async(req, res)=>{
//   try {
//     const data = req.body
//     const newMenu = new MenuItem(data);
//     const savedNewMenu = await newMenu.save();
//     console.log ('Data is saved to database ' );
//     res.status(200).json(savedNewMenu);
    
//   } catch (error) {
//     console.log (error);
//     res.status(500).json({ error:'Internal Server Error' });
//   }
// })

//Now fetching the data from the database






//Import the router files

const personRoutes = require('./routes/personRoutes')
const menu_itemRoutes = require('./routes/menu_itemRoutes')

//use the router
app.use('/person',personRoutes);
app.use('/menu-item',menu_itemRoutes);



app.listen(PORT,()=>{
    console.log("App is listening on port 8000")
})