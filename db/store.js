

const util = require("util");
const fs = require("fs");

const uuid = require('uuid')

const readFiles = util.promisify(fs.readFile);
const writeFiles = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFiles("db/db.json", "utf8");
    }
    write(note) {
        return writeFiles("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let myNotes;

            try {
                myNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                myNotes = [];
            }

            return myNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("note 'title' and 'text' can't be blank");
        }

        const newEntry = { title, text, id: uuid.v1()};

        return this.getNotes()
        .then((notes) => [...notes, newEntry])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }

    removeNote(id) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Store();