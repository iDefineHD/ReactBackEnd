const express = require('express')
const router = express.Router();

//@route GET api/Contacts 
//@desc get All User Contacts
//@access Private

router.get('/', (req, res)=>{
    res.send('get all user contacts')
})

//@route POST api/Contacts 
//@desc Add New Contacts
//@access Private

router.post('/', (req, res)=>{
    res.send('Add Contact')
})

//@route PUT api/Contacts/:id
//@desc Update Contact
//@access Private

router.put('/:id', (req, res)=>{
    res.send('Update Contact')
})

//@route PUT api/Contacts/:id
//@desc Delete Contact
//@access Private

router.delete('/:id', (req, res)=>{
    res.send('Delete Contact')
})

module.exports = router;

