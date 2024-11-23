//sets a passport with a local authentication strategy ,using a person model for use 

const passport = require('passport');
const LocalStratgey = require('passport-local').Strategy
const Person = require('./models/person')

passport.use(new LocalStratgey(async(USERNAME,PASSWORD,done)=>{
    //authentication logic
    try {
    //console.log('Reccived Corriendentials :' , USERNAME, PASSWORD);
    const user = await Person.findOne({username : USERNAME})
    if(!user){
      return done(null,false,{message : 'Incorrect username'});
    }
    // const ispasswordMatch = user.password === PASSWORD ? true : false;
    //comparePassword wala function personSchema ke andar bna hua hai
    const ispasswordMatch =await user.comparePassword(PASSWORD)
    if(ispasswordMatch){
      return done(null,user)
    }
    else{
      return done(null ,false ,{message : 'Incorrect Password'})
    }
      
    } catch (error) {
      return done(error)
    }
  }));

  module.exports = passport;
  
  

