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
    res.send('get /projects/:id')
})

//PUT /project/:id -- edits a specific project
router.put('/:id', async (req, res) => {
    res.send('edit /projects/:id')
})

//DELETE /projects/:id -- deletes a specific project
router.delete('/:id', async (req, res) => {
    res.send('delete /projects/:id')
})

//POST /projects/:id/bugs -- create a bug in a specific project 
router.post('/:id/bugs', async (req, res) => {
    res.send('create a /projects/:id/bugs')
})

module.exports = router