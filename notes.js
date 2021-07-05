const fs = require('fs');
const chalk = require('chalk');

const load = () => {
    try {       
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (err) {
        return [];
    }
}

const save = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const search = (notes, title) => {
    return notes.find((note) => note.title === title);
}

const add = (title, body) => {
    const notes = load();

    if (search(notes, title)) {
        console.log(chalk.red('\nThere is already a note with the provided title.'));
    } else {
        notes.push({title, body});
        console.log(chalk.gray(`\n${chalk.italic(title)} was added to your notes.`));
    }

    save(notes);

}

const remove = (title) => {
    const notes = load();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red('\nThere is not a note with the provided title.'));
    } else {
        console.log(chalk.gray(`\n${chalk.italic(title)} was removed from your notes.`));
        save(notesToKeep);
    }
}

const list = () => {
    const notes = load();

    if (notes.length) {
        notes.forEach((note) => {
            console.log(chalk.gray(`\n-${note.title}`));
        });
    } else {
        console.log(chalk.gray('\nYou do not have any note to be listed.'));
    }
}

const read = (title) => {
    const notes = load();
    const requestedNote = search(notes, title);

    if (requestedNote) {
        console.log(chalk.gray(`\n${requestedNote.body}`));
    } else {
        console.log(chalk.red('\nThere is not a note with the provided title.'));
    }
}

module.exports = {add, remove, list, read};