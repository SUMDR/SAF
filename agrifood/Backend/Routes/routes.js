const  router =require('express').Router();
const passport = require('passport')





router.get('/google',passport.authenticate('google',{
   
    scope:['profile','email'],
    session:false,
    credentials:'include'
}),(req,res)=>{
    console.log("auth/google")
})

router.get('/google/redirect',passport.authenticate('google',{session:false}),(req,res)=>{

    res.redirect('http://localhost:3000')

})


module.exports =router;