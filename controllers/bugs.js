const router = require('express').Router()
const db = require('../models')

//PUT /bugs/:id -- edit a specific bug
router.put('/:id', async (req, res) => {
    // res.send(' edit a /bugs/:id')
    try {
        // find bug id from the url params
        const id = req.params.id
        // tell it to return the updated comment
        const options = {new: true}
        // find specific comment using that id & updating using the req.body
        const updatedBug = await db.Bug.findByIdAndUpdate(id, req.body, options)
        // send updated comment back to the user
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
        // remove that comment from the db
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