const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Contacts = require('../models/Contacts')

//@route GET api/Contacts
//@desc get All User Contacts
//@access Private

router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contacts.find({ user: req.user.id }).sort({ date: -1 })
		res.json(contacts)
	} catch (err) {
		console.log(err)
		res.status(500).json({ msg: 'Server Error' })
	}
})

//@route POST api/Contacts
//@desc Add New Contacts
//@access Private

router.post('/', [ auth, [ check('name', 'name is required').not().isEmpty() ] ], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	const { name, email, phone, type } = req.body

	try {
		const newContact = new Contacts({
			name,
			email,
			phone,
			type,
			user: req.user.id,
		})

		const contact = await newContact.save()
		res.json(contact)
	} catch (err) {
		console.log(err)
	}
})

//@route PUT api/Contacts/:id
//@desc Update Contact
//@access Private

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
	const {name, email, phone, type} = req.body;
  
	// Build contact object
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;
  
	try {
	  let contact = await Contacts.findById(req.params.id);
  
	  if (!contact) return res.status(404).json({msg: 'Contact not found'});
  
	  // Make sure user owns contact
	  if (contact.user.toString() !== req.user.id) {
		return res.status(401).json({msg: 'Not authorized'});
	  }
  
	  contact = await Contacts.findByIdAndUpdate(
		req.params.id,
		{$set: contactFields},
		{new: true},
	  );
  
	  res.json(contact);
	} catch (err) {
	  console.error(er.message);
	  res.status(500).send('Server Error');
	}
  });
  

//@route PUT api/Contacts/:id
//@desc Delete Contact
//@access Private

router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contacts.findById(req.params.id)
		if (!contact) return res.status(404).json({ msg: 'Contact Not Found' })

		//Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not Authorized' })
		}

		await Contacts.findByIdAndRemove(req.params.id)

		res.json({ msg: 'Contact Removed' })
	} catch (err) {
		console.log(err)
		res.status(500).json({ msg: 'Server Error' })
	}
})

module.exports = router
