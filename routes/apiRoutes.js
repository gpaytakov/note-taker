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
    /*sets id to new note, checks for ids and sets one bigger than the max
      this will ensure when we delete the notes, new note will never gets the same id*/
      let notesIds = notes.map(note => note.id);
      let max = notesIds.reduce((a, b) => Math.max(a,b), -Infinity);
      newNote.id = max+1;
      // adds new note to db.json
    notes.push(newNote);
    
    fs.writeFile(pathToJson, JSON.stringify(notes), error => {
        if (error) throw error;
        console.log('Success! New note is added.')
    })
    return res.json(newNote);
})

module.exports = router;