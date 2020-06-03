const express = require('express')
const router = express.Router();

const User = require('../models/User')

//@route POST api/Users 
//@desc register user
//@access public

router.post('/', (req, res)=>{
    res.send('registers user')
})

module.exports = router;

