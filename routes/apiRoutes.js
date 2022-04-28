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

// delete a note
router.delete('/notes/:id', (req, res) => {
    const pathToJson = path.join(__dirname, '../db/db.json');
    
    for (let i=0; i<notes.length; i++) {
        if (notes[i].id == req.params.id) {
            // The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
            notes.splice(i, 1);
            break;
        }
    }
    // this write updates db.json file after deleting the note with requested id
    fs.writeFile(pathToJson, JSON.stringify(notes), error => {
        (error) ? console.log(error) : console.log('Requested note is deleted.');
    })
    return res.json(notes);

})

module.exports = router;