const router = require('express').Router()
const db = require('../models')

//PUT /bugs/:id -- edit a specific bug
router.put('/:id', async (req, res) => {
    res.send(' edit a /bugs/:id')
})

//DELETE /bugs/:id -- delete a specific bug
router.delete('/:id', (req, res) => {
    res.send('delete a /bugs/:id')
})

module.exports = router