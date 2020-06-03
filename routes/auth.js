const express = require('express')
const router = express.Router();

//@route GET api/Auth 
//@desc get Logged In User
//@access Private

router.get('/', (req, res)=>{
    res.send('get Logged In User')
})

//@route POST api/Auth 
//@desc Auth User & Get Token
//@access Public

router.post('/', (req, res)=>{
    res.send('Register a User')
})

module.exports = router;

