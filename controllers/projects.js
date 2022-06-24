const router = require('express').Router()
const db = require('../models')

//GET /projects -- gets all the projects 
router.get('/', async (req, res) => {
    res.send(' get /projects')
})

//POST /projects -- creates a project
router.get('/', async (req, res) => {
    res.send('creates a project')
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