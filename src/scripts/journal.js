console.log('journal.js');
// Journal entries array
const journalEntries = [];

function addEntry(journalEntry) {
    journalEntries.push(journalEntry);
}

const objectsJournalEntry = {
    date: 'April 11, 2019',
    title: 'JavaScript Objects',
    body: 'Blah blah blah... Objects blah blah.',
    mood: 'Need Coffee'
}

addEntry(objectsJournalEntry);

console.log(journalEntries);
