const router = require('express').Router()
const db = require('../models')

//GET /bugs -- gets all the bugs 
router.get('/', async (req, res) => {
    try {
        //find all bugs in the db
        const findAllBugs = await db.Bug.find({})
        //send them to the client
        res.json(findAllBugs)
    } catch (error) {
        res.status(500).json({ msg: 'server error' })
    }
})

//PUT /bugs/:id -- edit a specific bug
router.put('/:id', async (req, res) => {
    // res.send(' edit a /bugs/:id')
    try {
        // find bug id from the url params
        const id = req.params.id
        // tell it to return the updated bug
        const options = {new: true}
        // find specific bug using that id & updating using the req.body
        const updatedBug = await db.Bug.findByIdAndUpdate(id, req.body, options)
        // send updated bug back to the user
        res.json(updatedBug)

        console.log('you have successfully updated the bug')
    } catch (error) {
        if(error.name === "ValidationError"){
            res.status(400).json({msg: error.message})
        }
        res.status(500).json({msg: 'server error'})
    }
})

//DELETE /bugs/:id -- delete a specific bug
router.delete('/:id', async (req, res) => {
    // res.send('delete a /bugs/:id')
    try {
        // get id of specific bug from url params
        const id = req.params.id
        // remove that bug from the db
        await db.Bug.findByIdAndDelete(id)
        // send no content status
        res.sendStatus(204)

        console.log("you have successfully deleted the bug")
    } catch (error) {
        if(error.name === "ValidationError"){
            res.status(400).json({msg: error.message})
        }
        res.status(500).json({msg: 'server error'})
    }
})

module.exports = router