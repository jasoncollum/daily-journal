// console.log('entriesDOM.js');

const journalDisplay = document.querySelector('.journal-display');

// Render to DOM
const render = {
    renderJournal(entries) {
        journalDisplay.innerHTML = '';
        entries.forEach((entry) => {
            const journalComponent = create.makeJournalEntryComponent(entry);
            const entryEl = document.createElement('div');
            entryEl.setAttribute('id', 'journal-entry--${entry.id}')
            entryEl.className = 'journal-entry shadow-bottom';
            entryEl.innerHTML = journalComponent;
            journalDisplay.appendChild(entryEl);
        });
    },
    renderFilteredEntries(entries, mood) {
        journalDisplay.innerHTML = '';
        const filteredEntries = entries.filter(entry => entry.mood === mood);
        render.renderJournal(filteredEntries);
    }
}

