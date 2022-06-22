const jwt = require('jsonwebtoken')

// tokens that are not verified will throw and error to the catch
try {
	// create a jwt 'payload' (the info that you want to encode in the token)
	// user data from the db
	const payload = {
		name: 'test boi',
		email: 'test@boi.com',
		// NO PASSWORD
		id: 'hi I am the user\'s id'
	}
	// this is a jwt
	// part one, how the jwt in encoded: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
	// the eoncode paylod (all the user data): eyJuYW1lIjoidGVzdCBib2kiLCJlbWFpbCI6InRlc3RAYm9pLmNvbSIsImlkIjoiaGkgSSBhbSB0aGUgdXNlcidzIGlkIiwiaWF0IjoxNjU1OTI0MTk0LCJleHAiOjE2NTU5MzAxOTR9.
	// signature we created with the secret: wbm4AgpjLPkdcToZpkEQquT0qptRiKiC4kRsoalsCyk
	// sign and encode our jwt payload
	// jwt.sign(data to encode, secret to sign with, options object)
	const token = jwt.sign(payload, 'my super duper big secret', { expiresIn: 60 * 100 })
	console.log(token)

	const decode = jwt.verify(token, 'not my secret')
	console.log('decoded payload:', decode)
} catch (err) {
	console.log('jwt error', err)
}