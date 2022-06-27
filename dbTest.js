const db = require('./models')
const project = require('./models/project')

// testing user CREATE
// db.User.create({
// 	name: 'admin',
// 	email: 'man@ger.com',
// 	password: '1234',
// 	role: "manager"
// })
// .then(user => {
// 	console.log('what up test boi!!!', user)
// })
// 	.catch(console.warn)

// db.Project.create({
// 	name: 'Project 3',
// 	language: 'python',
// 	description: '3rd project',
// 	notes: 'hello',
// 	priority: 5
// })
// 	.then(project => {
// 		console.log(project)
// 	})
// 	.catch(console.warn)

//testing bug CREATE
// db.Bug.create({
// 	name: 'CSS',
// 	notes: 'the nav bar is off center',
// 	priority: 2
// })
// 	.then(bug => {
// 		console.log("Bug!", bug)
// 	})
// 	.catch(console.warn)


const usersProjectsRel = async () => {
	try {
		const user = await db.User.findOne({ id: "62b9f21c611277c7b1c75dab" }).populate({ path: 'projects' })
		const project = await db.Project.findOne({ id: "62ba1d8123fc3f3434662234" }).populate({ path: 'users' })
		// const bug = await db.Bug.find({})
		user.projects.push(project)
		await user.save()
		project.users.push(user)
		await project.save()
		console.log(user, project)

	} catch (error) {
		console.warn(error)
	}
}


usersProjectsRel()