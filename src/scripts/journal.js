console.log('journal.js');
// Targeted DOM elements + createDocumentFragment
const journalDisplay = document.querySelector('.journalDisplay');
const fragment = document.createDocumentFragment();

// Journal entries array
const journalEntries = [
    {
    date: 'April 11, 2019',
    title: 'JavaScript Objects',
    body: 'Blah blah blah... Objects blah blah.',
    mood: 'Need Coffee'
    }
];

// Functions: ---------
function addEntry(journalEntry) {
    journalEntries.push(journalEntry);
}

function makeJournalEntryComponent(entry) {
    const journalComponent = `
    <h2>${entry.title}</h2>
    <p>${entry.body}</p>
    <p>${entry.date}</p>
    `

    return journalComponent;
}

function renderJournal(entries) {
    entries.forEach((entry) => {
        const journalComponent = makeJournalEntryComponent(entry);
        journalDisplay.innerHTML = journalComponent;
    });
}
// ---------

// addEntry(objectsJournalEntry);
renderJournal(journalEntries);

console.log(journalEntries);

