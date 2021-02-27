const router = require("express").Router();
const db = require("../../db/db.json");
const fs = require('fs')
const uniqid = require("uniqid")

router.get('/notes', (req, res) => {
    res.json(db)
})
router.post('/notes', (req, res) =>{
    let newNote = req.body
    newNote.id = uniqid()
    db.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        if(err) throw err
        res.json(db)
    });
})
router.delete('/notes/:id',(req, res) => {
    let idToBeDeleted = req.params.id
    for(i=0; i<db.length; i++) {
        if(idToBeDeleted == db[i].id) {
            db.splice(i, 1)
        }
    }
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        if(err) throw err;
        res.send("Yo it's done!")
    })
})
module.exports = router;