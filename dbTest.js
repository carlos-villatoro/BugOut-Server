const db = require('./models')
const project = require('./models/project')

// testing user CREATE
// db.User.create({
// 		name: 'grunt 2',
// 		email: 'g2@g.com',
// 		password: '1234',
// 		role: "member"	
// 	})
// 	.then(user => {
// 		console.log('what up test boi!!!', user)
// 	})
// 	.catch(console.warn)

// db.Project.create({
// 		name: 'Project 2',
// 		language: 'react',
// 		description: '2nd project',
// 		notes: 'hello',
// 		priority: 4
// 	})
// 	.then(project => {
// 		console.log(project)
// 	})
// 	.catch(console.warn)
const usersProjectsRel = async () => {
	try {
		const user = await db.User.findOne({id: "62b6249d74a4224e8bfb3feb"})
		const project = await db.Project.findOne({id: "62b6262850a78d04a38e42d8"})
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