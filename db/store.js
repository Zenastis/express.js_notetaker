

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

            try 
        })
    }
}