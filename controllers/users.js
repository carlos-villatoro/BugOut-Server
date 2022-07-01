const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')

// POST /users/register -- CREATE a new user
router.post('/register', async (req, res) => {
	try {
		// check if the user exists already
		const findUser = await db.User.findOne({
			email: req.body.email
		})

		// disallow users from registering twice
		if (findUser) {
			// stop the route and send a response saying the user exists
			return res.status(400).json({ msg: 'email exists already 🤦‍♂️' })
		}

		// hash the user's password
		const password = req.body.password
		const saltRounds = 12
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		// create a new user with the hashed password
		const newUser = new db.User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			role: req.body.role
		})
		await newUser.save()
		console.log('new user registered')
		// sign the user in by sending a valid jwt back
		// create the jwt payload
		const payload = {
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
			id: newUser.id
		}
		// sign the token and send it back
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }) // expires in one day
		res.json({ token })
	} catch (err) {
		console.warn(err)
		// handle validation errors
		if (err.name === "ValidationError") {
			res.status(400).json({ msg: err.message })
		} else {
			// handle all other errors
			res.status(500).json({ msg: 'server error 500' })
		}
	}
})

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
	try {
		// all the data will come in on the req.body
		// try to find the user in the database
		const foundUser = await db.User.findOne({
			email: req.body.email
		})
		const noLoginMessage = 'Incorrect email or password.'

		// if the user is not found, return send a status of 400 let the user know login failed
		if (!foundUser) {
			console.log('incorrect email', req.body)
			return res.status(400).json({ msg: noLoginMessage })
		}

		// check if the supplied password matches the hash in the db
		const passwordCheck = await bcrypt.compare(req.body.password, foundUser.password)
		// if they do not match, return and let the user know that login has failed
		if (!passwordCheck) {
			console.log('incorrect password', req.body)
			return res.status(400).json({ msg: noLoginMessage })
		}

		// create a jwt payload
		const payload = {
			name: foundUser.name,
			email: foundUser.email,
			role: foundUser.role,
			id: foundUser.id
		}
		// sign the jwt and send it back
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })

		res.json({ token })
	} catch (err) {
		// don't forget to handle your errors
		console.warn(err)
		res.status(500).json({ msg: 'Server room is on fire 🔥' })
	}

})


router.get('/', async (req, res) => {
	const users = await db.User.find({})
	res.json(users)
})

// router.get('/:id', async (req, res) => {
// 	const user = await db.User.findById(req.params.id)
// 	res.json(user)
// })

// GET /users/auth-locked -- checks users credentials and only send back privileged information if the user is logged in properly
router.get('/profile', authLockedRoute, async (req, res) => {
	// console.log('current user is:', res.locals.user)ß
	// res.json({ msg: 'welcome to the secret auth-locked route 👋' })
	const userId = res.locals.user._id
	// console.log(res.locals.user._id)
	const user = await db.User.findById(userId).populate({path: 'projects'})
	// console.log(userId)
	res.json(user)
})


module.exports = router