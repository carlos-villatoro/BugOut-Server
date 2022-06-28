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
        //create the project in the db
        const newProject = await db.Project.create(req.body)
        res.status(201).json(newProject)
    } catch (error) {
        console.log(error)
    }
})

//GET /projects/:id -- gets a specific project
router.get('/:id', async (req, res) => {
    try {
        const findOneProject = await db.Project.findById(req.params.id).populate({ path: 'users' })

        res.json(findOneProject)
    } catch (error) {

    }
})

//PUT /project/:id -- edits a specific project
router.put('/:id', async (req, res) => {
    try {
        //get id from the url params 
        //search for the id in the db, and update using the req.body
        const options = { new: true }
        const updateProject = await db.Project.findByIdAndUpdate(req.params.id, req.body, options)

        res.json(updateProject)
    } catch (error) {
        res.status(500).json({})
    }


})

//DELETE /projects/:id -- deletes a specific project
router.delete('/:id', async (req, res) => {
    try {
        const deleteProject = await db.Project.findByIdAndDelete(req.params.id)

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ msg: 'server error' })
    }
})

//POST /projects/:id/bugs -- create a bug in a specific project 
router.post('/:id/bugs', async (req, res) => {
    // find the project by id param

    // create a new bug
    const newBug = await db.Bug.create(req.body)
    // add bug to project's bug relationship -- and save
})

module.exports = router