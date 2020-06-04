const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	//Get Token From Header
	const token = req.header('x-auth-token')

	//Check if no token
	if (!token) {
		return res.status(401).json({ msg: 'No Token, Authorization Denied' })
	}

	try {
		const decoded = jwt.verify(token, 'Totally Not A Secret')
		req.user = decoded.user
		next()
	} catch (err) {
		console.log(err)
		return res.status(401).json({ msg: 'Token is Not Valid, Authorization Denied' })
	}
}
