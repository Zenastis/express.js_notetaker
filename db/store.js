

const util = require("util");
const fs = require("fs");

const readFiles = util.promisify(fs.readFile);
const writeFiles = util.promisify(fs.writeFile);

class store {
    read() {
        return readFiles("db/db.json");
    }
    write(note) {
        return writeFiles("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("note 'title' and 'text' can't be blank");
        }

        const newNote = { title, text, id };

        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }

    removeNote(id) {
        return this.getNotes()
        .then((notes) => notes.filter((notes) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new store();