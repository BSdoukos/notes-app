const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
    command: 'add',
    describe: 'Adds a new note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },      
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.add(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removes a note.',
    handler: (argv) => {
        notes.remove(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'Returns a list of your existent notes.',
    handler: () => {
        notes.list();
    }
});

yargs.command({
    command: 'read',
    describe: 'Returns the content of a note.',
    handler: (argv) => {
        notes.read(argv.title);
    }
});

yargs.parse();