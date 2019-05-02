// console.log('entryComponent.js')



const create = {
    // Create component
    makeJournalEntryComponent(entry) {
        const journalComponent = `
    <h2 class="journal-entry-h2">${entry.title}</h2>
    <hr>
    <div class="journal-entry-body">
        <p>${entry.body}</p>
    </div>
    <p class="journal-entry-date">(${entry.date})</p>
    `

        return journalComponent;
    }
}


