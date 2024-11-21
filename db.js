const mongoose = require('mongoose')

//Define the mongoDb connection url

//const mongoURL = 'mongodb://localhost:27017/hotels'
//Replce hotels with your database 

const mongoURL = 'mongodb+srv://satyam:satyam123@cluster0.wsqbc.mongodb.net/hotels'
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

//Define event listners for the databse connection

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
} )

db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB server');
})

db.on('error',(err)=>{
    console.log('Error', err)
})

//Exports the databse connection

module.exports = db;
