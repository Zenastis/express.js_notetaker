

const router = require("express").Router()
const notes = require("../db/notes.js")




router.get("/notes", (req, res) => {
    notes.getNotes()
    .then ((notes) => {
        return res.json (notes)
    })
    .catch ((error) => res.status(500).json(error))
});

router.post ("/notes", (req, res) => {
    notes.addNote(req.body)
    .then ((note) => res.json(note))
    .catch ((error) => res.status(500).json(error))
});

router.delete ("/notes/:id", (req, res) => {
    notes.removeNote(req.params.id)
    .then (() => res.json({ok:true}))
    .catch ((error) => res.status(500).json(error))
});

modules.exports = router