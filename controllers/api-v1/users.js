const router = require('express').Router()

// POST /users/register -- CREATE a new user
router.post('/register', (req, res) => {
	res.json({ msg: 'register a user' })
})

// POST /users/login -- validate login credentials
router.post('/login', (req, res) => {
	res.json({ msg: 'login a user' })
})

// GET /users/auth-locked -- checks users credentials and only send back privlaged information if the user is logged in properly
router.get('/auth-locked', (req, res) => {
	res.json({ msg: 'welcome to the secret auth-locked route 👋' })
})

module.exports = router