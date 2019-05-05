// console.log('entriesDOM.js');

const journalDisplay = document.querySelector('.journal-display');

// Render entries to DOM
const render = {
    renderJournals(entries) {
        journalDisplay.innerHTML = '';
        entries.forEach((entry) => {
            const journalComponent = create.makeJournalEntryComponent(entry);
            const entryEl = document.createElement('div');
            entryEl.setAttribute('id', `journal-entry--${entry.id}`)
            entryEl.className = 'journal-entry shadow-bottom';
            entryEl.innerHTML = journalComponent;
            journalDisplay.appendChild(entryEl);
        });
    },
    filteredEntriesByMood(entries, mood) {
        journalDisplay.innerHTML = '';
        const filteredEntries = entries.filter(entry => entry.mood === mood);
        render.renderJournals(filteredEntries);
    },
    filteredEntriesBySearchTerm(entries, term) {
        journalDisplay.innerHTML = '';

        // Using filter:
        let filteredEntries = entries.filter((entry) => {
            return Object.values(entry).find(value => {
                return typeof value === 'string' && value.toLowerCase().includes(term);
            })
        })
        render.renderJournals(filteredEntries)

        // Using for of loop:
        // let filteredEntriesByTerm = [];
        // for (let entry of entries) {
        //     Object.values(entry).find(value => {
        //         if (typeof value === 'string' && value.toLowerCase().includes(term)) {
        //             filteredEntriesByTerm.push(entry)
        //         }
        //     })
        // }
        // render.renderJournals(filteredEntriesByTerm)
    }
}

