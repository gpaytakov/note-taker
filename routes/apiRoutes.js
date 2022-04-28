const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const notes = require('../db/db.json');

// GET request is done for all notes
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});
// POST request for new note
router.post('/notes', (req, res) => {
    const pathToJson = path.join(__dirname, '../db/db.json');
    let newNote = req.body;
    
    notes.push(newNote);
    
    fs.writeFile(pathToJson, JSON.stringify(notes), error => {
        if (error) throw error;
        console.log('Success! New note is added.')
    })
    return res.json(newNote);
})

module.exports = router;