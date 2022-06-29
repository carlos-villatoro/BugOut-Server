const router = require('express').Router()
const { model } = require('mongoose')
const db = require('../models')

//GET /projects -- gets all the projects 
router.get('/', async (req, res) => {
    try {
        //find all projects in the db
        const findAllProjects = await db.Project.find({})
        //send them to the client
        res.json(findAllProjects)
    } catch (error) {
        res.status(500).json({ msg: 'server error' })
    }
})

//POST /projects -- creates a project
router.post('/', async (req, res) => {
    try {
        // console.log(req.body)
        //create the project in the db
        const newProject = await db.Project.create(req.body)
        console.log(req.body)
        const assignedUsers = req.body.users
        for (const user of assignedUsers) {
            // console.log(user)
            const foundUser = await db.User.findById({_id: user})
            // console.log(foundUser)
            foundUser.projects.push(newProject)
            await foundUser.save()
        }
        const manager = req.body.manager
        console.log(manager)
        const foundManager = await db.User.findById({_id: manager})
        foundManager.projects.push(newProject)
        await foundManager.save()
        // show it to user
        res.status(201).json(newProject)
    } catch (error) {
        console.log(error)
    }
})

//GET /projects/:id -- gets a specific project
router.get('/:id', async (req, res) => {
    try {
        // get specific project id from url params
        const id = req.params.id
        // find that specific project in the db using the id & all users assigned to it
        const findOneProject = await db.Project.findById(id).populate({ path: 'users' })
        // send project back to user
        res.json(findOneProject)
    } catch (error) {
        res.status(500).json({msg: 'server error'})
    }
})

//PUT /project/:id -- edits a specific project
router.put('/:id', async (req, res) => {
    try {
        //get id from the url params 
        const id = req.params.id
        // tell it to return the updated project
        const options = { new: true }
        //search for the id in the db, and update using the req.body
        const updateProject = await db.Project.findByIdAndUpdate(id, req.body, options)
        // send updated project back to the user
        res.json(updateProject)
    } catch (error) {
        res.status(500).json({msg: 'server error'})
    }


})

//DELETE /projects/:id -- deletes a specific project
router.delete('/:id', async (req, res) => {
    try {
        // get id of specific project from url params
        const id = req.params.id
        // delete the project from the db
        const deleteProject = await db.Project.findByIdAndDelete(id)
        // send no content status
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ msg: 'server error' })
    }
})

//POST /projects/:id/bugs -- create a bug in a specific project 
router.post('/:id/bugs', async (req, res) => {
    const id = req.params.id
    // find the project by id param
    const project = await db.Project.findById(id).populate({ path: 'bugs' })
    // create a new bug
    const newBug = await db.Bug.create(req.body)
    // add project to bug's project relationship
    newBug.project = project.id
    // add bug to project's bug relationship 
    project.bugs.push(newBug)
    // -- and save both
    await project.save()
    await newBug.save()
    // send back project with bug added
    res.status(201).json({newBug})
})

module.exports = router