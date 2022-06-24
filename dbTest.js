const db = require('./models')
const project = require('./models/project')

// testing user CREATE
// db.User.create({
// 		name: 'admin',
// 		email: 'man@ger.com',
// 		password: '1234',
// 		role: "manager"	
// 	})
// 	.then(user => {
// 		console.log('what up test boi!!!', user)
// 	})
// 	.catch(console.warn)

// db.Project.create({
// 		name: 'Project 3',
// 		language: 'python',
// 		description: '3rd project',
// 		notes: 'hello',
// 		priority: 5
// 	})
// 	.then(project => {
// 		console.log(project)
// 	})
// 	.catch(console.warn)
	
const usersProjectsRel = async () => {
	try {
		const user = await db.User.findOne({id: "62b629adf35d9fc967affc73"}).populate({path: 'projects'})
		const project = await db.Project.findOne({id: "62b629e9cd12d5a29b52189d"}).populate({path: 'users'})
		// user.projects.push(project)
		// await user.save()
		// project.users.push(user)
		// await project.save()
		console.log(user, project)
		
	} catch (error) {
		console.warn(error)
	}
}
usersProjectsRel()