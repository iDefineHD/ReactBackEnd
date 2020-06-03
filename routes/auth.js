const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

//@route GET api/Auth
//@desc get Logged In User
//@access Private

router.get(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with the minimum characters of 6').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			let user = await User.findOne({ email })

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' })
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' })
			}

			const payload = {
				user: {
					id: user.id,
				},
			}

			jwt.sign(
				payload,
				'Totally Not A Secret',
				{
					expiresIn: 360000, //3600 is an Hour
				},
				(err, token) => {
					if (err) throw err
					res.json({ token })
				},
			)
		} catch (err) {
			console.log(err)
			return res.status(500).json({ msg: 'Server Error' })
		}
	},
)

//@route POST api/Auth
//@desc Auth User & Get Token
//@access Public

router.post('/', (req, res) => {
	res.send('Register a User')
})

module.exports = router
