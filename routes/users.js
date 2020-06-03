const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

//@route POST api/Users 
//@desc register user
//@access public

router.post('/', [
    check('name', 'name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with the minimum characters of 6').isLength({ min: 6 })
], async (req, res)=>{
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()})
   }

   const { name, email, password} = req.body;

   try {
       let user = await User.findOne({email})
       if(user) {
        return res.status(400).json({msg: "User Already Exists"})
       }

       user = new User({
           name,
           email,
           password
       })

       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);
       await user.save();

       const payload = {
           user: {
               id: user.id
           }
       }

       jwt.sign(payload, 'Totally Not A Secret', {
           expiresIn: 360000, //3600 is an Hour
       }, (err, token)=> {
           if(err) throw err;
           res.json({ token })
       })

   } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')
   }
})

module.exports = router;

