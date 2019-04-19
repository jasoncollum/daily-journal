// console.log('entriesDOM.js');

const journalDisplay = document.querySelector('.journalDisplay');

// Render to DOM
const render = {
    renderJournal(entries) {
        entries.forEach((entry) => {
            const journalComponent = create.makeJournalEntryComponent(entry);
            const entryEl = document.createElement('div');
            entryEl.className = 'journal-entry';
            entryEl.innerHTML = journalComponent;
            journalDisplay.appendChild(entryEl);
        });
    }
}