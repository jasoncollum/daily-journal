// console.log('data.js');
// Fetch data
const API = {
    getJournalEntries() {
        return fetch("http://localhost:8088/entries")
            .then(response => response.json())
    }
}

// fetch('http://localhost:8088/entries')
//     .then(entries => entries.json())
//     .then(parsedEntries => {
//         renderJournal(parsedEntries);
//     })