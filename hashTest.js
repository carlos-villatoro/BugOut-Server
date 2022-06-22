const bcrypt = require('bcrypt')

const hashTest = async () => {
	try {
		// test hashing
		const password = 'asdfgsdgsdffghsdfgsdfg5w34etgsdfegv43gveazgsadfdsdffsdaasdffdasf3425234532542345234%#@^$#@%^$@#TASDGrvzsdfgbasdgvas'
		const saltRounds = 12
		const hashedPassword = await bcrypt.hash(password, saltRounds)
		console.log('the hashed password is:', hashedPassword)

		// match the hash to a string
		const matchPasswords = await bcrypt.compare('goodbye', hashedPassword)
		console.log('do they match?', matchPasswords)
	} catch (err) {
		console.log(err)
	}
}

hashTest()