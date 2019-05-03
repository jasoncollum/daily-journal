// console.log('data.js');
// Base URL
const apiBaseURL = "http://localhost:8088"

// GET / POST data
const API = {
    getJournalEntries() {
        return fetch(`${apiBaseURL}/entries`)
            .then(response => response.json())
    },
    saveJournalEntry(newJournalEntry) {
        return fetch(`${apiBaseURL}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        })
            .then(response => response.json());
    },
    deleteJournalEntry(id) {
        return fetch(`${apiBaseURL}/entries/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    }
}